import React from 'react'
import { Outlet } from 'react-router'
import NavSide from '../components/NavSide'
import { useLogin } from '~/hooks/useLogin'
import { useAuthStore } from '~/store/auth.store'

function Layout() {
  const{logout}=useAuthStore()
  return (
    <div className="h-screen flex overflow-hidden">
   <NavSide onLogout={logout}/>
           <main className="flex-1 min-h-screen overflow-y-auto bg-neutral-50">
        <Outlet />
      </main>
</div>
  )
}

export default Layout