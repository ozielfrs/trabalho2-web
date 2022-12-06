const express = require(`express`),
	{ Client } = require(`pg`),
	cors = require(`cors`),
	bodyparser = require(`body-parser`),
	{ port, link } = require(`./config`)

/**
 *
 * @param {Date} d1
 * @param {Date} d2
 * @returns {Boolean} Day, month and year equal for the given date
 */
function afterDate(d1, d2) {
	return (
		d1.getTime() <= d2.getTime() &&
		d1.getUTCDate() == d2.getUTCDate() &&
		d1.getUTCMonth() == d2.getUTCMonth() &&
		d1.getUTCFullYear() == d2.getUTCFullYear()
	)
}

/**
 *
 * @param {String} queryText
 * @param {Request} req
 * @param {Response} res
 */
function clientSelectQuery(
	queryText,
	req,
	res
) {
	client.query(queryText, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}

		if (Object.keys(req.query).length != 0) {
			let answer = [],
				i = 0

			for (const key in req.query) {
				if (
					Object.hasOwnProperty.call(req.query, key)
				) {
					const element = req.query[key]
					if (result.rows[i][key] === undefined) {
						res.status(400).send(answer)
						return
					}
					let value = result.rows[i][key],
						answerToPush = []

					if (typeof value === `number`) {
						answerToPush = result.rows.filter(
							row => row[key] === Number(element)
						)
					} else if (typeof value === `object`) {
						answerToPush = result.rows.filter(row =>
							afterDate(
								new Date(element),
								new Date(row[key])
							)
						)
					} else if (typeof value === `string`) {
						answerToPush = result.rows.filter(row =>
							row[key]
								.toLowerCase()
								.includes(element.toLowerCase())
						)
					} else if (typeof value === `boolean`) {
						if (element === 'true') {
							answerToPush = result.rows.filter(
								row => row[key]
							)
						} else {
							answerToPush = result.rows.filter(
								row => !row[key]
							)
						}
					}
					answer.push(answerToPush)
				}
				i++
			}

			/**
			 * Get the intersections between all arrays and put it on the first index of the answer
			 */
			answer.forEach(array => {
				answer[0] = answer
					.at(0)
					.filter(element => array.includes(element))
			})

			res.status(200).send(answer.at(0))
			return
		}
		res.status(200).send(result.rows)
		return
	})
}

/**
 *
 * @param {String} queryText
 * @param {Response} res
 */
function clientInsertQuery(queryText, res) {
	client.query(queryText, (error, result) => {
		if (error) {
			res.status(400).sendStatus(400)
			return
		}
		res.status(200).send(result.rows)
	})
}

const ExpressApp = express()

ExpressApp.use(
	express.json(),
	bodyparser.json(),
	cors()
)

let client = new Client(link)

client
	.connect()
	.then(() => {
		client.query(
			`SELECT NOW()::timestamp;`,
			(error, result) => {
				if (error) {
					console.error(error)
					return
				}
				result.rows.forEach(row => console.log(row))
			}
		)
	})
	.catch(err => console.error(err))

ExpressApp.get(`/`, (req, res) => {
	if (Object.keys(req.query).length != 0) {
		res.status(200).send({
			creators: [
				`Oziel Ferreira`,
				`Celomar Filho`,
				`Willian Luiz`,
			],
			company: `UNIFEI Campus Itabira`,
		})
		return
	}
	res.status(200).send({ res: `OK` })
})

ExpressApp.get(`/user`, (req, res) => {
	clientSelectQuery(
		`SELECT * FROM user_data u;`,
		req,
		res
	)
})

ExpressApp.get(`/post`, (req, res) => {
	clientSelectQuery(
		`SELECT * FROM post p;`,
		req,
		res
	)
})

ExpressApp.get(`/comment`, (req, res) => {
	clientSelectQuery(
		`SELECT * FROM comment c;`,
		req,
		res
	)
})

