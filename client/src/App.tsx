import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Sign from './pages/Sign';
import Navbar from './components/Navbar';
import MyPosts from './pages/MyPosts';
import Profile from './pages/Profile';
import Protected from './components/Protected';
import { Theme } from '@chakra-ui/react';
import { useThemeStore } from './store/themeStore';

function App() {
  const { theme } = useThemeStore();
  return (
    <>
      <Theme appearance={theme}>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Sign />} />
          <Route element={<Protected />}>
            <Route path='/my-posts' element={<MyPosts />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Theme>
    </>
  )
}

export default App