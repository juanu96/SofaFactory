import { createContext, useReducer } from "react";

const INITIALSTATE = {
  DataSofa: [],
  SofaStyle: "",
  CurrentSofa: {},
  CurrentItemSofa: {},
};

const StoreContext = createContext({
  ...INITIALSTATE,
  dispatch: () => {}, 
});

const actionName = {
  setDataSofa: "setDataSofa",
  setSofaStyle: "setSofaStyle",
  setCurrentSofa: "setCurrentSofa",
  setCurrentItemSofa: "setCurrentItemSofa",
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionName.setDataSofa:
      return { ...state, DataSofa: payload };
    case actionName.setSofaStyle:
      return { ...state, SofaStyle: payload };
    case actionName.setCurrentSofa:
      return { ...state, CurrentSofa: payload };
      case actionName.setCurrentItemSofa:
      return { ...state, CurrentItemSofa: payload };
    default:
      return state;
  }
};

const GlobalStorage = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIALSTATE);

  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { GlobalStorage, StoreContext, actionName };