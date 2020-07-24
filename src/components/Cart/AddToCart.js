import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const AddToCart = ({ variantId }) => {
  const { addProductToCart } = useContext(StoreContext)
  return (
    <button type='button' className='button is-primary' onClick={() => addProductToCart(variantId)}>
      Add To Cart
    </button>
  )
}

export default AddToCart
