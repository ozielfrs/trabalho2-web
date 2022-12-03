const dotenv = require(`dotenv`)

dotenv.config({ path: `./private/.env` })

const { PORT, BACKEND_URL } = process.env

module.exports = {
	port: PORT,
	link: BACKEND_URL,
}
