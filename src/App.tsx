import { useCookies } from 'react-cookie'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import BusList from './components/BusList'
import Navbar from './components/Navbar'
import AdminProtected from './components/protected/AdminProtected'
import Protected from './components/protected/Protected'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Admin from './views/admin/Admin'
import Dashboard from './views/admin/Dashboard'
import SignIn from './views/auth/SignIn'
import SignUp from './views/auth/SignUp'
import OrderHistory from './views/orderHistory/OrderHistory'
import Profile from './views/profile/Profile'

function App() {
  const cookie = useCookies();

  // const { state } = useContext(Context)

  console.log({ cookie });

  // console.log({ _token });

  // console.log(state)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Navbar />}>
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
      </Route>
    )
  );

  return <RouterProvider router={router} />
}
//  (
//   <Layout>
//     <Navbar />
//     <Routes>
//       <Route path='/' element={<Home />}>
//         <Route path='/ticket' element={<BusList />} />
//       </Route>
//       <Route path='/sign-in' element={<SignIn />} loader={signInLoader} errorElement={<SignInError />} />
//       <Route path='/sign-up' element={<SignUp />} />
//       <Route path='/admin' element={<Admin />} />
//       <Route element={<Protected />}>
//         <Route path='/profile' element={<Profile />} />
//         <Route path='/order-history' element={<OrderHistory />} />
//         {/* <Route path='/cancel-ticket' element={<CancelTicket />} /> */}
//       </Route>
//       <Route element={<AdminProtected />}>
//         <Route path='/dashboard' element={<Dashboard />} />
//       </Route>
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   </Layout>
// )

export default App


// check busy or not 
// const navigation = useNavigation();
//   const busy = navigation.state === "submitting";


// explore about Outlet component.
// ask rasel vai about admin route