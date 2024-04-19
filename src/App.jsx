import { createContext } from "react";
import { gql, useQuery } from "@apollo/client";
import StyleSelector from "./Components/StyleSelector";
import "./App.scss";
import SofaInformation from "./Components/SofaInformation";
import { actionName } from "./Storage";
import useStore from "./Storage/useStore";

export const Store = createContext(null);

const SOFAS = gql`
  query SofasOPtions {
    sofasOptions {
      sofasInformation {
        sofa {
          name
          sofasContent {
            name
            information
            price
            link
            button
            image {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

function App() {
  const { dispatch } = useStore();
  const { loading } = useQuery(SOFAS, {
    onCompleted: (data) => {
      const DataSofa = data?.sofasOptions?.sofasInformation?.sofa;
      dispatch({ type: actionName.setDataSofa, payload: DataSofa });
    },
  });

  return !loading ? (
    <>
      <StyleSelector />
      <SofaInformation />
    </>
  ) : (
    "...cargando"
  );
}

export default App;