import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { link } from './config/conf'

const About = () => {
	const [creators, setcreators] = useState('---')

	useEffect(() => {
		fetch(link.concat('?creator=who'))
			.then(res => (res ? res.json() : 0))
			.then(data => setcreators(data.message))
			.catch(err => console.error(err))
	}, [creators])

	return (
		<Container
			style={{ width: 'inherit' }}
			className="d-flex justify-content-center align-items-middle m-4">
			Trabalho desenvolvido para a disciplina de Desenvolvimento Web por {creators}
			.
		</Container>
	)
}

export default About
