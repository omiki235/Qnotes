<template>
  <div>
    <div class="container">
      <br /><br />
      <h1 class="text-center">Todos Add</h1>
      <br /><br />
      <form>
        <div class="form-group">
          <input
            type="text"
            name="title"
            placeholder="title"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-danger btn-block">Add Todo</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
    };
  },
};
</script>

<style scoped></style>
