import { useContext } from "react";
import { StoreContext } from ".";

const useStore = () => {
  const { dispatch, ...states } = useContext(StoreContext);
  return {
    state: states,
    dispatch,
  };
};

export default useStore;
