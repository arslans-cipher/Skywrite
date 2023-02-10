import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from 'scenes/homePage'
import LoginPage from 'scenes/loginPage'
import ProfilePage from 'scenes/profilePage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material'
import { themeSettings } from 'theme'


const App = () => {
  const mode = useSelector(state => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return <div className='app'>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes >
            <Route path='/' element={< LoginPage />} />
            <Route path='/home' element={< HomePage />} />
            <Route path='/profile/:userId' element={< ProfilePage />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
    <h1>Hello world</h1>
  </div>
}

export default App;
