import { Offcanvas } from "react-bootstrap";

import { useShoppingCart } from "../context/ShoppingCartContext";

export function ShoppingCart() {

  const { isOpen, closeCart } = useShoppingCart()

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  )
}