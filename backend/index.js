const { Client } = require(`pg`),
	{ port, link } = require(`./conf`),
	express = require(`express`),
	cors = require(`cors`),
	bodyparser = require(`body-parser`)

/**
 * Adiciona parâmetros para a consulta em SQL
 * @param {String} query
 * @param {String} type
 * @param {String} key
 * @param {String} val
 */
const queryAdd = (query, type, key, val) => {
	if (query.endsWith(`;`)) query.slice(0, -1)

	if (type === `number`)
		query = query.includes(`WHERE`)
			? query.concat(' ' + `AND ${key} = ${val}`)
			: query.concat(' ' + `WHERE ${key} = ${val}`)
	else if (type === `str`)
		query = query.includes(`WHERE`)
			? query.concat(' ' + `AND ${key} LIKE '%${val}%'`)
			: query.concat(' ' + `WHERE ${key} LIKE '%${val}%'`)
	else if (type === `date`) {
		query = query.includes(`WHERE`)
			? val.includes(`>`)
				? query.concat(
						' ' +
							`AND ${key} >= TO_TIMESTAMP('${val.slice(
								1,
								val.length
							)}', 'DD-MM-YYYY-HH-MI-SS')`
				  )
				: query.concat(
						' ' +
							`AND ${key} <= TO_TIMESTAMP('${val.slice(
								1,
								val.length
							)}', 'DD-MM-YYYY-HH-MI-SS')`
				  )
			: val.includes(`>`)
			? query.concat(
					' ' +
						`WHERE ${key} >= TO_TIMESTAMP('${val.slice(
							1,
							val.length
						)}', 'DD-MM-YYYY-HH-MI-SS')`
			  )
			: query.concat(
					' ' +
						`WHERE ${key} <= TO_TIMESTAMP('${val.slice(
							1,
							val.length
						)}', 'DD-MM-YYYY-HH-MI-SS')`
			  )
	}

	if (query.startsWith(`UPDATE`)) query = query.concat(' ' + ``)

	return query
}

const ExpressApp = express()

ExpressApp.use(express.json(), bodyparser.json())

let client = new Client(link)

client
	.connect()
	.then(() => {
		client.query(`SELECT NOW()::timestamp;`, (error, result) => {
			if (error) {
				console.error(error)
				return
			}
			result.rows.forEach(row => console.log(row))
		})
	})
	.catch(err => console.error(err))

ExpressApp.get(`/`, (req, res) => {
	const { creator } = req.query
	if (creator) {
		res.status(200).send({
			message: `Oziel Ferreira, Celomar Filho, Willian Luiz`,
		})
		return
	}
	res.status(200).send({ message: `OK` })
})

/**
 * Usuario
 */
