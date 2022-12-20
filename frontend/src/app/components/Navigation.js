import React, { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
	const [page, setPage] = useState(
		window.location.href.includes('news')
			? 1
			: window.location.href.includes('about')
			? 2
			: 0
	)

	const toggleButton = buttonId => {
		setPage(buttonId)
	}

	return (
		<Navbar bg="light" expand="lg">
			<Container className="d-flex align-middle">
				<Navbar.Brand href="/">CodeBase</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					id="basic-navbar-nav"
					className="justify-content-end"
					style={{ width: 'inherit' }}>
					<Nav className="d-flex align-items-center mx-0 my-0">
						<Nav.Item className="mx-3">
							<Link
								to="/"
								onClick={() => toggleButton(1)}
								disabled={page === 1}
								style={{ textDecoration: 'none' }}
								className={page === 1 ? 'link-secondary' : 'link-primary'}>
								Home
							</Link>
						</Nav.Item>
						<Nav.Item className="mx-3">
							<Link
								to="/news"
								onClick={() => toggleButton(1)}
								disabled={page === 1}
								style={{ textDecoration: 'none' }}
								className={page === 1 ? 'link-secondary' : 'link-primary'}>
								Postagens
							</Link>
						</Nav.Item>
						<Nav.Item className="mx-3">
							<Link
								to="/user"
								onClick={() => toggleButton(2)}
								disabled={page === 2}
								style={{ textDecoration: 'none' }}
								className={page === 2 ? 'link-secondary' : 'link-primary'}>
								Usuários
							</Link>
						</Nav.Item>
						<Nav.Item className="mx-3">
							<Link
								to="/about"
								onClick={() => toggleButton(3)}
								disabled={page === 3}
								style={{ textDecoration: 'none' }}
								className={page === 3 ? 'link-secondary' : 'link-primary'}>
								Sobre
							</Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
