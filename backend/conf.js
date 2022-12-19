const dotenv = require(`dotenv`)

dotenv.config()

const { PORT, SERVER } = process.env

module.exports = {
	port: PORT,
	link: SERVER,
}
