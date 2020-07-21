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
  const [checkout, setCheckout] = useState({})

  useEffect(() => {
    initializeCheckout()
  }, [])

  const initializeCheckout = async () => {
    try {
      // Check if it's a browser
      const isBrowser = typeof window !== 'undefined'

      // Check if id exists
      const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null

      let newCheckout = null

      if (currentCheckoutId) {
        // If id exists, fetch checkout from Shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId)
      } else {
        // If id does not, create new checkout
        newCheckout = await client.checkout.create()
        if (isBrowser) {
          localStorage.setItem('checkout_id', newCheckout.id)
        }
      }

      // Set checkout to state
      setCheckout(newCheckout)
    } catch (e) {}
  }

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]
      const addItems = await client.checkout.addLineItems(checkout.id, lineItems)
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