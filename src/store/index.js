import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

export default new Vuex.Store({
  state: {
    URL_API: 'todos.json',
    filter: 'all',
    todos: []
  },

  getters: {
    getTodos(state) {
      return state.todos
    },
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0
    },
    todosFiltered(state) {
      if (state.filter === 'all') {
        return state.todos
      } else if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      })
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id);
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing,
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id === id);
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    }
  },
  actions: {
    getTodos({commit}) {
      Vue.http.get('../todos.json')
        .then(response => response.json())
        .then(todos => commit('setTodos', todos))
    },
    addTodo(context, todo) {
      setTimeout(() => {
        context.commit('addTodo', todo)
      }, 100)
    },
    updateTodo(context, todo) {
      setTimeout(() => {
        context.commit('updateTodo', todo)
      }, 100)
    },
    deleteTodo(context, id) {
      setTimeout(() => {
        context.commit('deleteTodo', id)
      }, 100)
    },
    checkAll(context, checked) {
      setTimeout(() => {
        context.commit('checkAll', checked)
      }, 100)
    },
    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit('updateFilter', filter)
      }, 100)
    },
    clearCompleted(context) {
      setTimeout(() => {
        context.commit('clearCompleted')
      }, 100)
    }
  }
})
