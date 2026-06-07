import { Route, Routes } from 'react-router'
// import './App.css'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar'
import LoginPage from './pages/Auth/Login'
import RegisterPage from './pages/Auth/Register'

function App() {
	return (
		<>
			<NavBar />
			
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</>
	)
}

export default App
