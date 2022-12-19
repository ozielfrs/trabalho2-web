import React, { useState } from 'react'
import { Button, Modal, Form, ButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import { link } from './config/conf'

function NewComment(props) {
	const [show, setShow] = useState(false),
		[content, setcontent] = useState('')

	const handleClose = () => {
			setShow(false)
			clearData()
		},
		handleShow = () => setShow(true),
		handleNewContent = event => {
			setcontent(event.target.value)
		},
		clearData = () => {
			setcontent('')
		},
		handleSubmit = () => {
			if (content.length > 0) {
				axios
					.post(
						link +
							`comment/?content=${content}&usuario_id=${props.usuario_id}&post_id=${props.id}`
					)
					.catch(err => console.error(err))
				setShow(false)
				clearData()
			}
		}

	return (
		<>
			<Button variant="primary" className="m-4" onClick={handleShow}>
				Criar um novo comentário
			</Button>

			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Criação de comentário</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="textarea">
							<Form.Label>Digite o que deseja comentar aqui:</Form.Label>
							<Form.Control
								id="formcontrolmodalcomment"
								type="text"
								placeholder="O que deseja dizer ao mundo..."
								onChange={handleNewContent}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<ButtonGroup>
						<Button variant="primary" type="submit" onClick={handleSubmit}>
							Comentar
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

export default NewComment
