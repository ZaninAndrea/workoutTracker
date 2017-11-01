import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import {
    ApolloProvider,
    createNetworkInterface,
    ApolloClient,
} from "react-apollo"

const networkInterface = createNetworkInterface({
    uri: "https://api.graph.cool/simple/v1/cj9gtxif90o4w0111to5addot",
})

const client = new ApolloClient({
    networkInterface,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
)

registerServiceWorker()
