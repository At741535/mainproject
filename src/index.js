import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline,ThemeProvider } from "@mui/material";
import theme from "./theme";
import { ApolloClient,InMemoryCache,ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./polyfill";
import EntryComponent from "./Entry";

import { Buffer } from 'buffer';

window.Buffer = window.Buffer || Buffer;

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_CLIENT_URI,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <EntryComponent />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
