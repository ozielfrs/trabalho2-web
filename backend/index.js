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
function equalDayMonthYear(d1, d2) {
	return (
		d1.getUTCDate() === d2.getUTCDate() &&
		d1.getUTCMonth() === d2.getUTCMonth() &&
		d1.getUTCFullYear() === d2.getUTCFullYear()
	)
}

/**
 *
 * @param {String} queryText
 * @param {Request} request
 * @param {Response} response
 */
function clientQuery(
	queryText,
	request,
	response
) {
	client.query(queryText, (error, result) => {
		if (error) {
			console.error(error)
			response.status(400).sendStatus(404)
			return
		}

		if (Object.keys(request.query).length != 0) {
			let answer = [],
				i = 0

			for (const key in request.query) {
				if (
					Object.hasOwnProperty.call(
						request.query,
						key
					)
				) {
					const element = request.query[key]
					if (result.rows[i][key] === undefined) {
						response.status(400).send(answer)
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
							equalDayMonthYear(
								new Date(row[key]),
								new Date(element)
							)
						)
					} else if (typeof value === `string`) {
						answerToPush = result.rows.filter(row =>
							row[key].includes(element)
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
			response.status(200).send(answer)
			return
		}
		response.status(200).send(result.rows)
		return
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

ExpressApp.get(`/`, (request, response) => {
	if (Object.keys(request.query).length != 0) {
		response.status(200).send({
			creators: [
				`Oziel Ferreira`,
				`Celomar Filho`,
				`Willian Luiz`,
			],
			company: `UNIFEI Campus Itabira`,
		})
		return
	}
	response.status(200).send({ response: `OK` })
})

ExpressApp.get(`/user`, (request, response) => {
	clientQuery(
		`SELECT u.id, u.created, u.name, u.description, u.deleted FROM "user" u;`,
		request,
		response
	)
})

ExpressApp.get(`/post`, (request, response) => {
	clientQuery(
		`SELECT * FROM post p;`,
		request,
		response
	)
})

ExpressApp.get(
	`/comment`,
	(request, response) => {
		clientQuery(
			`SELECT * FROM comment c;`,
			request,
			response
		)
	}
)

ExpressApp.listen(port, () =>
	console.log(
		`Servidor respondendo na porta ${port}.\n`,
		`Se estiver usando o host local, acesse o link http://localhost:${port}/.\n`,
		`Para acessar uma tabela especifica use, por exemplo, http://localhost:${port}/user/.\n`,
		`Para acessar um atributo especifico da consulta use, por exemplo, http://localhost:${port}/user/?id=1`
	)
)
