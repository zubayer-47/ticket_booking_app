import { useContext, useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import BusList from './components/BusList'
import Layout from './components/Layouts/Layout'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import AdminProtected from './components/protected/AdminProtected'
import Protected from './components/protected/Protected'
import { Context } from './contexts/Context'
import { api } from './utils/axios'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Dashboard from './views/admin/Dashboard'
import SignIn from './views/auth/SignIn'
import SignUp from './views/auth/SignUp'
import Brand from './views/brand'
import AllBrands from './views/brand/AllBrands'
import Create from './views/brand/Create'
import OrderHistory from './views/orderHistory/OrderHistory'
import Profile from './views/profile/Profile'

export default function App() {
  const { state: { user }, login, loading, logout } = useContext(Context)
  const setLocalStorage = (tokenParam: string) => {
    const _token = JSON.parse(localStorage.getItem("_token") ?? '""');

    if (!_token) return () => localStorage.setItem("_token", JSON.stringify(tokenParam));
  }

  useEffect(() => {
    const _token = JSON.parse(localStorage.getItem("_token") ?? '""')

    const fetchUser = async () => {
      if (_token) {
        try {
          loading(true);
          const res = await api.get('/users/me', {
            headers: {
              Authorization: _token.trim()
            }
          });

          setLocalStorage(res.data?.token)

          if (res.status === 200) {
            login({
              name: res.data?.fullname,
              email: res.data?.email,
              authenticated: true,
              role: res.data?.role,
              token: res.data?.token,
              ticket: res.data?.ticket
            })
            loading(false);
          }

        } catch (error) {
          loading(false)
          logout()
          console.log({ error })
        }
      }
    }

    !user.authenticated && fetchUser();

  }, [])

  return (
    <Layout>
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
              <Route path='brand' element={<Brand />}>
                <Route index path='create' element={<Create />} />
                <Route path='all' element={<AllBrands />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Loader>
    </Layout>
  )
}


// talk with rasel vai about AllBrands Component's input default value.