ExpressApp.post('/user', (req, res) => {
	let now = new Date(Date.now()).toJSON()

	const { name, password, description } =
		req.query

	name && password && description
		? clientInsertQuery(
				`INSERT INTO "user"(created, name, password, description) VALUES ('${now}', '${name}', '${password}', '${description}')  RETURNING *`,
				res
		  )
		: res.status(400).sendStatus(400)
})

ExpressApp.post('/post', (req, res) => {
	let now = new Date(Date.now()).toJSON()

	const { user_id, title, content } = req.query

	user_id && title && content
		? clientInsertQuery(
				`INSERT INTO post (created, user_id, title, content) VALUES ('${now}', '${user_id}', '${title}', '${content}') RETURNING *`,
				res
		  )
		: res.status(400).sendStatus(400)
})

ExpressApp.post('/comment', (req, res) => {
	let now = new Date(Date.now()).toJSON()

	const { post_id, user_id, content } = req.query

	post_id && user_id && content
		? clientInsertQuery(
				`INSERT INTO comment (created, post_id, user_id, content) VALUES ('${now}', '${post_id}', '${user_id}', '${content}') RETURNING *`,
				res
		  )
		: res.status(400).sendStatus(400)
})

ExpressApp.put(`/user`, (req, res) => {
	const { id, name, password, description } =
		req.query

	if (id && name && password && description)
		clientInsertQuery(
			`UPDATE "user" SET name = '${name}', password='${password}', description='${description}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (id && name && password)
		clientInsertQuery(
			`UPDATE "user" SET name = '${name}', password='${password}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (id && name && description)
		clientInsertQuery(
			`UPDATE "user" SET name = '${name}', description='${description}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (id && password && description)
		clientInsertQuery(
			`UPDATE "user" SET password='${password}', description='${description}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (id && name)
		clientInsertQuery(
			`UPDATE "user" SET name = '${name}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (id && password)
		clientInsertQuery(
			`UPDATE "user" SET password = '${password}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (id && description)
		clientInsertQuery(
			`UPDATE "user" SET description = '${description}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else res.status(400).sendStatus(400)
})

ExpressApp.put(`/post`, (req, res) => {
	const { id, user_id, content, title } =
		req.query

	if (id && content && title)
		clientInsertQuery(
			`UPDATE post SET content = '${content}', title = '${title}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (id && content)
		clientInsertQuery(
			`UPDATE post SET content = '${content}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (id && title)
		clientInsertQuery(
			`UPDATE post SET title = '${title}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (user_id && content && title)
		clientInsertQuery(
			`UPDATE post SET content = '${content}', title = '${title}' WHERE user_id = ${user_id} RETURNING *;`,
			res
		)
	else if (user_id && content)
		clientInsertQuery(
			`UPDATE post SET content = '${content}' WHERE user_id = ${user_id} RETURNING *;`,
			res
		)
	else if (user_id && title)
		clientInsertQuery(
			`UPDATE post SET title = '${title}' WHERE user_id = ${user_id} RETURNING *;`,
			res
		)
	else res.status(400).sendStatus(400)
})

ExpressApp.put(`/comment`, (req, res) => {
	const { post_id, user_id, content, id } =
		req.query

	if (id && content)
		clientInsertQuery(
			`UPDATE comment SET content = '${content}' WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (post_id && user_id && content)
		clientInsertQuery(
			`UPDATE comment SET content = '${content}' WHERE post_id = ${post_id} AND user_id = ${user_id} RETURNING *;`,
			res
		)
	else if (post_id && content)
		clientInsertQuery(
			`UPDATE comment SET content = '${content}' WHERE post_id = ${post_id} RETURNING *;`,
			res
		)
	else if (user_id && content)
		clientInsertQuery(
			`UPDATE comment SET content = '${content}' WHERE user_id = ${user_id} RETURNING *;`,
			res
		)
	else res.status(400).sendStatus(400)
})

ExpressApp.delete(`/user`, (req, res) => {
	const { id, name, description } = req.query

	if (id)
		clientInsertQuery(
			`UPDATE "user" SET deleted = TRUE WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (name)
		clientInsertQuery(
			`UPDATE "user" SET deleted = TRUE WHERE name LIKE '%${name}%' RETURNING *;`,
			res
		)
	else if (description)
		clientInsertQuery(
			`UPDATE "user" SET deleted = TRUE WHERE description LIKE '%${description}%' RETURNING *;`,
			res
		)
	else res.status(400).sendStatus(400)
})

ExpressApp.delete(`/post`, (req, res) => {
	const { id, title, user_id, content } =
		req.query

	if (id)
		clientInsertQuery(
			`UPDATE post SET deleted = TRUE WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (title && user_id)
		clientInsertQuery(
			`UPDATE post SET deleted = TRUE WHERE user_id = ${user_id} AND title LIKE '%${title}%' RETURNING *;`,
			res
		)
	else if (content && user_id)
		clientInsertQuery(
			`UPDATE post SET deleted = TRUE WHERE user_id = ${user_id} AND content LIKE '%${content}%' RETURNING *;`,
			res
		)
	else if (content && title)
		clientInsertQuery(
			`UPDATE post SET deleted = TRUE WHERE title LIKE '%${title}%' AND content LIKE '%${content}%' RETURNING *;`,
			res
		)
	else if (user_id)
		clientInsertQuery(
			`UPDATE post SET deleted = TRUE WHERE user_id = ${user_id} RETURNING *;`,
			res
		)
	else if (title)
		clientInsertQuery(
			`UPDATE post SET deleted = TRUE WHERE title LIKE '%${title}%' RETURNING *;`,
			res
		)
	else if (content)
		clientInsertQuery(
			`UPDATE post SET deleted = TRUE WHERE content LIKE '%${content}%' RETURNING *;`,
			res
		)
	else res.status(400).sendStatus(400)
})

ExpressApp.delete(`/comment`, (req, res) => {
	const { id, post_id, user_id, content } =
		req.query

	if (id)
		clientInsertQuery(
			`UPDATE comment SET deleted = TRUE WHERE id = ${id} RETURNING *;`,
			res
		)
	else if (post_id && user_id && content)
		clientInsertQuery(
			`UPDATE comment SET deleted = TRUE WHERE post_id = ${post_id} AND user_id = ${user_id} AND content LIKE '%${content}%' RETURNING *;`,
			res
		)
	else if (post_id && content)
		clientInsertQuery(
			`UPDATE comment SET deleted = TRUE WHERE post_id = ${post_id} AND content LIKE '%${content}%' RETURNING *;`,
			res
		)
	else if (post_id && user_id)
		clientInsertQuery(
			`UPDATE comment SET deleted = TRUE WHERE post_id = ${post_id} AND user_id = ${user_id} RETURNING *;`,
			res
		)
	else if (user_id && content)
		clientInsertQuery(
			`UPDATE comment SET deleted = TRUE WHERE user_id = ${user_id} AND content LIKE '%${content}%' RETURNING *;`,
			res
		)
	else if (post_id)
		clientInsertQuery(
			`UPDATE comment SET deleted = TRUE WHERE post_id = ${post_id} RETURNING *;`,
			res
		)
	else if (user_id)
		clientInsertQuery(
			`UPDATE comment SET deleted = TRUE WHERE user_id = ${user_id} RETURNING *;`,
			res
		)
	else if (content)
		clientInsertQuery(
			`UPDATE comment SET deleted = TRUE WHERE content LIKE '%${content}%' RETURNING *;`,
			res
		)
	else res.status(400).sendStatus(400)
})

ExpressApp.listen(port, () =>
	console.log(
		`Servidor respondendo na porta ${port}.\n`,
		`Se estiver usando o host local, acesse o link http://localhost:${port}/.\n`,
		`Para acessar uma tabela especifica use, por exemplo, http://localhost:${port}/user/.\n`,
		`Para encontrar um atributo especifico usando a consulta use, por exemplo, http://localhost:${port}/user/?id=1`
	)
)

module.exports = ExpressApp