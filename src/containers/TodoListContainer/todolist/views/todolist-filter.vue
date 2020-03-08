<template>
  <div class="todolist-filter-wrapper"
       v-on:mouseout="hideDropList = true">
    <div class="todolist-filter"
         v-on:mouseover="hideDropList = false">

      <span class="todolist-filter-title">{{title}}</span>
      <div class="todolist-filter-droplist-wrapper">
        <span class="todolist-filter-droplist rectangle-up">{{selectedItemTitle}}</span>
        <div class="todolist-filter-items-wrapper"
             v-bind:class="{ 'hide': hideDropList}">

          <div class="todolist-filter-items" v-for="item in copyItems"
               :id="item.title"
               v-on:click="onSelect"
               :key="item.id">{{item.title}}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
	import {
		Component,
		Vue
	} from 'vue-property-decorator';


	@Component({
		computed: {
			copyItems: {
				get: function () {
					// set on change props
					this.selectedItemTitle = this.items.find(item => item.isSelected).title;

					return Vue.util.extend([], this.items)
				},
				set: function (value) {
					return value
				}
			},
		},
		props: ['title', 'dropdown', 'items']
	})
	export default class TodolistFilter extends Vue {
		hideDropList = true;

		selectedItemTitle = {
			get: function () {
				let result = this.copyItems.find(function (item) {
					// set default
					return item.isSelected
				});

				return result ? result.title : ''
			},
			set: function (value) {
				return JSON.parse(JSON.stringify(value))
			}
		};

		onSelect($event) {
			const id = $event.currentTarget.id;
			let selectedItem = null;

			this.copyItems.forEach(function (item) {
				item.isSelected = false;
				if (item.title === id) {
					item.isSelected = true;
					selectedItem = item;
				}
			});

			this.selectedItemTitle = id;
			this.$emit('change', {
				filterName: this.title,
				selectedItem
			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hide {
    display: none;
  }

  .todolist-filter-wrapper {
    display: inline-block;
    padding-right: 50px;
    font-size: 20px;
    padding-bottom: 8px;
  }

  .todolist-filter {
  }

  .todolist-filter-title {
    padding-left: 10px;
    vertical-align: top;
  }

  .todolist-filter-droplist-wrapper {
    position: relative;
    display: inline-block;
    vertical-align: top;
    z-index: 1;
  }

  .todolist-filter-droplist {
    padding: 5px 50px 5px 12px;
    display: inline-block;
    width: 120px;
    background: #e7e7e7;
    cursor: pointer;
  }

  .todolist-filter-items-wrapper {
    position: absolute;
    background: white;
    width: 100%;
  }

  .todolist-filter-items:hover {
    background: gainsboro;
    cursor: pointer;
  }
</style>
