<template>
  <div>
    <TodoListView/>
  </div>
</template>

<script>
	import {
		Component,
		Vue
	} from 'vue-property-decorator';

	// components
	import TodoListView from './todolist/todolist-view.vue';

	@Component(
		{
			name: 'TABLE_CONTAINER',
			components: {
				TodoListView
			},
			props: {
				msg: String
			}
		}
	)
	export default class TableContainer extends Vue {
	}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
