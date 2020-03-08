<template>
  <tr class="todolist-item" v-on:click="eventHandler(todo.id)">
    <td>{{todo.country}}</td>
    <td>{{todo.quantity}}</td>
    <td>{{todo.rmc}}</td>
  </tr>
</template>

<script>
	export default {
		name: 'Table-row',
		props: {
			todo: [Object]
		},
		methods:  {
			eventHandler: function (data) {
				this.$parent.todolistItemCallback(data);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .todolist-item {
    background: #e7e7e7;
    cursor: pointer;
  }

  .todolist-item:hover{
    background: rgba(231, 231, 231, 0.58);
  }
</style>
