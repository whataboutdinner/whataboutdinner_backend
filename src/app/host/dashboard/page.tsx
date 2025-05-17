'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { useParty, Party } from '@/lib/party-context'
import { Clipboard, Check } from 'lucide-react'

// Client component that uses useSearchParams
function DashboardContent({ partyId }: { partyId: string }) {
  const router = useRouter()
  const { getParty } = useParty()
  
  const [party, setParty] = useState<Party | null>(null)
  const [participants, setParticipants] = useState<any[]>([])
  const [partyLink, setPartyLink] = useState('')
  const [linkCopied, setLinkCopied] = useState(false)
  const [winningChoice, setWinningChoice] = useState('')
  const [recipeDetails, setRecipeDetails] = useState({ prepTime: '', ingredients: [] })
  
  useEffect(() => {
    if (!partyId) {
      router.push('/')
      return
    }
    
    // Get party data from context
    const partyData = getParty(partyId)
    if (!partyData) {
      router.push('/')
      return
    }
    
    setParty(partyData)
    
    // Generate party link
    const baseUrl = window.location.origin
    setPartyLink(`${baseUrl}/join?code=${partyId}`)
    
    // In a real app, we would fetch participants from a database
    // For now, we'll simulate with demo data
    setParticipants([
      { name: 'Demo User 1', joinedAt: new Date().toISOString(), vote: partyData.foodChoices?.[0] },
      { name: 'Demo User 2', joinedAt: new Date().toISOString() }
    ])
    
    // Simulate recipe details (in a real app, this would come from an API)
    if (partyData.type === 'recipe' && partyData.foodChoices?.length > 0) {
      setWinningChoice(partyData.foodChoices[0])
      setRecipeDetails({
        prepTime: '45 minutes',
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4']
      })
    }
  }, [partyId, router, getParty])
  
  const copyLink = () => {
    navigator.clipboard.writeText(partyLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }
  
  const endParty = () => {
    // In a real app, we would update the party status in the database
    // For now, we'll just navigate back to home
    router.push('/')
  }
  
  if (!party) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p>Loading party details...</p>
      </main>
    )
  }
  
  // Calculate votes for each food choice
  const getVoteCounts = () => {
    const voteCounts: Record<string, number> = {}
    
    // Initialize counts to zero
    if (party.type === 'recipe' && party.foodChoices) {
      party.foodChoices.forEach(choice => {
        voteCounts[choice] = 0
      })
    }
    
    // Count votes
    Object.values(party.votes).forEach(vote => {
      if (vote in voteCounts) {
        voteCounts[vote]++
      }
    })
    
    return voteCounts
  }
  
  const voteCounts = getVoteCounts()
  const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0)
  
  // Find the winning choice
  const findWinningChoice = () => {
    if (!party.foodChoices || party.foodChoices.length === 0) return null
    
    let maxVotes = 0
    let winner = party.foodChoices[0]
    
    Object.entries(voteCounts).forEach(([choice, count]) => {
      if (count > maxVotes) {
        maxVotes = count
        winner = choice
      }
    })
    
    return { choice: winner, votes: maxVotes }
  }
  
  const winner = findWinningChoice()
  
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="w-full max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => router.push('/')}
        >
          ← Back to Home
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-purple-800">{party.name}</h1>
            <p className="text-gray-600">
              {party.type === 'recipe' ? 'Recipe Voting Party' : 'Restaurant Order Party'}
            </p>
          </div>
          <Badge className="mt-2 sm:mt-0 self-start sm:self-auto">
            Party ID: {partyId}
          </Badge>
        </div>
        
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="mb-3 sm:mb-0">
              <h2 className="font-semibold">Invite Participants</h2>
              <p className="text-sm text-gray-500">Share this link with your friends</p>
            </div>
            <div className="flex w-full sm:w-auto">
              <Input 
                value={partyLink} 
                readOnly 
                className="mr-2 text-sm"
              />
              <Button onClick={copyLink}>
                {linkCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </Card>
        
        <Tabs defaultValue="participants" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="voting">
              {party.type === 'recipe' ? 'Voting Results' : 'Order Status'}
            </TabsTrigger>
            <TabsTrigger value="details">
              {party.type === 'recipe' ? 'Recipe Details' : 'Order Summary'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="participants" className="space-y-4">
            <Card className="p-4">
              <h2 className="font-semibold mb-4">Participants ({participants.length})</h2>
              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-500">
                        Joined {new Date(participant.joinedAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge variant={participant.vote ? 'default' : 'outline'}>
                      {participant.vote ? 'Voted' : 'Not voted'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="voting">
            <Card className="p-4">
              {party.type === 'recipe' ? (
                <>
                  <h2 className="font-semibold mb-4">Voting Results</h2>
                  <div className="space-y-3">
                    {party.foodChoices?.map((choice, index) => (
                      <div key={index} className="border-b pb-2">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium">{choice}</p>
                          <p className="text-sm">
                            {voteCounts[choice] || 0} votes
                          </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            style={{ 
                              width: totalVotes > 0 
                                ? `${(voteCounts[choice] || 0) / totalVotes * 100}%` 
                                : '0%' 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {winner && (
                    <div className="mt-4 p-3 bg-purple-100 rounded-md">
                      <p className="font-semibold text-purple-800">
                        Winning Choice: {winner.choice} ({winner.votes} votes)
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2 className="font-semibold mb-4">Order Status</h2>
                  <div className="space-y-3">
                    <div className="border-b pb-2">
                      <p className="font-medium">Demo User 1</p>
                      <p className="text-sm text-gray-600">Burger with fries - $12.99</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="font-medium">Demo User 2</p>
                      <p className="text-sm text-gray-600">Waiting for selection...</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-100 rounded-md">
                    <p className="font-semibold text-blue-800">Total: $12.99</p>
                    <p className="text-sm text-blue-600">1 of 2 orders received</p>
                  </div>
                </>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <Card className="p-4">
              {party.type === 'recipe' ? (
                <>
                  <h2 className="font-semibold mb-4">Recipe: {winner?.choice || 'Waiting for votes'}</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Preparation Time</p>
                      <p className="text-gray-600">{recipeDetails.prepTime}</p>
                    </div>
                    <div>
                      <p className="font-medium">Ingredients</p>
                      <ul className="list-disc pl-5 text-gray-600">
                        {recipeDetails.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Instructions</p>
                      <p className="text-gray-600">
                        In a full app, detailed cooking instructions would be displayed here.
                        This would include step-by-step directions for preparing {winner?.choice || 'the winning recipe'}.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <p className="font-medium">Restaurant</p>
                      <p className="text-gray-600">{party.restaurant || 'Demo Restaurant'}</p>
                    </div>
                    <div className="border-b pb-3">
                      <p className="font-medium">Items</p>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <p>Burger with fries</p>
                            <p className="text-sm text-gray-500">Demo User 1</p>
                          </div>
                          <p>$12.99</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-b pb-3">
                      <p className="font-medium">Payment Status</p>
                      <div className="mt-2">
                        <div className="flex justify-between items-center">
                          <p>Demo User 1</p>
                          <Badge className="bg-green-500">Paid</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p>Demo User 2</p>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-medium">
                        <p>Total</p>
                        <p>$12.99</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button 
            variant="destructive"
            onClick={endParty}
          >
            End Party
          </Button>
        </div>
      </div>
    </main>
  )
}

// Wrapper component that extracts the search params
export default function HostDashboard() {
  const [partyId, setPartyId] = useState<string | null>(null)
  
  useEffect(() => {
    // Get the party ID from the URL on the client side
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    setPartyId(id)
  }, [])
  
  if (!partyId) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p>Loading party details...</p>
      </main>
    )
  }
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent partyId={partyId} />
    </Suspense>
  )
}
