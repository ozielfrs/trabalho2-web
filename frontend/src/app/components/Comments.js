import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Modal } from 'react-bootstrap'
import NewComment from './NewComment'
import { link } from './config/conf'

function VerticallyCenteredComments(props) {
	const [comments, setcomment] = useState([])

	useEffect(() => {
		fetch(link.concat('comment/'))
			.then(res => res.json())
			.then(data => setcomment(data))
			.catch(err => console.error(err))
	}, [comments])

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Comentários nesta postagem
				</Modal.Title>
			</Modal.Header>
			<Container className="d-flex flex-row justify-content-between">
				<NewComment {...props} />
				<Button onClick={props.onHide} variant="secondary" className="m-4">
					Fechar
				</Button>
			</Container>

			<Modal.Body>
				{comments ? (
					comments.map(comment => {
						if (comment.post_id === props.id)
							return (
								<Card key={comment.id} className="m-2" style={{ width: 'inherit' }}>
									<Card.Body>
										<Card.Text>{comment.content}</Card.Text>
										<Card.Subtitle className="mb-2 text-muted">
											Por {comment.first_name} {comment.last_name} em em{' '}
											{new Date(comment.created).toLocaleDateString()}{' '}
											{new Date(comment.created).toLocaleTimeString()}
										</Card.Subtitle>
									</Card.Body>
								</Card>
							)
						return <></>
					})
				) : (
					<div></div>
				)}
			</Modal.Body>
		</Modal>
	)
}

function Comments(props) {
	const [modalShow, setModalShow] = React.useState(false)

	return (
		<>
			<Button variant="primary" onClick={() => setModalShow(true)}>
				Comentários
			</Button>

			<VerticallyCenteredComments
				{...props}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	)
}

export default Comments
