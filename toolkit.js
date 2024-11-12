import toolkit from "@reduxjs/toolkit"

const { configureStrore, createAction, createReducer } = toolkit;

const initialState = {
    login: false,
    cart: []
}

const cartReducer = createReducer(initialState, (builder) => {
    builder.addCase("ADD", () => {
       state.cart.push(action.payload)
    })
})


