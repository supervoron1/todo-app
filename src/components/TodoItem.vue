<template>
    <div class="todo-item">
       <span
           v-if="!editing"
           @dblclick="editTodo"
           :class="{completed: completed}">{{id}}) {{title}}
       </span>
        <input class="todo-edit" v-else="" type="text"
               v-model="title"
               @blur="doneEdit"
               @keyup.enter="doneEdit"
               @keyup.esc="cancelEdit" v-focus>
        <div class="popup-menu">
            <input type="checkbox" v-model="completed" @change="doneEdit" class="ml-15">
            <button @click="editTodo" type="button" class="close-btn ml-15"><i
                class="fas fa-pen"></i></button>
            <button @click="removeTodo(todo.id)" type="button" class="close-btn ml-15"><i
                class="fas fa-times"></i></button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'todo-item',
    props: {
      todo: {
        type: Object,
        required: true,
      },
      checkAll: {
        type: Boolean,
        required: true,
      }
    },
    data() {
      return {
        'id': this.todo.id,
        'title': this.todo.title,
        'completed': this.todo.completed,
        'editing': this.todo.editing,
        'beforeEditCache': '',
      }
    },

    watch: {
      checkAll() {
        this.completed = this.checkAll ? true : this.todo.completed
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    methods: {
      removeTodo(id) {
        this.$store.dispatch('deleteTodo', id)
      },
      editTodo() {
        this.beforeEditCache = this.title;
        this.editing = true
      },
      doneEdit() {
        if (this.title.trim() === '') {
          this.title = this.beforeEditCache
        }
        this.editing = false;
        this.$store.dispatch('updateTodo', {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing,
        })
      },
      cancelEdit() {
        this.title = this.beforeEditCache;
        this.editing = false
      },
    }
  }
</script>

