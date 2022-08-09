import { createContext, useContext, ReactNode, useState } from 'react'



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
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id ? item.quantity : 0)
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

  return (
    <ShoppingCartContext.Provider 
    value={{ 
      getItemQuantity, 
      increaseCartQuantity, 
      decreaseCartQuantity, 
      removeFromCart}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}