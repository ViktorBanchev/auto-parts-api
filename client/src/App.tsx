import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar'
import LoginPage from './pages/Auth/Login'
import RegisterPage from './pages/Auth/Register'
import Cart from './pages/Cart/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import ProductsPage from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'

function App() {
	return (
		<>
			<NavBar />
			
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/products/:slug' element={<ProductDetails />} />

				<Route element={<ProtectedRoute />}>
					<Route path='/checkout' element={(<h2>Checkout page</h2>)} />
				</Route>
			</Routes>
		</>
	)
}

export default App
