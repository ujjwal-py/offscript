import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Sign from './pages/Sign';
import Navbar from './components/Navbar';
import Myposts from './pages/Myposts';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/auth' element={<Sign />} />
        <Route path='/my-posts' element={<Myposts />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>


    </>
  )
}

export default App