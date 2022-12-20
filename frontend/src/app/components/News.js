import React, { useEffect, useState } from 'react'
import {
	Button,
	ButtonGroup,
	ButtonToolbar,
	Container,
	Card,
} from 'react-bootstrap'
import { link } from './config/conf'
import NewPost from './NewPost'
import Comments from './Comments'

const News = props => {
	const [posts, setpost] = useState([]),
		[first, setfirst] = useState(0),
		[last, setlast] = useState(10)

	useEffect(() => {
		fetch(link.concat('post/'))
			.then(res => res.json())
			.then(data => setpost(data))
			.catch(err => console.error(err))
	}, [posts])

	return (
		<Container className="d-flex flex-column justify-content-center align-items-center">
			<Container className="d-flex flex-row justify-content-around">
				<NewPost {...props} />
				<ButtonToolbar
					className="justify-content-between m-4"
					aria-label="Toolbar with Button groups">
					<ButtonGroup aria-label="First group">
						<Button
							onClick={() => {
								if (first - 10 >= 0 && last !== posts.length) {
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
								if (last + 10 <= posts.length) {
									setfirst(first + 10)
									setlast(last + 10)
								} else if (last <= posts.length) {
									setfirst(parseInt(posts.length / 10) * 10)
									setlast(posts.length)
								}
							}}>
							&#62;&#62;
						</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</Container>
			{posts ? (
				posts.slice(first, last).map(post => (
					<Card key={`post${post.id}`} className="m-2" style={{ width: '75vw' }}>
						<Card.Header>
							{post.edited
								? ' (Editado em ' +
								  new Date(post.edited).toLocaleDateString() +
								  ' ' +
								  new Date(post.edited).toLocaleTimeString() +
								  ')'
								: ''}
						</Card.Header>
						<Card.Body>
							<Card.Title>{post.title}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								Por {post.first_name} {post.last_name} em{' '}
								{new Date(post.created).toLocaleDateString()}{' '}
								{new Date(post.created).toLocaleTimeString()}
							</Card.Subtitle>
							<Card.Text>{post.content}</Card.Text>
							<Comments key={`commentButton${post.id}`} {...post} />
						</Card.Body>
					</Card>
				))
			) : (
				<div></div>
			)}
		</Container>
	)
}

export default News
