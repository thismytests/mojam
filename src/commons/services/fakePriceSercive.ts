interface Item {
  id: number;
  price: string;
}

export default {
  getItems: function (): Array<Item> {
    /*eslint-disable */
    return [
      {
        id: 0,
        price: '$2500'
      },
      {
        id: 1,
        price: '$1400'
      },
      {
        id: 2,
        price: '$1300'
      },
      {
        id: 3,
        price: '$1800'
      },
      {
        id: 4,
        price: '$2500'
      },
      {
        id: 5,
        price: '$8000'
      },
    ];
    /*eslint-enable */
  }
};

