
<template>
  <div class="todolist-wrapper">
    <!-- Filters -->
    <div class="todolist-filters">
      <TodoListFilter
        v-bind:title="filters.firstFilter.title"
        v-bind:dropdown="filters.firstFilter.dropdownData"
        v-bind:items="filters.firstFilter.items"
        @change="onChangeFilter"
      >
      </TodoListFilter>
      <TodoListFilter
        v-bind:title="filters.secondFilter.title"
        v-bind:dropdown="filters.secondFilter.dropdownData"
        @change="onChangeFilter"
        v-bind:items="filters.secondFilter.items"
      >
      </TodoListFilter>

    </div>
    <!--Table-->
    <table class="todolist">
      <thead>
      <tr v-on:click="sortedRows">
        <td
          :id="localeKeys.COUNTRY_COL"
          v-bind:class="{ 'rectangle-up': sortedDescCountry, 'rectangle-down': !sortedDescCountry}"
        >{{localeKeys.COUNTRY_COL}}
        </td>
        <td :id="localeKeys.QUANTITY_COL"
            v-bind:class="{ 'rectangle-up': sortedDescQuantity, 'rectangle-down': !sortedDescQuantity}"
        >{{localeKeys.QUANTITY_COL}}
        </td>
        <td :id="localeKeys.RMS_COL"
            v-bind:class="{ 'rectangle-up': sortedDescRMC, 'rectangle-down': !sortedDescRMC}"
        >{{localeKeys.RMS_COL}}
        </td>
      </tr>
      </thead>

      <tbody>
      <TodoListItem
        v-for="item in items" :key="item.id"
        v-bind:todo="item"
        v-on:click="showModal = true">
      </TodoListItem>
      </tbody>
    </table>

    <Popup
      v-if="showModal"
      @close="showModal = false"
      v-bind:popupcontent="popupcontent"
    />
  </div>
</template>

<script>
	import {
		Component,
		Vue
	} from 'vue-property-decorator';

	// lodash
	import _ from 'lodash/lodash';

	// services
	import {
		ItemsService,
    FakePriceService
	} from '../../../commons/services';

	// components
	import TodoListItem from './views/todolist-item';
	import Popup from './views/todolist-popup';
	import TodoListFilter from './views/todolist-filter';

	// locales
	const localeKeys = {
		COUNTRY_COL: 'Country',
		QUANTITY_COL: 'Quantity',
		RMS_COL: 'Rmc'
	};

	// constants
	const COUNTRY_RESET_ID = 'COUNTRY_RESET_ID';
	const RMC_ID_RESET = 'RMC_ID_RESET';

	const firstFilterItems = _.sortBy(ItemsService.getItems(), ['text'])
		.map(function (item) {
			return {
				id: item.id,
				title: item.country
			};
		});

	firstFilterItems.push(
		{
		id: COUNTRY_RESET_ID,
		isSelected: true,
		title: 'All countries'
	});

	const secondFilterItems = _.sortBy(ItemsService.getItems(), ['text'])
		.map(function (item) {
			return {
				id: item.id,
				title: item.rmc
			};
		});

	secondFilterItems.push({
		id: RMC_ID_RESET,
		isSelected: true,
		title: 'All RMCs'
	});


	@Component({
		components: {
			TodoListItem,
			Popup,
			TodoListFilter
		},
		methods: {

		}
	})
	export default class TodoListView extends Vue{
		copyItems =  ItemsService.getItems().slice();
		items =  _.sortBy(ItemsService.getItems(), ['text']);
		prices =  FakePriceService.getItems();

		// icons
		showModal =  false;
		sortedDescCountry = true;
		sortedDescQuantity = true;
		sortedDescRMC =  true;

		popupcontent =  {
			firstcontent: 'Are you sure that your order will include: ',
			secondcontent: 'Watchers with RMC: M96368543 with price $1250',
		};
		filters =  {
			firstFilter: {
				title: 'Country',
				dropdownData: 'All countries',
				items: firstFilterItems
			},
			secondFilter: {
				title: 'RMC',
				dropdownData: 'All RMCs',
				items: secondFilterItems
			}
		};
		localeKeys = localeKeys;



		onChangeFilter($event) {
			if ($event.filterName === this.filters.firstFilter.title) {
				if ($event.selectedItem.id === COUNTRY_RESET_ID) {
					this.items = this.copyItems;
					return;
				}
				this.items = this.copyItems.filter(item => {
					return item.country === $event.selectedItem.title
				})
			}

			if ($event.filterName === this.filters.secondFilter.title) {
				if ($event.selectedItem.id === RMC_ID_RESET) {
					this.items = this.copyItems;
					return;
				}
				this.items = this.copyItems.filter(item => {
					return item.rmc === $event.selectedItem.title
				})
			}
		}

		sortedRows ($event) {
			const id = $event.target.id;
			const self = this;

			const sort = function (ctx, localeKey, isDesc) {
				return ctx.items.sort(function (item1, item2) {
					if (isDesc) {
						return item1[localeKey] > item2[localeKey] ? 1 : -1
					} else {
						return item1[localeKey] < item2[localeKey] ? 1 : -1
					}
				})
			}

			if (id === localeKeys.COUNTRY_COL) {
				this.sortedDescCountry = !this.sortedDescCountry;
				this.items = sort(self, 'country', self.sortedDescCountry)
			}
			if (id === localeKeys.QUANTITY_COL) {
				this.sortedDescQuantity = !this.sortedDescQuantity;
				this.items = sort(self, 'quantity', self.sortedDescQuantity)
			}
			if (id === localeKeys.RMS_COL) {
				this.sortedDescRMC = !this.sortedDescRMC;
				this.items = sort(self, 'rmc', self.sortedDescRMC)
			}
		}

		todolistItemCallback(data) {
			let currentItem = null;
			let currentPrice = null;

			_.filter(this.items, function (item) {
				if (item.id === data) {
					currentItem = item;
				}
			});

			_.filter(this.prices, function (item) {
				if (item.id === data) {
					currentPrice = item;
				}
			});

			this.popupcontent.secondcontent = 'Watchers with RMC: ' + currentItem.rmc + ' with price ' + currentPrice.price;
			this.showModal = true;
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .todolist-wrapper {

  }

  .todolist {
    display: table;
    width: 100%;
  }

  .todolist thead {
    border-bottom: 2px solid white;
  }

  .todolist tr {
    background: #e7e7e7;
    cursor: pointer;
  }

  .todolist td {
    padding: 8px 10px;
    font-size: 18px;
  }
</style>
