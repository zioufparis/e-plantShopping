import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalNumOfItems: 0 // variable dedicated to counting the total number of items added to the cart
  },
  reducers: {
    addItem: (state, action) => {
      // in shopping cart i need image, name, cost => payload
      const { image, name, cost, quantity} = action.payload;
      const inCart = state.items.find(item => item.name === name); // check if plant already in cart
      if (inCart) { // if in cart +1 quantity
        inCart.quantity++;
      } else { // else set quantity to 1
        state.items.push({image, name, cost, quantity: 1});
      }

      state.totalNumOfItems += 1; // incr by 1

    },
    removeItem: (state, action) => {
      const {image, name, cost, quantity} = action.payload;
      state.items = state.items.filter(item => item.name !== name); // filter out plant

      state.totalNumOfItems -= quantity; // sub the amount of plants removed from cart
    },
    updateQuantity: (state, action) => {
      const {image, name, cost, quantity} = action.payload;
      const updateItem = state.items.find(item => item.name === name);
      if (updateItem) {
        const diff = quantity - updateItem.quantity;
        updateItem.quantity = quantity;
        state.totalNumOfItems += diff;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;