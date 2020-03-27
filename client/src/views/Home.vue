<template>
	<div class="home">
		<div
			style="max-width: 70%; min-height: 90%; box-shadow: 1em .6em 2em grey"
			class="container my-4 py-4"
			id="todo-list-example"
		>
			<div class="row">
				<div class="col-md-6 mx-auto ">
					<h1 class="text-center">TODOLIST</h1>
					<form v-if="showTasks">
						<input
							v-model="taskName"
							type="text"
							class="form-control mt-0 mb-2"
							placeholder="Add new task"
						/>

						<input
							v-model="taskDescription"
							type="text"
							class="form-control mt-0 mb-2"
							placeholder="Add description"
						/>

						<button
							@click="addTask"
							type="button"
							class="btn btn-block btn-success"
							:disabled="$v.$anyError"
						>
							Add Task
						</button>
					</form>

					<!-- Update form -->
					<form v-else>
						<input
							v-model="taskName"
							type="text"
							class="form-control mt-0 mb-2"
							placeholder="Add new task"
						/>

						<input
							v-model="taskDescription"
							type="text"
							class="form-control mt-0 mb-2"
							placeholder="Add description"
						/>

						<button
							@click="updateTask"
							:disabled="$v.$anyError"
							type="button"
							class="btn btn-block btn-primary"
						>
							Update Task
						</button>
					</form>

					<transition-group
						appear
						name="slide-up"
						tag="table"
						class="table"
						v-if="showTasks"
					>
						<tr v-for="task in tasks" :key="task.id">
							<i
								class="fas fa-pencil-alt"
								style="color: grey; margin-top: 1em;"
								@click="update(task.id)"
							></i>
							<td class="text-left" @click="showDescription = !showDescription">
								{{ task.task_name }}
							</td>
							<td style="color: grey;" v-if="showDescription">
								{{ task.task_description }}
							</td>
							<td
								id="del"
								class="text-right text-danger"
								@click="deleteTask(task.id)"
							>
								X
							</td>
						</tr>
					</transition-group>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Api from "@/services/Api"
import { required, minLength } from "vuelidate/lib/validators"

export default {
	name: "Home",
	created() {
		this.getTasks()
	},
	data() {
		return {
			showDescription: false,
			showTasks: true,
			showError: false,
			taskName: "",
			taskDescription: "",
			message: "",
			tasks: [],
			id: null,
		}
	},
	validations: {
		taskName: {
			required,
			minLength: minLength(5),
		},
		taskDescription: {
			required,
			minLength: minLength(10),
		},
	},
	methods: {
		getTasks() {
			Api.getTasks()
				.then(res => {
					this.tasks = res.data
					this.$store.state.tasks = res.data
				})
				.catch(err => {
					console.log("error is " + err)
				})
		},
		addTask() {
			this.$v.$touch()
			Api.addNewTask({
				task_name: this.taskName,
				task_description: this.taskDescription,
			})
				.then(res => {
					this.message = res.data
					this.taskName = ""
					this.taskDescription = ""
					this.getTasks()
				})
				.catch(err => {
					this.message = err
				})
		},
		deleteTask(id) {
			Api.deleteTask(id)
				.then(res => {
					this.message = res.data
					this.getTasks()
				})
				.catch(err => {
					this.message = err
				})
		},
		update(id) {
			this.showTasks = false
			for (const task of this.tasks) {
				if (task.id === id) {
					this.taskName = task.task_name
					this.taskDescription = task.task_description
					this.id = id
				}
			}
		},
		updateTask() {
			this.$v.$touch()
			const id = this.id
			Api.updateTask(id, {
				task_name: this.taskName,
				task_description: this.taskDescription,
			})
				.then(res => {
					this.message = res.data
					this.taskName = ""
					this.taskDescription = ""
					this.getTasks()
				})
				.catch(err => {
					this.message = err
				})
			this.showTasks = true
			this.showError = false
		},
	},
}
</script>

<style scoped>
td,
i {
	cursor: pointer;
}

#del:hover,
i:hover {
	font-weight: bolder;
	font-size: 1.2em;
}

.slide-up-enter {
	transform: translateY(10px);
	opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
	transition: all 0.2s ease;
}

.slide-up-leave-to {
	transform: translateY(10px);
	opacity: 0;
}
</style>
