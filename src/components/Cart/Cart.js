import React, { useContext } from 'react'
import { animated } from 'react-spring'
import { StoreContext } from '../../context/StoreContext'

const Cart = ({ style }) => {
  const { isCartOpen, checkout, toggleCartOpen } = useContext(StoreContext)
  return (
    <animated.div
      style={{
        zIndex: 100,
        position: 'fixed',
        top: 0,
        right: 0,
        width: '40%',
        overflowY: 'scroll',
        height: '100%',
        background: 'white',
        padding: '40px 2%',
        boxShadow: 'var(--elevation-4)',
        ...style,
      }}
    >
      <button
        type='button'
        style={{
          background: 'var(--red)',
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        className='delete is-large'
        onClick={toggleCartOpen}
      >
        Close Cart
      </button>
      <h3 className='title'>Cart</h3>
      {checkout.lineItems.map(item => (
        <div key={item.id} style={{ display: 'flex', marginBottom: '2rem' }}>
          <div
            style={{
              width: 60,
              height: 60,
              overflow: 'hidden',
              marginRight: 10,
            }}
          >
            <img src={item.variant.image.src} alt={item.variant.title} />
          </div>
          <div>
            <h4 className='title is-4'>{item.title}</h4>
            <p className='subtitle is-5'>${item.variant.price}</p>
            <p className='subtitle is-5'>Qty: {item.quantity}</p>
            <button type='button' className='is-small button is-danger is-outlined'>
              Remove
            </button>
          </div>
        </div>
      ))}
      <hr />
      Total: <h5 className='title'>${checkout.totalPrice}</h5>
    </animated.div>
  )
}

export default Cart
