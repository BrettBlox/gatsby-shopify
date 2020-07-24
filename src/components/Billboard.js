import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

const Billboard = () => {
  const { shopifyProduct: product } = useStaticQuery(
    graphql`
      query billboard {
        shopifyProduct(vendor: { eq: "Billboard" }) {
          id
          handle
          title
          description
          variants {
            id
            shopifyId
            title
            price
            sku
            availableForSale
          }
          images {
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200, maxHeight: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `
  )

  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product

  return (
    <div className='columns'>
      <div className='column'>
        <Image fluid={firstImage.localFile.childImageSharp.fluid} />
      </div>
      <div className='column'>
        <h2 className='title'>Now Available</h2>
        <h3 className='title'>{product.title}</h3>
        <p className='subtitle is-4'>${firstVariant.price}</p>
        <Link className='button' to={`/product/${product.handle}`}>
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default Billboard