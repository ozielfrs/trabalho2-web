import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

function SearchForm() {
	const [searchTerm, setSearchTerm] = useState('')

	function handleChange(event) {
		setSearchTerm(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault()
	}

	return (
		<div className="d-flex justify-content-end">
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="textarea">
					<Form.Label>
						<Form.Control
							type="text"
							className="searchForm"
							value={searchTerm}
							onChange={handleChange}
							placeholder="Pesquisar..."
						/>
					</Form.Label>
				</Form.Group>
			</Form>
		</div>
	)
}

export default SearchForm
