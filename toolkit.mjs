import { configureStore, createAction, createReducer } from "@reduxjs/toolkit"

// const { configureStore, createAction, createReducer } = toolkit;

// const initialState = {
//     login: false,
//     cart: []
// }

// const cartReducer = createReducer(initialState, (builder) => {
//     builder.addCase("ADD", (state, action) => {
//        state.cart.push(action.payload)
//     })
// })

const add = createAction("ADD")

const cartReducer = createReducer([], (builder) => {
    builder.addCase(add, (state, action) => {
       state.push(action.payload)
    })
})

const login = createAction("LOGIN")

const loginReducer = createReducer({status: false}, (builder) => {
    builder.addCase(login, (state, action) => {
       state.status = true;
    })
})

const store = configureStore({
    reducer: {
        cart: cartReducer,
        login: loginReducer,
    }
})
console.log("oncreate store : ", store.getState())


store.subscribe(() => {
    console.log('store change : ', store.getState())
})

const action1 = add({id: 4, qty:4000})
store.dispatch(action1);
const action2 = add({id: 5, qty:50000})
store.dispatch(action2);
const action3 = login()
store.dispatch(action3);
