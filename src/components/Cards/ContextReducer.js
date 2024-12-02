import React from "react";

const CartStateContext = React.createContext();

const CartDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    }
    case "REMOVE": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id),
      };
    }
    case "INCREASE": {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => React.useContext(CartStateContext);

export const useDispatchCart = () => React.useContext(CartDispatchContext);
