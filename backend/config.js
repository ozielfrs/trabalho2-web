const dotenv = require(`dotenv`)

dotenv.config()

const { PORT, BACKEND_URL } = process.env

module.exports = {
	port: PORT,
	link: BACKEND_URL,
}
