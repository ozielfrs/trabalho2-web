import Navigation from './components/Navigation'
import News from './components/News'
import About from './components/About'
import Users from './components/Users'
import Home from './components/Home'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
	return (
		<BrowserRouter>
			<Navigation />
			<Routes>
				<Route
					path="/"
					element={<Home first_name="Oziel" last_name="Ferreira" />}
				/>
				<Route
					path="/news"
					element={<News usuario_id="15" first_name="Oziel" last_name="Ferreira" />}
				/>
				<Route path="/user" element={<Users />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<footer>
				<Footer />
			</footer>
		</BrowserRouter>
	)
}

export default App
