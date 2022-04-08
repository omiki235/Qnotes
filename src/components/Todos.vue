<template>
  <div>
    <div v-bind:key="todo.id" v-for="todo in todos">
      {{ todo.title }}
    </div>
  </div>
</template>

<script>
// import TodoItem from "./TodoItem.vue";
export default {
  name: "ToDos",
  props: ["todos"],
  components: {},
};
</script>

<style scoped></style>
