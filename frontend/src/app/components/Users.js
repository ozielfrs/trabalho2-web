import React, { useEffect, useState } from 'react'
import {
	Button,
	ButtonGroup,
	ButtonToolbar,
	Container,
	Card,
} from 'react-bootstrap'
import { link } from './config/conf'

const Users = () => {
	const [users, setusers] = useState([]),
		[first, setfirst] = useState(0),
		[last, setlast] = useState(10)

	useEffect(() => {
		fetch(link.concat('usuario/'))
			.then(res => (res ? res.json() : 0))
			.then(data => setusers(data))
			.catch(err => console.error(err))
	}, [users])

	return (
		<Container className="d-flex flex-column justify-content-center align-items-center">
			<Container className="d-flex flex-row justify-content-around">
				<ButtonToolbar
					className="justify-content-between m-4"
					aria-label="Toolbar with Button groups">
					<ButtonGroup aria-label="First group">
						<Button
							onClick={() => {
								if (first - 10 >= 0 && last !== users.length) {
									setfirst(first - 10)
									setlast(first)
								} else if (first - 10 >= 0) {
									setfirst(first - 10)
									setlast(first)
								}
							}}>
							&#60;&#60;
						</Button>
						<Button
							onClick={() => {
								if (last + 10 <= users.length) {
									setfirst(first + 10)
									setlast(last + 10)
								} else if (last <= users.length) {
									setfirst(parseInt(users.length / 10) * 10)
									setlast(users.length)
								}
							}}>
							&#62;&#62;
						</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</Container>
			{users ? (
				users.slice(first, last).map(user => (
					<Card key={user.id} className="m-2" style={{ width: '75vw' }}>
						<Card.Header>{user.email}</Card.Header>
						<Card.Body>
							<Card.Title>{user.first_name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{user.username}
							</Card.Subtitle>
						</Card.Body>
					</Card>
				))
			) : (
				<div></div>
			)}
		</Container>
	)
}

export default Users
