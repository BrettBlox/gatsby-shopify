import React, { createContext, useState, useEffect } from 'react'
import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: 'bretts-learning-1.myshopify.com',
  storefrontAccessToken: '70ccac3b390f374370aafd204f0f7148',
})

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {},
  client,
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [checkoutId, setCheckoutId] = useState({})

  const initializeCheckout = async () => {
    try {
      const newCheckout = await client.checkout.create()
      setCheckoutId(newCheckout.id)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    initializeCheckout()
  }, [])

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]
      const addItems = await client.checkout.addLineItems(checkoutId, lineItems)
      // Buy Now Button Code
      // window.open(addItems.webUrl, "_blank")
      console.log(addItems.webUrl)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addProductToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
