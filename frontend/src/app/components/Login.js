import React, { useEffect, useState } from 'react'
import { Form, Button, Card, Container, Navbar, Nav } from 'react-bootstrap'
import axios from 'axios'
import { link } from './config/conf'
import App from '../App'

function Login() {
	const [username, setusername] = useState(''),
		[password, setpassword] = useState(''),
		[log, setlog] = useState([]),
		[submit, setsubmit] = useState(false)

	const handleUserame = event => {
			setusername(event.target.value)
		},
		handlePassword = event => {
			setpassword(event.target.value)
		},
		handleSubmit = event => {
			setsubmit(true)
			event.preventDefault()
		}

	useEffect(() => {
		console.log(submit)
		if (submit)
			axios
				.get(link.concat(`usuario/?username=${username}&password=${password}`))
				.then(data => data.data)
				.then(data => {
					setlog(data[0])
					console.log(log)
					setsubmit(false)
				})
				.catch(err => console.error(err))
	}, [submit, log, password, username])

	return log.length === 0 ? (
		<>
			<Navbar bg="light" expand="lg">
				<Container className="d-flex align-middle">
					<Navbar.Brand href="/">CodeBase</Navbar.Brand>
					<Nav.Item>Tela de Login</Nav.Item>
				</Container>
			</Navbar>
			<Card className="m-4 p-2">
				<Form
					style={{ width: '75hw' }}
					className="d-flex align-items-center justify-content-center flex-column">
					<Form.Group className="mb-3" controlId="LoginForm.Usuario">
						<Form.Label>Nome de usuário:</Form.Label>
						<Form.Control
							type="text"
							placeholder="Nome de usuário"
							onChange={handleUserame}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="LoginForm.Password">
						<Form.Label>Senha: </Form.Label>
						<Form.Control
							type="password"
							placeholder="********"
							onChange={handlePassword}
						/>
					</Form.Group>
					<Button variant="primary" type="submit" onClick={handleSubmit}>
						Entrar
					</Button>
				</Form>
			</Card>
		</>
	) : (
		<App username={log.username} password={log.password} />
	)
}

export default Login
