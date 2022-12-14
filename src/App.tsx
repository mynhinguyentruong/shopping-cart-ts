import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { Routes, Route } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import { About } from './pages/About'
import { Home } from './pages/Home'
import { Store } from './pages/Store'

import { Navbar } from './components/Navbar'
import { ShoppingCart } from './components/ShoppingCart'

export default function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className='mb4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
      <ShoppingCart />

    </ShoppingCartProvider>
  )
}
