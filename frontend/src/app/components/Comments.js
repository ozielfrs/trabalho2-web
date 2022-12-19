import React, { useEffect, useState } from 'react'
import {
	Button,
	ButtonToolbar,
	ButtonGroup,
	Card,
	Container,
	Modal,
} from 'react-bootstrap'
import NewComment from './NewComment'
import { link } from './config/conf'

function VerticallyCenteredComments(props) {
	const [comments, setcomment] = useState([]),
		[first, setfirst] = useState(0),
		[last, setlast] = useState(10)

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

				<ButtonToolbar
					className="justify-content-between m-4"
					aria-label="Toolbar with Button groups">
					<ButtonGroup aria-label="First group">
						<Button
							onClick={() => {
								if (first - 10 >= 0 && last !== comments.length) {
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
								if (last + 10 <= comments.length) {
									setfirst(first + 10)
									setlast(last + 10)
								} else if (last <= comments.length) {
									setfirst(parseInt(comments.length / 10) * 10)
									setlast(comments.length)
								}
							}}>
							&#62;&#62;
						</Button>
					</ButtonGroup>
				</ButtonToolbar>

				<Button onClick={props.onHide} variant="secondary" className="m-4">
					Fechar
				</Button>
			</Container>

			<Modal.Body>
				{comments ? (
					comments.slice(first, last).map(comment => {
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
