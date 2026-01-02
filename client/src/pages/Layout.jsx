import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <h1>layout</h1>
      <Outlet /> {/* used to render child routes, subroutes will be displayed here */}
    </div>
  )
}

export default Layout
