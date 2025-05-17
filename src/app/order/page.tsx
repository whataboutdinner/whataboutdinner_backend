'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useParty, Order } from '@/lib/party-context'

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

// Client component that uses URL parameters
function OrderContent({ partyId, participantName }: { partyId: string; participantName: string }) {
  const router = useRouter()
  const { getParty, addOrder, updateOrderPayment } = useParty()
  
  const [party, setParty] = useState(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Burger', description: 'Classic beef burger with lettuce, tomato, and special sauce', price: 12.99 },
    { id: '2', name: 'Pizza', description: 'Margherita pizza with fresh mozzarella and basil', price: 14.99 },
    { id: '3', name: 'Salad', description: 'Garden salad with mixed greens, vegetables, and vinaigrette', price: 8.99 },
    { id: '4', name: 'Pasta', description: 'Spaghetti with marinara sauce and parmesan', price: 11.99 },
  ])
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({})
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('pending')
  
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
    
    if (partyData.type !== 'restaurant') {
      router.push(`/vote?id=${partyId}&name=${encodeURIComponent(participantName)}`)
      return
    }
    
    setParty(partyData)
    
    // Check if user has already ordered
    if (partyData.orders && partyData.orders[participantName]) {
      const existingOrder = partyData.orders[participantName]
      setSelectedItems(existingOrder.items || {})
      setSpecialInstructions(existingOrder.instructions || '')
      setOrderSubmitted(true)
      setPaymentStatus(existingOrder.paymentStatus || 'pending')
    }
  }, [partyId, participantName, router, getParty])
  
  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }
  
  const calculateTotal = () => {
    return menuItems
      .filter(item => selectedItems[item.id])
      .reduce((sum, item) => sum + item.price, 0)
      .toFixed(2)
  }
  
  const submitOrder = () => {
    if (!partyId || !participantName) return
    
    // Create order data
    const orderData = {
      participantName,
      items: selectedItems,
      instructions: specialInstructions,
      total: calculateTotal(),
      paymentStatus: 'pending' as 'pending' | 'paid'
    }
    
    // Add order using context function
    const success = addOrder(partyId, participantName, orderData)
    
    if (success) {
      setOrderSubmitted(true)
    }
  }
  
  const markAsPaid = () => {
    if (!partyId || !participantName) return
    
    // Update payment status using context function
    const success = updateOrderPayment(partyId, participantName, 'paid')
    
    if (success) {
      setPaymentStatus('paid')
    }
  }
  
  const editOrder = () => {
    setOrderSubmitted(false)
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
        <h1 className="text-2xl font-bold mb-2 text-blue-800">{party.name}</h1>
        <p className="text-gray-600 mb-6">Restaurant: {party.restaurant || 'Demo Restaurant'}</p>
        
        {orderSubmitted ? (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Order Submitted!</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Your Order:</h3>
                <ul className="mt-2 space-y-1">
                  {menuItems
                    .filter(item => selectedItems[item.id])
                    .map(item => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </li>
                    ))}
                </ul>
              </div>
              
              {specialInstructions && (
                <div>
                  <h3 className="font-medium">Special Instructions:</h3>
                  <p className="text-gray-600">{specialInstructions}</p>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
              
              <div>
                <h3 className="font-medium">Payment Status:</h3>
                <div className={`mt-1 p-2 rounded-md ${
                  paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                {paymentStatus !== 'paid' && (
                  <Button 
                    onClick={markAsPaid}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Mark as Paid
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={editOrder}
                >
                  Edit Order
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Menu Items</h2>
            
            <div className="space-y-4 mb-6">
              {menuItems.map(item => (
                <div key={item.id} className="flex items-start space-x-3 pb-3 border-b">
                  <Checkbox 
                    id={`item-${item.id}`} 
                    checked={selectedItems[item.id] || false}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <Label htmlFor={`item-${item.id}`} className="font-medium cursor-pointer">
                        {item.name}
                      </Label>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea 
                id="instructions"
                placeholder="Any special requests or allergies?"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex justify-between font-semibold mb-4">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={submitOrder}
              disabled={Object.values(selectedItems).filter(Boolean).length === 0}
            >
              Submit Order
            </Button>
          </Card>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Ordering as <span className="font-medium">{participantName}</span>
          </p>
        </div>
      </div>
    </main>
  )
}

// Wrapper component that extracts the search params
export default function OrderPage() {
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
        <p>Loading order details...</p>
      </main>
    )
  }
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderContent partyId={params.partyId} participantName={params.participantName} />
    </Suspense>
  )
}
