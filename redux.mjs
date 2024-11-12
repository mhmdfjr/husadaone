import { legacy_createStore } from "redux";

// reducer 
const cartReducer = (
    state = {
        login: false,
        cart: [{id: 1, qty: 1}],
    }, 
    action
) => { 
    switch(action.type) {
        case 'ADD':
            return {
                ...state,
                cart: [...state.cart, action.payload],
            }
        default: 
            return state;
    }
}

// store
const store = legacy_createStore(cartReducer)
console.log("oncreate store : ", store.getState())

// subscribe
store.subscribe(() => {
    console.log('store change : ', store.getState())
})

// dispatch
const action1 = { type: "ADD", payload: {id: 2, qty:20}}
store.dispatch(action1);
const action2 = { type: "ADD", payload: {id: 3, qty:300}}
store.dispatch(action2);