import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <main className='section' style={{ minHeight: '90vh' }}>
          {children}
        </main>
        <footer
          className='footer'
          style={{
            background: 'black',
            color: '#fff',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          © {new Date().getFullYear()}, Built with &nbsp;
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
