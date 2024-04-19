// add the beginning of your app entry
import React from "react";
import "vite/modulepreload-polyfill";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppBackEnd from "./AppBackEnd.jsx";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GlobalStorage } from "./Storage/index.jsx";

const client = new ApolloClient({
  uri: "https://sofa.gruposantamaria.cr/graphql",
  cache: new InMemoryCache(),
});

if (document.getElementById("Sofas")) {
  ReactDOM.createRoot(document.getElementById("Sofas")).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <GlobalStorage>
          <App />
        </GlobalStorage>
      </ApolloProvider>
    </React.StrictMode>
  );
} else if (document.getElementById("Sofas-options")) {
  ReactDOM.createRoot(document.getElementById("Sofas-options")).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AppBackEnd />
      </ApolloProvider>
    </React.StrictMode>
  );
}
