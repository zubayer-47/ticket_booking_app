import { Route, Routes } from 'react-router-dom'
import BusList from './components/BusList'
import Layout from './components/Layouts/Layout'
import Navbar from './components/Navbar'
import Protected from './utils/Protected'
import Home from './views/Home'
import SignIn from './views/auth/SignIn'
import SignUp from './views/auth/SignUp'
import CancelTicket from './views/cancelTicket/CancelTicket'

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
        <Route element={<Protected />}>
          <Route path='/cancel-ticket' element={<CancelTicket />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App
