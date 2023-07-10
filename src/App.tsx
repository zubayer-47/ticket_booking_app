import Cookies from 'js-cookie'
import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
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
import Admin from './views/admin/Admin'
import Dashboard from './views/admin/Dashboard'
import SignIn from './views/auth/SignIn'
import SignUp from './views/auth/SignUp'
import OrderHistory from './views/orderHistory/OrderHistory'
import Profile from './views/profile/Profile'

function App() {
  const { state: { user: { token, authenticated } }, login, loading } = useContext(Context)

  const setCookie = (tokenParam: string) => {
    const _token = Cookies.get("_token");

    console.log({ token })

    if (!_token) return () => Cookies.set("_token", tokenParam);
  }

  useEffect(() => {
    console.log('rendering')

    const _token = Cookies.get("_token");

    const fetchUser = async () => {
      if (_token) {
        try {
          loading(true);
          const res = await api.get('/users/me', {
            headers: {
              Authorization: _token.trim()
            }
          });

          setCookie(res.data?.token)

          if (res.status === 200) {
            loading(false);
            login({
              name: res.data?.fullname,
              email: res.data?.email,
              authenticated: true,
              role: res.data?.role,
              token: res.data?.token,
              ticket: res.data?.ticket
            })
          }

        } catch (error) {
          loading(false)
          console.log({ error })
        }
      }
    }

    !authenticated && fetchUser();

  }, [])

  return (
    <Layout>
      <Loader>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/ticket' element={<BusList />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/admin' element={<Admin />} />
          <Route element={<Protected />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/order-history' element={<OrderHistory />} />
            {/* <Route path='/cancel-ticket' element={<CancelTicket />} /> */}
          </Route>
          <Route element={<AdminProtected />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Loader>
    </Layout>
  )
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Loader />}>
//       <Route path='/' element={<Navbar />}>
//         <Route path='/' element={<Home />}>
//           <Route path='/ticket' element={<BusList />} />
//         </Route>
//         <Route path='/sign-in' element={<SignIn />} />
//         <Route path='/sign-up' element={<SignUp />} />
//         <Route path='/admin' element={<Admin />} />
//         <Route element={<Protected />}>
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/order-history' element={<OrderHistory />} />
//           {/* <Route path='/cancel-ticket' element={<CancelTicket />} /> */}
//         </Route>
//         <Route element={<AdminProtected />}>
//           <Route path='/dashboard' element={<Dashboard />} />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//       </Route>
//     </Route>
//   )
// );

// return <RouterProvider router={router} />


export default App


// check busy or not 
// const navigation = useNavigation();
//   const busy = navigation.state === "submitting";


// explore about Outlet component.
// ask rasel vai about admin route