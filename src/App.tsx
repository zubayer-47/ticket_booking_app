import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BusList from './components/BusList'
import Home from './views/Home'

function App() {

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/ticket' element={<BusList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
