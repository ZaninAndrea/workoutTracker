import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"
import ApolloClient, { HttpLink } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
const link = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cj9gtxif90o4w0111to5addot',
  headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDk1Mjc3NjIsImNsaWVudElkIjoiY2o3NHAwcG55MHA1bzAxNzc1MGRjeGVheSJ9.0gAuxVxevCd_jN_JJnxiKwp2xpmcrbCNYzlZ6lvUiBQ',
    },
});

const client = new ApolloClient({ link });


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
)

registerServiceWorker()
