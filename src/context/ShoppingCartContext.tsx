import { createContext, useContext, ReactNode, useState } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number // function to get the current quantity
  increaseCartQuantity: (id: number) => void // function to increase quantity
  decreaseCartQuantity: (id: number) => void // function to decrease quantity
  removeFromCart: (id: number) => void // function remove item from cart
  totalItemsInCart: () => number
  openCart: () => void
  closeCart: () => void
  emptyCart: () => void
  isOpen: boolean
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [isOpen, setIsOpen] = useState(true)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(prevItems => {
      if (prevItems.find(item => item.id === id) == null) {
        return [...prevItems, {id: id, quantity: 1}]
      } else {
        return prevItems.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item)
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(prevItems => {
      if (prevItems.find(item => item.id === id)?.quantity === 1) {
        return prevItems.filter(item => item.id !== id)
      } else {
        return prevItems.map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item)
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(prevItems => prevItems?.filter(item => item.id !== id))
  }

  function totalItemsInCart() {
    return cartItems.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
  }

  function emptyCart() {
    setCartItems([])
  }

  return (
    <ShoppingCartContext.Provider 
      value={{ 
        totalItemsInCart,
        isOpen,
        cartItems,
        openCart,
        closeCart,
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart,
        emptyCart
        }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}