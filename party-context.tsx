'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// Define types
export interface Party {
  id: string
  name: string
  type: 'recipe' | 'restaurant'
  foodChoices?: string[]
  restaurant?: string
  votes: Record<string, string>
  orders?: Record<string, Order>
  created: string
}

export interface Order {
  participantName: string
  items: Record<string, boolean>
  instructions?: string
  total: string
  timestamp: string
  paymentStatus: 'pending' | 'paid'
}

interface PartyContextType {
  createParty: (name: string, type: 'recipe' | 'restaurant', foodChoices?: string[], restaurant?: string) => string
  getParty: (id: string) => Party | null
  updateParty: (id: string, updates: Partial<Party>) => boolean
  addVote: (partyId: string, participantName: string, choice: string) => boolean
  addOrder: (partyId: string, participantName: string, order: Omit<Order, 'timestamp'>) => boolean
  updateOrderPayment: (partyId: string, participantName: string, status: 'pending' | 'paid') => boolean
}

// Generate a random 6-digit party code
const generatePartyCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create context
const PartyContext = createContext<PartyContextType | undefined>(undefined)

// Provider component
export function PartyProvider({ children }: { children: ReactNode }) {
  // Create a new party
  const createParty = (
    name: string, 
    type: 'recipe' | 'restaurant', 
    foodChoices?: string[], 
    restaurant?: string
  ): string => {
    const id = generatePartyCode();
    const party: Party = {
      id,
      name,
      type,
      foodChoices: type === 'recipe' ? foodChoices : undefined,
      restaurant: type === 'restaurant' ? restaurant : undefined,
      votes: {},
      orders: type === 'restaurant' ? {} : undefined,
      created: new Date().toISOString()
    }
    
    localStorage.setItem(`party_${id}`, JSON.stringify(party))
    return id
  }
  
  // Get party by ID
  const getParty = (id: string): Party | null => {
    try {
      const partyData = localStorage.getItem(`party_${id}`)
      if (!partyData) return null
      return JSON.parse(partyData)
    } catch (err) {
      console.error('Error getting party:', err)
      return null
    }
  }
  
  // Update party
  const updateParty = (id: string, updates: Partial<Party>): boolean => {
    try {
      const party = getParty(id)
      if (!party) return false
      
      const updatedParty = { ...party, ...updates }
      localStorage.setItem(`party_${id}`, JSON.stringify(updatedParty))
      return true
    } catch (err) {
      console.error('Error updating party:', err)
      return false
    }
  }
  
  // Add vote to party
  const addVote = (partyId: string, participantName: string, choice: string): boolean => {
    try {
      const party = getParty(partyId)
      if (!party) return false
      
      // Update votes
      const updatedVotes = { ...party.votes, [participantName]: choice }
      
      // Save vote to localStorage
      const voteKey = `vote_${partyId}_${participantName}`
      localStorage.setItem(voteKey, choice)
      
      // Update party
      return updateParty(partyId, { votes: updatedVotes })
    } catch (err) {
      console.error('Error adding vote:', err)
      return false
    }
  }
  
  // Add order to party
  const addOrder = (
    partyId: string, 
    participantName: string, 
    orderData: Omit<Order, 'timestamp'>
  ): boolean => {
    try {
      const party = getParty(partyId)
      if (!party || party.type !== 'restaurant') return false
      
      const order: Order = {
        ...orderData,
        participantName,
        timestamp: new Date().toISOString()
      }
      
      // Save order to localStorage
      const orderKey = `order_${partyId}_${participantName}`
      localStorage.setItem(orderKey, JSON.stringify(order))
      
      // Update party orders
      const updatedOrders = { ...(party.orders || {}), [participantName]: order }
      return updateParty(partyId, { orders: updatedOrders })
    } catch (err) {
      console.error('Error adding order:', err)
      return false
    }
  }
  
  // Update order payment status
  const updateOrderPayment = (
    partyId: string, 
    participantName: string, 
    status: 'pending' | 'paid'
  ): boolean => {
    try {
      const party = getParty(partyId)
      if (!party || party.type !== 'restaurant' || !party.orders) return false
      
      const order = party.orders[participantName]
      if (!order) return false
      
      // Update order
      const updatedOrder = { ...order, paymentStatus: status }
      
      // Save updated order to localStorage
      const orderKey = `order_${partyId}_${participantName}`
      localStorage.setItem(orderKey, JSON.stringify(updatedOrder))
      
      // Update party orders
      const updatedOrders = { ...party.orders, [participantName]: updatedOrder }
      return updateParty(partyId, { orders: updatedOrders })
    } catch (err) {
      console.error('Error updating order payment:', err)
      return false
    }
  }
  
  const value = {
    createParty,
    getParty,
    updateParty,
    addVote,
    addOrder,
    updateOrderPayment
  }
  
  return <PartyContext.Provider value={value}>{children}</PartyContext.Provider>
}

// Hook to use the party context
export function useParty() {
  const context = useContext(PartyContext)
  if (context === undefined) {
    throw new Error('useParty must be used within a PartyProvider')
  }
  return context
}
