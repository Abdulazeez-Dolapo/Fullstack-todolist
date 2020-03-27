const cors = require("cors")
const morgan = require("morgan")
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const tasks = require("./routes/tasks")

const port = 3000
const app = express()

app.use(cors())
app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api", tasks)
app.use(express.static(path.join(__dirname, "../client/dist")))

app.listen(port, () => {
	console.log("Server started on port " + port)
})
