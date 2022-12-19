import React, { useState } from 'react'
import { Form, Button, Card, Container, Navbar, Nav } from 'react-bootstrap'
import axios from 'axios'
import { link } from './config/conf'

function Register() {
	const [first_name, setfirst_name] = useState(''),
		[last_name, setlast_name] = useState(''),
		[username, setusername] = useState(''),
		[email, setemail] = useState(''),
		[password, setpassword] = useState(''),
		[log, setlog] = useState([])

	const handleName = event => {
			setfirst_name(event.target.value)
			console.log(first_name)
		},
		handleLastName = event => {
			setlast_name(event.target.value)
			console.log(last_name)
		},
		handleUserame = event => {
			setusername(event.target.value)
			console.log(username)
		},
		handleEmail = event => {
			setemail(event.target.value)
			console.log(email)
		},
		handlePassword = event => {
			setpassword(event.target.value)
			console.log(password)
		},
		clearData = () => {
			setfirst_name('')
			setlast_name('')
			setusername('')
			setemail('')
			setpassword('')
		},
		handleSubmit = event => {
			if (
				first_name.length > 0 &&
				first_name.length <= 32 &&
				last_name.length > 0 &&
				last_name.length <= 32 &&
				username.length > 0 &&
				username.length <= 16 &&
				email.length > 0 &&
				email.length <= 64 &&
				password.length > 0 &&
				password.length <= 64
			) {
				axios
					.post(
						link +
							`usuario/?first_name=${first_name}&last_name=${last_name}&username=${username}&email=${email}&password=${password}`
					)
					.then(data => {
						setlog(data)
						console.log(data)
					})
					.catch(err => console.error(err))
				clearData()
			}
			event.preventDefault()
		}

	return log.length === 0 ? (
		<>
			<Navbar bg="light" expand="lg">
				<Container className="d-flex align-middle">
					<Navbar.Brand href="/">CodeBase</Navbar.Brand>
					<Nav.Item>Tela de Registro</Nav.Item>
				</Container>
			</Navbar>
			<Card className="m-4 p-2">
				<Form
					style={{ width: '75hw' }}
					className="d-flex align-items-center justify-content-center flex-column">
					<Form.Group className="mb-3" controlId="registerForm.Email">
						<Form.Label>Nome:</Form.Label>
						<Form.Control type="text" placeholder="Nome..." onChange={handleName} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="registerForm.Email">
						<Form.Label>Sobrenome:</Form.Label>
						<Form.Control
							type="text"
							placeholder="Sobrenome..."
							onChange={handleLastName}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="registerForm.Email">
						<Form.Label>Nome de usuário:</Form.Label>
						<Form.Control
							type="text"
							placeholder="Nome de usuário"
							onChange={handleUserame}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="registerForm.Email">
						<Form.Label>Email:</Form.Label>
						<Form.Control
							type="email"
							placeholder="seu-email@email.com"
							onChange={handleEmail}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="registerForm.Password">
						<Form.Label>Senha: </Form.Label>
						<Form.Control type="password" onChange={handlePassword} />
					</Form.Group>
					<Button variant="primary" type="submit" onClick={handleSubmit}>
						Cadastrar
					</Button>
				</Form>
			</Card>
		</>
	) : (
		<div> Você já está registrado </div>
	)
}

export default Register
