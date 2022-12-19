import Navigation from './components/Navigation'
import News from './components/News'
import About from './components/About'
import Register from './components/Register'
import Users from './components/Users'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { link } from './components/config/conf'
import Footer from './components/Footer'

function App() {
	const [resp_user, setresp_user] = useState([]),
		query = 'usuario/?username=adasd@&password=asdsadsadasd'
	useEffect(() => {
		fetch(link + query)
			.then(res => res.json())
			.then(data => setresp_user(data))
			.catch(err => console.error(err))
	}, [resp_user])

	return resp_user.length > 0 ? (
		<BrowserRouter>
			<Navigation />
			<Routes>
				<Route
					path="/news"
					element={
						<News
							usuario_id={resp_user[0].id}
							first_name={resp_user[0].first_name}
							last_name={resp_user[0].last_name}
						/>
					}
				/>
				<Route path="/user" element={<Users />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<footer>
				<Footer />
			</footer>
		</BrowserRouter>
	) : (
		<Register />
	)
}

export default App
