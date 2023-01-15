import React from 'react'


export const Navbar = () => {
  const YEAR = new Date().getFullYear()
  
  return (
    <Header>
      <Nav>
        <ul>
          <li><a href="./index">Home</a></li>
          <li><a href="./Posts">Posts</a></li>
          <li><a href="./Photos">Photos</a></li>
        </ul>
      </Nav>
      <div>
        <ul>
          <li><a href="https://instagram.com/andreaiaia">Instagram</a></li>
          <li><a href="https://github.com/andreaiaia">Github</a></li>
          <li><a href="https://linkedin.com/in/andreaiaia/">LinkedIn</a></li>
          <small style={{ display: 'block', marginTop: '8rem' }}>
            <time>{YEAR}</time> &#169; Andrea Bianchi.
            <a href="/feed.xml">RSS</a>
            <style jsx>{`
              a {
                float: right;
              }
              @media screen and (max-width: 480px) {
                article {
                  padding-top: 2rem;
                  padding-bottom: 4rem;
                }
              }
            `}</style>
          </small>
        </ul>
      </div>
    </Header>
  )
}
