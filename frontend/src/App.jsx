import { useState ,useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Navigate , Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage/home'
import LoginPage from './pages/loginPage/login'

import { useSelector } from 'react-redux'
import { themeSettings } from './theme'
// import { ThemeProvider,  } from '@emotion/react'
import { ThemeProvider , CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import ProfilePage from './pages/profilePage/profilePage'
import Chat from './pages/chat/chat'

themeSettings

function App() {
  
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token))
  // console.log(isAuth);
  // console.log(mode);
  return <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={ isAuth ?<HomePage />: <Navigate to="/" />} />
              <Route path="/chat" element={ isAuth ?<Chat />: <Navigate to="/" />} />
              <Route path="/profile/:userId" element={ isAuth ?<ProfilePage />: <Navigate to="/" />} />
            </Routes>

        </ThemeProvider>
          
      </BrowserRouter>
  </div>
}

export default App
