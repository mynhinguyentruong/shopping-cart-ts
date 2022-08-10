import { Offcanvas, Stack, Button } from "react-bootstrap";

import { useShoppingCart } from "../context/ShoppingCartContext";
import { useState, useEffect } from 'react'

import { CartItem } from '../components/CartItem'

import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency";


export function ShoppingCart() {

  const { isOpen, closeCart, cartItems, emptyCart } = useShoppingCart()

  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  function checkout() {
    setIsLoading(true)
    
  }

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
        alert("Order placed! Please check your mailbox for email confirmation")
        emptyCart()
        
      }, 2000)
      
      //clear the cart
    }
  })

  useEffect(() => {
    setTotal(cartItems?.reduce((sum: number, cartItem: { id: number; quantity: number; }) => {
      const item = storeItems.find(i => i.id === cartItem.id)
      return sum + (item?.price || 0) * cartItem.quantity
    }, 0))
  }, [cartItems])

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
        <div className="ms-auto fw-bold fs-5">Total: {formatCurrency(total)}</div>
        <Button className="fw-bold" onClick={checkout}>{isLoading ? "Loading..." : "Checkout"}</Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}