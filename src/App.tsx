import { Outlet, Route, Routes } from 'react-router-dom'
import BusList from './components/BusList'
import { MainLayout } from './components/Layouts/Layout'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import AdminProtected from './components/protected/AdminProtected'
import Protected from './components/protected/Protected'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Dashboard from './views/admin/Dashboard'
import AllBrands from './views/admin/brand/AllBrands'
import Product from './views/admin/product'
import SignIn from './views/auth/SignIn'
import SignUp from './views/auth/SignUp'
import OrderHistory from './views/orderHistory/OrderHistory'
import Profile from './views/profile/Profile'

export default function App() {
  return (
    <MainLayout>
      <Loader>
        <Navbar />
        <Routes>
          <Route path='/' element={<Outlet />}>
            <Route path='/' element={<Home />}>
              <Route path='ticket' element={<BusList />} />
            </Route>

            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />

            {/* private routes */}
            <Route element={<Protected />}>
              <Route index path='profile' element={<Profile />} />
              <Route path='order-history' element={<OrderHistory />} />
            </Route>

            {/* admin panel private routes */}
            <Route element={<AdminProtected />}>
              <Route index path='dashboard' element={<Dashboard />} />
              <Route path='brands' element={<AllBrands />} />
              <Route path='product' element={<Product />}>
                {/* <Route path='create' element={<Create />} /> */}
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Loader>
    </MainLayout>
  )
}

// error boundary
// authority bio in allBrands -> getting admin specific brands