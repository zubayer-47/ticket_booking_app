import { Route, Routes } from 'react-router-dom'
import BusList from './components/BusList'
import Layout from './components/Layouts/Layout'
import Navbar from './components/Navbar'
import AdminProtected from './utils/AdminProtected'
import Protected from './utils/Protected'
import Admin from './views/Admin/Admin'
import Dashboard from './views/Admin/Dashboard'
import Home from './views/Home'
import NotFound from './views/NotFound'
import SignIn from './views/auth/SignIn'
import SignUp from './views/auth/SignUp'
import OrderHistory from './views/orderHistory/OrderHistory'
import Profile from './views/profile/Profile'

function App() {

  return (
    <Layout>
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
    </Layout>
  )
}

export default App