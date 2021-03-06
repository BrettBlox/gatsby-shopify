import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

const Nav = () => {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query allShopifyCollections {
        allShopifyCollection {
          edges {
            node {
              title
              handle
            }
          }
        }
      }
    `
  )

  return (
    <nav style={{ marginLeft: '5%' }}>
      {allShopifyCollection.edges.map(edge => (
        <Link
          style={{ color: '#fff', marginLeft: '15%', fontWeight: 'bold', fontSize: '1.25rem' }}
          to={`/${edge.node.handle}`}
        >
          {edge.node.title}
        </Link>
      ))}
    </nav>
  )
}

export default Nav
