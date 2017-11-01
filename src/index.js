import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"
import ApolloClient from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/cj9gtxif90o4w0111to5addot`,
  options: {
    reconnect: true
  }
});
const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cj9gtxif90o4w0111to5addot',
  headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDk1Mjc3NjIsImNsaWVudElkIjoiY2o3NHAwcG55MHA1bzAxNzc1MGRjeGVheSJ9.0gAuxVxevCd_jN_JJnxiKwp2xpmcrbCNYzlZ6lvUiBQ',
    },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({ link });


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
)

registerServiceWorker()
