<template>
  <div>
    <span>Show only: </span>
    <button class="filter" :class="{ active: filter === 'all' }" @click="changeFilter('all')">All</button>
    <button class="filter" :class="{ active: filter === 'active' }" @click="changeFilter('active')">Active</button>
    <button class="filter" :class="{ active: filter === 'completed' }" @click="changeFilter('completed')">Done</button>
  </div>
</template>

<script>
export default {
  name: 'todo-filtered',
  computed: {
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    changeFilter(filter) {
      this.$store.dispatch('updateFilter', filter)
    }
  }
}
</script>

