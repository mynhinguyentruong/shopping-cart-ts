import { useShoppingCart } from "../context/ShoppingCartContext"

import { formatCurrency } from '../utilities/formatCurrency'

import storeItems from '../data/items.json'

import { Stack, Button } from 'react-bootstrap'

type CartItemProps = {
  id: number,
  quantity: number
}

export function CartItem({ id, quantity}: CartItemProps) {

  const { removeFromCart } = useShoppingCart()
  const item = storeItems.find(i => i.id === id) || null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img 
        src={item?.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover"}} />
      <div className="me-auto">
        <div>
          {item?.name} {quantity > 1 && <span className="text-muted" style={{fontSize: ".65rem"}}>x{quantity}</span>}
        </div>
        <div className="text-muted" style={{fontSize: ".75rem"}}>
          {formatCurrency(item?.price)}
        </div>
      </div>
      <div>{formatCurrency(item?.price * quantity)}</div>
      <Button size="sm" className="d-flex" variant="outline-danger" onClick={() => removeFromCart(id)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"/>
        </svg>
      </Button>
    </Stack>
  )
}