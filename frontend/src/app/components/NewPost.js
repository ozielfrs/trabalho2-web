import React, { useState } from 'react'
import { Button, Modal, Form, ButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import { link } from './config/conf'

function NewPost(props) {
	const [show, setShow] = useState(false),
		[title, settitle] = useState(''),
		[content, setcontent] = useState('')

	const handleClose = () => {
			setShow(false)
			clearData()
		},
		handleShow = () => setShow(true),
		handleNewTitle = event => {
			settitle(event.target.value)
		},
		handleNewContent = event => {
			setcontent(event.target.value)
		},
		clearData = () => {
			settitle('')
			setcontent('')
		},
		handleSubmit = () => {
			if (title.length > 0 && title.length < 64 && content.length > 0) {
				axios
					.post(
						link.concat(
							`post/?title=${title}&content=${content}&usuario_id=${props.usuario_id}`
						)
					)
					.catch(err => console.error(err))
				setShow(false)
			}
		}

	return (
		<>
			<Button variant="primary" className="m-4" onClick={handleShow}>
				Criar uma nova postagem
			</Button>

			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Olá, {props.first_name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="textarea">
							<Form.Label>Digite o título de sua postagem:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Título..."
								id="formcontrolmodaltitle"
								onChange={handleNewTitle}
							/>
							<Form.Label>Digite o que deseja postar aqui:</Form.Label>
							<Form.Control
								type="text"
								placeholder="O que deseja dizer ao mundo..."
								id="formcontrolmodalcontent"
								onChange={handleNewContent}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<ButtonGroup>
						<Button variant="primary" type="submit" onClick={handleSubmit}>
							Postar
						</Button>
						<Button variant="secondary" onClick={handleClose}>
							Fechar
						</Button>
					</ButtonGroup>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default NewPost
