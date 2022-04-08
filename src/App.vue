<template>
  <div>
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" />
  </div>
</template>

<script>
import AddTodo from "./components/AddTodo.vue";
import Todos from "./components/Todos.vue";

export default {
  name: "App",
  components: {
    AddTodo,
    Todos,
  },
  data() {
    return {
      todos: [
        {
          id: "1",
          title: "Todo 1",
          completed: false,
        },
        {
          id: "2",
          title: "Todo 2",
          completed: false,
        },
      ],
    };
  },
  methods: {
    addTodo(todo) {
      this.todos = [...this.todos, todo];
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
