import { configureStore, createSlice  } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload)
        }
    }
})

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    }
})
console.log("oncreate store : ", store.getState())

store.subscribe(() => {
    console.log('store change : ', store.getState())
})

store.dispatch(cartSlice.actions.add({id:1, qty:20}));
store.dispatch(cartSlice.actions.add({id:2, qty:30}));