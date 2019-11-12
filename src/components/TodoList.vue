<template>
    <div>
        <div class="wrapper">
            <div class="header">
                <h3>{{ title }}</h3>
                <button class="close-btn" @click="showMenu"
                        @keyup.esc="hideMenu"><span class="more">...</span></button>
                <div class="drop-menu top" :class="{show: this.showModal}">
                    <button @click="hideMenu" type="button" class="drop-btn">&times;</button>
                    <button class="drop-btn">
                        <todo-check-all></todo-check-all>
                    </button>
                    <button @click="clearCompleted" type="button" class="drop-btn">Clear Done
                    </button>
                    <button @click="sortReverse" type="button" class="drop-btn">SortReverse</button>
                </div>
            </div>
            <textarea type="text" placeholder="Enter a title for this card..."
                      v-model="newTodo" @keyup.enter="addTodo" required></textarea>
            <div class="form-btn">
                <div class="sub-btn">
                    <button type="submit" @click="addTodo" name="button" class="add-btn">Add Card
                    </button>
                    <button class="close-btn" @click="clearField"><i class="fas fa-times"></i>
                    </button>
                </div>
                <button class="close-btn" @click="showMenu"
                        @keyup.esc="hideMenu"><span class="more add-more">...</span></button>
                <!--                <div class="drop-menu" :class="{show: this.showModal}">-->
                <!--                    <button @click="hideMenu" type="button" class="drop-btn">&times;</button>-->
                <!--                    &lt;!&ndash;                    <todo-filtered></todo-filtered>&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    <button @click="selectAll" type="button" class="drop-btn">&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        {{this.anyRemaining ? 'Select' : 'Unselect'}} All&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    </button>&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    <button @click="removeDone" type="button" class="drop-btn">RemoveDone</button>&ndash;&gt;-->
                <!--                    <button @click="sortReverse" type="button" class="drop-btn">SortReverse</button>-->
                <!--                </div>-->
            </div>
            <transition-group name="fade" enter-active-class="animated fadeInUp"
                              leave-active-class="animated fadeOutDown">
                <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo"
                           :checkAll="!anyRemaining">
                </todo-item>
            </transition-group>
            <div class="extra-container">
                <todo-check-all></todo-check-all>
                <todo-items-remaining></todo-items-remaining>
            </div>

            <div class="extra-container">
                <todo-filtered></todo-filtered>

                <div>
                    <transition name="fade">
                        <todo-clear-completed></todo-clear-completed>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import TodoItem from './TodoItem'
  import TodoItemsRemaining from './TodoItemsRemaining'
  import TodoCheckAll from './TodoCheckAll'
  import TodoFiltered from './TodoFiltered'
  import TodoClearCompleted from './TodoClearCompleted'

  export default {
    name: 'todo-list',
    components: {
      TodoItem,
      TodoItemsRemaining,
      TodoCheckAll,
      TodoFiltered,
      TodoClearCompleted,
    },
    data() {
      return {
        title: 'Задачи',
        newTodo: '',
        idForTodo: 4,
        showModal: false
      }
    },
    computed: {
      anyRemaining() {
        return this.$store.getters.anyRemaining
      },
      todosFiltered() {
        return this.$store.getters.todosFiltered
      }
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim().length === 0) {
          return
        }

        this.$store.dispatch('addTodo', {
          id: this.idForTodo,
          title: this.newTodo,
        });

        this.newTodo = '';
        this.idForTodo++
      },
      clearField() {
        this.newTodo = '';
      },
      showMenu() {
        this.showModal = true;
      },
      hideMenu() {
        this.showModal = false;
      },
      sortReverse() {
        this.$store.state.todos.reverse();
        this.showModal = false;
      },
      clearCompleted() {
        this.$store.dispatch('clearCompleted')
        this.showModal = false;
      },
      selectAll() {
        if (this.anyRemaining) {
          this.$store.state.todos.forEach(todo => {
            todo.done = true;
          })
        } else {
          this.$store.state.todos.forEach(todo => {
            todo.done = false;
          })
        }
        this.showModal = false;
      },
    }
  }
