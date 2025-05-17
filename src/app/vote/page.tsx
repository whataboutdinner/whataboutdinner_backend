'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useParty } from '@/lib/party-context'

// Client component that uses URL parameters
function VoteContent({ partyId, participantName }: { partyId: string; participantName: string }) {
  const router = useRouter()
  const { getParty, addVote } = useParty()
  
  const [party, setParty] = useState(null)
  const [selectedChoice, setSelectedChoice] = useState('')
  const [hasVoted, setHasVoted] = useState(false)
  const [voteSubmitted, setVoteSubmitted] = useState(false)
  
  useEffect(() => {
    if (!partyId || !participantName) {
      router.push('/join')
      return
    }
    
    // Get party data from context
    const partyData = getParty(partyId)
    if (!partyData) {
      router.push('/join')
      return
    }
    
    if (partyData.type !== 'recipe') {
      router.push(`/order?id=${partyId}&name=${encodeURIComponent(participantName)}`)
      return
    }
    
    setParty(partyData)
    
    // Check if user has already voted
    const existingVote = partyData.votes[participantName]
    if (existingVote) {
      setSelectedChoice(existingVote)
      setHasVoted(true)
    }
  }, [partyId, participantName, router, getParty])
  
  const submitVote = () => {
    if (!selectedChoice || !partyId || !participantName) return
    
    // Add vote using context function
    const success = addVote(partyId, participantName, selectedChoice)
    
    if (success) {
      setHasVoted(true)
      setVoteSubmitted(true)
    }
  }
  
  const changeVote = () => {
    setVoteSubmitted(false)
  }
  
  if (!party) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p>Loading party details...</p>
      </main>
    )
  }
  
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-purple-800">{party.name}</h1>
        <p className="text-gray-600 mb-6">Vote for your favorite food</p>
        
        {voteSubmitted ? (
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Vote Submitted!</h2>
            <p className="mb-4">You voted for: <span className="font-medium">{selectedChoice}</span></p>
            <p className="mb-6 text-gray-600">The host will notify everyone when voting is complete.</p>
            <Button 
              variant="outline"
              onClick={changeVote}
            >
              Change My Vote
            </Button>
          </Card>
        ) : (
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Select your favorite food:</h2>
            
            <RadioGroup 
              value={selectedChoice} 
              onValueChange={setSelectedChoice}
              className="space-y-3 mb-6"
            >
              {party.foodChoices?.map((choice, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={choice} id={`choice-${index}`} />
                  <Label htmlFor={`choice-${index}`} className="font-medium cursor-pointer">
                    {choice}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={submitVote}
              disabled={!selectedChoice}
            >
              {hasVoted ? 'Update Vote' : 'Submit Vote'}
            </Button>
          </Card>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Participating as <span className="font-medium">{participantName}</span>
          </p>
        </div>
      </div>
    </main>
  )
}

// Wrapper component that extracts the search params
export default function VotePage() {
  const [params, setParams] = useState<{partyId: string | null, participantName: string | null}>({
    partyId: null,
    participantName: null
  })
  
  useEffect(() => {
    // Get the parameters from the URL on the client side
    const urlParams = new URLSearchParams(window.location.search)
    setParams({
      partyId: urlParams.get('id'),
      participantName: urlParams.get('name')
    })
  }, [])
  
  if (!params.partyId || !params.participantName) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p>Loading voting details...</p>
      </main>
    )
  }
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VoteContent partyId={params.partyId} participantName={params.participantName} />
    </Suspense>
  )
}
