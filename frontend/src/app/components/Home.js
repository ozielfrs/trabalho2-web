import React from 'react'
import { Container } from 'react-bootstrap'

const Home = props => {
	return (
		<>
			<Container className="d-flex justify-content-center align-items-middle m-4">
				Seja bem-vindo, {props.first_name} {props.last_name}
			</Container>
		</>
	)
}

export default Home