ExpressApp.get(`/usuario`, (req, res) => {
	const { id, first_name, last_name, username, email, password } = req.query

	let query = `SELECT * FROM usuario`

	if (id) query = queryAdd(query, `number`, `id`, id)
	if (first_name) query = queryAdd(query, `str`, `first_name`, first_name)
	if (last_name) query = queryAdd(query, `str`, `last_name`, last_name)
	if (username) query = queryAdd(query, `str`, `username`, username)
	if (email) query = queryAdd(query, `str`, `email`, email)
	if (password) query = queryAdd(query, `str`, `password`, password)

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.post(`/usuario`, (req, res) => {
	const { first_name, last_name, username, email, password } = req.query

	let query

	if (first_name && last_name && username && email && password) {
		query = `INSERT INTO usuario (first_name, last_name, username, email, password) VALUES ('${first_name}', '${last_name}', '${username}', '${email}', '${password}') `
	}

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.put(`/usuario`, (req, res) => {
	const { id, first_name, last_name, email } = req.query

	let query

	if (id && first_name && last_name && email) {
		query = `UPDATE usuario SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}' WHERE id = ${id} `
	} else if (id && first_name) {
		query = `UPDATE usuario SET first_name = '${first_name}' WHERE id = ${id} `
	} else if (id && last_name) {
		query = `UPDATE usuario SET last_name = '${last_name}' WHERE id = ${id} `
	} else if (id && email) {
		query = `UPDATE usuario SET email = '${email}' WHERE id = ${id} `
	}

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.delete(`/usuario`, (req, res) => {
	const { id } = req.query

	let query

	if (id) {
		query = `DELETE FROM post WHERE id = ${id};`
	}

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

/**
 * Posts
 */
ExpressApp.get(`/post`, (req, res) => {
	const { id, title, content, created, edited } = req.query

	let query = `SELECT p.id, p.title, p.content, p.created, p.edited, p.usuario_id, u.first_name, u.last_name, u.username FROM post p`

	if (id) query = queryAdd(query, `number`, `id`, id)
	if (title) query = queryAdd(query, `str`, `title`, title)
	if (content) query = queryAdd(query, `str`, `content`, content)
	if (created) query = queryAdd(query, `date`, `created`, created)
	if (edited) query = queryAdd(query, `date`, `edited`, edited)

	query += ' INNER JOIN usuario u ON p.usuario_id = u.id'

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.post(`/post`, (req, res) => {
	const { title, content, usuario_id } = req.query

	let query

	if (title && content && usuario_id) {
		query = `INSERT INTO post (title, content, created, usuario_id) VALUES ('${title}', '${content}', '${new Date(
			Date.now()
		).toJSON()}', ${usuario_id}) `
	}

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.put(`/post`, (req, res) => {
	const { id, content, noflikes } = req.query

	let query

	if (id && content) {
		query = `UPDATE post SET content = '${content}', edited = '${new Date(
			Date.now()
		).toJSON()}' WHERE id = ${id} `
	} else if (id && noflikes) {
		query = `UPDATE post SET noflikes = ${noflikes} WHERE id = ${id} `
	}

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.delete(`/post`, (req, res) => {
	const { id } = req.query

	let query

	if (id) {
		query = `DELETE FROM post WHERE id = ${id};`
	}

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

/**
 * Comments
 */
ExpressApp.get(`/comment`, (req, res) => {
	const { id, post_id, usuario_id, content, created } = req.query

	let query = `SELECT c.id, c.usuario_id, c.post_id, c.content, c.created, u.first_name, u.last_name, u.username FROM comment c`

	if (id) query = queryAdd(query, `number`, `id`, id)
	if (post_id) query = queryAdd(query, `number`, `post_id`, post_id)
	if (usuario_id) query = queryAdd(query, `number`, `usuario_id`, usuario_id)
	if (content) query = queryAdd(query, `str`, `content`, content)
	if (created) query = queryAdd(query, `date`, `created`, created)

	query += ' INNER JOIN usuario u ON c.usuario_id = u.id'

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.post(`/comment`, (req, res) => {
	const { content, usuario_id, post_id } = req.query

	let query

	if (usuario_id && post_id && content) {
		query = `INSERT INTO comment (content, post_id, usuario_id, created) VALUES ('${content}', ${post_id} , ${usuario_id} , '${new Date(
			Date.now()
		).toJSON()}') `
	}

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.put(`/comment`, (req, res) => {
	const { id, content } = req.query

	let query

	if (id && content) {
		query = `UPDATE comment SET content = '${content}', edited = '${new Date(
			Date.now()
		).toJSON()}' WHERE id = ${id} `
	}

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.delete(`/comment`, (req, res) => {
	const { id } = req.query

	let query

	if (id) {
		query = `DELETE FROM comment WHERE id = ${id};`
	}

	client.query(query, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
})

ExpressApp.listen(port, () =>
	console.log(
		`Servidor respondendo na porta ${port}.\n`,
		`Se estiver usando o host local, acesse o link http://localhost:${port}/.\n`
	)
)

module.exports = ExpressApp
