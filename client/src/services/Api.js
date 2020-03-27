import axios from "axios"

const apiCall = axios.create({
	baseURL: `https://azeez-fullstack-todolist.herokuapp.com/`,
})

export default {
	getTasks() {
		return apiCall.get("tasks")
	},
	addNewTask(task) {
		return apiCall.post("task", task)
	},
	deleteTask(id) {
		return apiCall.delete(`task/${id}`)
	},
	updateTask(id, task) {
		return apiCall.put(`task/${id}`, task)
	},
}
