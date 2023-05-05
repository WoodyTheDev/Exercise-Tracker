
<template>
	<div>
		<div class="main">
			<h3>Todo List</h3>

			<form class="form">
				<input
					class="input"
					v-model="title"
					type="text"
					name="name"
					placeholder="Enter todo"
				/>
				<br />
				<input
					class="input"
					v-model="description"
					type="text"
					name="description"
					placeholder="Enter Description"
				/>
				<br />
				<button class="submit-button" @click="addTodo">Add Todo</button>
			</form>
			<div class="todo-container">
				<ul>
					<li v-for="(todo, i) in todos" :key="todo._id">
						<div class="todo">
							<span class="todo-name">{{ todo.title }}</span>
							<span class="todo-description">{{ todo.description }}</span>
						</div>
						<button class="delete-btn" @click="removeTodo(todo, i)">
							DELETE TODO
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "App",
	data() {
		return {
			todos: [],
			description: "",
			title: "",
		};
	},
	async mounted() {
		const response = await axios.get("api/todoList/");
		this.todos = response.data;
	},
	methods: {
		async addTodo(e) {
			e.preventDefault();
			const response = await axios.post("api/todoList/", {
				title: this.title,
				description: this.description,
			});
			this.todos.push(response.data);
			this.title = "";
			this.description = "";
		},
		async removeTodo(item, i) {
			await axios.delete("api/todoList/" + item._id);
			this.todos.splice(i, 1);
		},
	},
};
</script>

<style></style>
