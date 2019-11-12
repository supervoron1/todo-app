<template>
  <div class="home">
    <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";

export default {
  name: 'home',
  components: {
    TodoList,
  }
}
</script>
