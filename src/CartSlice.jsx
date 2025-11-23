import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const itemIdx = state.items.findIndex(i => i.name === item.name);

      if (itemIdx >= 0) {
        state.items[itemIdx].quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
        const item = action.payload;
        const itemIdx = state.items.findIndex(i => i.name === item.name);
  
        if (itemIdx >= 0) {
            if (state.items[itemIdx].quantity > 0) {
                state.items[itemIdx].quantity -= 1;
            }
        }
    },

    deleteItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload.name);
    },

    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const idx = state.items.findIndex(i => i.name === name);
      
        if (idx >= 0) {
          if (quantity <= 0) {
            // If quantity goes to 0, remove item
            state.items.splice(idx, 1);
          } else {
            state.items[idx].quantity = quantity;
          }
        }
      },

      clearCart: (state) => {
        state.items = [];
      }      
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, deleteItem } = CartSlice.actions;

export default CartSlice.reducer;
