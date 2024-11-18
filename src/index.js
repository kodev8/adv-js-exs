const express = require("express")
const app = express()
app.use(express.json())
const db = require("./db")
const port = 3000

const Observable = require("./Observable")
const LogSubscriber = require("./subscribers/logSubscriber")
const NotifySubscriber = require("./subscribers/notifySubscriber")
const EmailSubscriber = require("./subscribers/emailSubscriber")
const DatabaseSubscriber = require("./subscribers/databaseSubscriber")

const logSubscriber = new LogSubscriber()
const notifySubscriber = new NotifySubscriber()
const emailSubscriber = new EmailSubscriber()
const databaseSubscriber = new DatabaseSubscriber()


const observable = new Observable() 

observable.subscribe(logSubscriber.listen.bind(logSubscriber))
observable.subscribe(notifySubscriber.listen.bind(notifySubscriber))
observable.subscribe(emailSubscriber.listen.bind(emailSubscriber))
observable.subscribe(databaseSubscriber.listen.bind(databaseSubscriber))

app.post("/", (req, res) => {
	const { name, createdAt } = req.body

	if (!name || !createdAt) {
		return res.status(400).json({ message: "Name and createdAt are required" })
	}

	const newData = { name, createdAt }

	console.log("Resource created:", newData)
	observable.notify(newData)

	res.status(201).json({ message: "Resource created", data: newData })
})

// Endpoint: Get all resources
app.get("/", (req, res) => {
	db.all(`SELECT * FROM resources`, [], (err, rows) => {
		if (err) {
			console.error("Error fetching resources:", err.message)
			return res.status(500).json({ message: "Error fetching resources" })
		}
		res.json({ data: rows })
	})
})

app.listen(port, () => {
	console.log(`Running here ... http://localhost:${port}/`)
})
