const express = require("express")
const router = express.Router()
const Task = require("../models/Task")

// Get all tasks
router.get("/tasks", (req, res) => {
	Task.findAll()
		.then(tasks => {
			res.json(tasks)
		})
		.catch(err => {
			res.send("error is " + err)
		})
})

// Add task
router.post("/task", (req, res) => {
	if (!req.body.task_name || !req.body.task_description) {
		res.status(400)
		res.json({
			error: "Bad data",
		})
	} else {
		Task.create(req.body)
			.then(() => {
				res.send("Task successfully added")
			})
			.catch(err => {
				res.send("error adding task: " + err)
			})
	}
})

// Delete task
router.delete("/task/:id", (req, res) => {
	Task.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then(() => {
			res.send("Task deleted successfully")
		})
		.catch(err => {
			res.send("Error deleting task: " + err)
		})
})

// Update task
router.put("/task/:id", (req, res) => {
	if (!req.body.task_name || !req.body.task_description) {
		res.status(400)
		res.json({
			error: "Bad data",
		})
	} else {
		Task.update(
			{
				task_name: req.body.task_name,
				task_description: req.body.task_description,
				completed: req.body.completed,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		)
			.then(() => {
				res.send("Task successfully updated")
			})
			.catch(err => {
				res.send("Error updating task: " + err)
			})
	}
})

module.exports = router