</script>

<style lang="scss">
    .wrapper {
        position: relative;
        max-width: 370px;
        padding: 15px;
        background-color: #e0e3e6;
    }

    .header {
        padding: 0 10px 10px 10px;
        display: flex;
        justify-content: space-between;
        color: #243849;
    }

    .btn-header {
        border: none;
        background-color: #e0e3e6;
    }

    textarea {
        display: block;
        width: 100%;
        height: 100px;
        font-size: 18px;
        padding: 10px;
        margin-bottom: 5px;
        resize: none;
        border: none;
        border-radius: 5px;
        border-bottom: outset;
        outline: none;
        background: #ffffff !important;
    }

    .add-btn {
        padding: 10px;
        margin-right: 20px;
        font-size: 16px;
        font-weight: bold;
        box-shadow: none;
        border: none;
        border-bottom: outset;
        border-radius: 5px;
        outline: none;
        background-color: #7ca65c;
        color: white;
    }

    .close-btn {
        position: relative;
        border: none;
        outline: none;
        background: transparent;
        color: #808d97;
    }

    .form-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;
    }

    .sub-btn {
        display: flex;
        justify-content: space-between;
    }

    .completed {
        text-decoration: line-through;
        color: grey;
    }

    .todo-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        border-bottom: outset;
        padding: 10px;
        border-radius: 5px;
        background-color: #fff;
        list-style-type: none;
    }

    .todo-item:hover {
        background-color: rgba(255, 255, 255, .5);
    }

    .todo-edit {
        border: none;
        font-size: 16px;
        background-color: rgba(255, 255, 255, 0);
        outline: none;
    }

    .fa-times {
        font-size: 18px;
    }

    .more {
        position: absolute;
        bottom: 3px;
        right: 0;
        font-size: 30px;
    }

    .add-more {
        bottom: -10px;
    }

    .fa-pen {
        font-size: 16px;
    }

    .popup-menu {
        display: none;
        justify-content: space-between;
        align-items: center;
    }

    .todo-item:hover .popup-menu {
        display: flex;
    }

    .ml-15 {
        margin-left: 15px;
    }

    .form-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;
    }

    .drop-menu {
        position: absolute;
        left: 225px;
        top: 188px;
        width: 130px;
        height: auto;
        display: none;
        z-index: 1;
        flex-direction: column;
        justify-content: space-between;
    }

    .drop-btn input {
        display: none;
    }

    .top {
        top: 38px;
    }

    .drop-menu:before {
        content: '';
        display: block;
        width: 9px;
        height: 9px;
        background-color: lightgray;
        position: absolute;
        top: -5px;
        right: 17px;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .show {
        display: flex;
    }

    .drop-btn {
        font-size: 13px;
        border: none;
        padding: 5px 10px;
        background-color: lightgray;
        outline: none;
        color: #808d97;
    }

    .drop-btn:first-child {
        border-radius: 5px 5px 0 0;
        padding: 0 15px;
        text-align: end;
    }

    .drop-btn:last-child {
        border-radius: 0 0 5px 5px;
        padding-bottom: 10px;
    }

    .drop-btn:hover {
        color: #000;
    }

    @media (max-width: 320px) {
        .drop-menu {
            left: 145px;
        }
    }

    @media (max-width: 375px) and (min-width: 321px) {
        .drop-menu {
            left: 200px;
        }
    }

    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;

        &:hover {
            color: black;
        }
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-item-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc; //override defaults
        font-family: "Avenir", Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
    }



    /*--------------------might need--------------------*/
    .active {
        background: lightgrey;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        border-top: 1px solid lightgrey;
        padding-top: 10px;
        margin-bottom: 10px;
    }
    button {
        background-color: transparent;
        appearance: none;
        border: none;
        margin-right: 7px;

        &.filter:hover {
            background: lightgrey;
        }

        &:focus {
            outline: none;
        }
    }

    // CSS Transitions
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>
