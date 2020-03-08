interface Item {
  id: any,
  country: string,
  quantity: number,
  rmc: string
}

export default {
  getItems: function (): Array<Item> {
    /*eslint-disable */
    return [
      {
        id: 0,
        country: 'Argentina',
        quantity: 10,
        rmc: 'M12345761'
      },
      {
        id: 1,
        country: 'Armenia',
        quantity: 5,
        rmc: 'M12345559'
      },
      {
        id: 2,
        country: 'Belgium',
        quantity: 45,
        rmc: 'M67345582'
      },
      {
        id: 3,
        country: 'Canada',
        quantity: 17,
        rmc: 'M67345582'
      },
      {
        id: 4,
        country: 'Denmark',
        quantity: 8,
        rmc: 'M96368543'
      },
      {
        id: 5,
        country: 'Greece',
        quantity: 22,
        rmc: 'M96368543'
      }
    ];
    /*eslint-enable */
  }
};

