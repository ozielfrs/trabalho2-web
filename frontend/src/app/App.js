import Navigation from './components/Navigation'
import News from './components/News'
import About from './components/About'
import Users from './components/Users'
import Home from './components/Home'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { link } from './components/config/conf'
import Footer from './components/Footer'
import Login from './components/Login'

function App(props) {
	const [resp_user, setresp_user] = useState([])

	console.log(props.username, props.password)

	useEffect(() => {
		if (props.username && props.password)
			fetch(
				link.concat(
					`usuario/?username=${props.username}&password=${props.password}`
				)
			)
				.then(res => res.json())
				.then(data => setresp_user(data))
				.catch(err => console.error(err))
		else {
			fetch(link.concat(`usuario/?username=0&password=0`))
				.then(res => res.json())
				.then(data => setresp_user(data))
				.catch(err => console.error(err))
		}
	}, [props.username, props.password])

	return resp_user.length > 0 ? (
		<BrowserRouter>
			<Navigation />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							first_name={resp_user[0].first_name}
							last_name={resp_user[0].last_name}
						/>
					}
				/>
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
		<Login />
	)
}

export default App
