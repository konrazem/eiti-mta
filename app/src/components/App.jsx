import React from "react";
import Header from "./Header";
import Profile from "./Profile";
import InfoPage from "./InfoPage";
import HomePage from "./HomePage";
import Product from "./Product";
import NewProduct from "./NewProduct";
import Products from "./Products";
import Footer from "./Footer";
import Loading from "./Loading";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-boost";

const HOST =
    process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

class App extends React.Component {
    /**
     * Creates an instance of App.
     * @param {*} props
     * @memberof App
     */
    constructor(props) {
        super(props);

        this.state = {
            error: "",
            client: null,
        };
    }

    /**
     * @name fetchToken
     * @returns Promise
     * @memberof App
     * @description By default the application router enables CSRF protection for any HTTP method that is not HEAD or GET and the route is not public.
     * A path is considered public, if it does not require authentication; this is the case for routes with "authenticationType: none" or if authentication is disabled completely via the top level property "authenticationMethod: none".
     * To obtain a CSRF token application must send a GET or HEAD request with a "x-csrf-token: fetch" header to the application router. The application router will send response with "x-csrf-token: <token>" header, where <token> will be the value of the CSRF token.
     * Later on if a CSRF protected route is requested with any of the above mentioned methods, "x-csrf-token: <token> header" should be present in the request with the previously obtained token. This request must use the same session as the fetch token request.
     * If the x-csrf-token header is not present or invalid, the application router will return status code 403 Forbidden and a response header "x-csrf-token: Required"!
     * If the header name "x-csrf-token" does not exists return null in resolver
     *
     */

    async fetchToken() {
        return fetch(HOST + "/token", {
            method: "HEAD",
            headers: {
                "X-Csrf-Token": "fetch",
            },
        }).then((res) => {
            const token = res.headers.get("X-Csrf-Token"); // if the name does not exists return null
            return token;
        });
    }

    /**
     * componentDidMount
     * @memberof App
     */
    async componentDidMount() {
        // for every request in the application you need to pass token in header
        this.fetchToken()
            .then((token) => {
                // create cache
                const apolloCache = new InMemoryCache();
                console.log('token used: ' + token);
                // create apollo client 
                const apolloClient = new ApolloClient({
                    uri: HOST + "/api/v1/graphql",
                    fetchOptions: {
                        credentials: "include",
                    },
                    cache: apolloCache,
                    headers: {
                        'X-Csrf-Token': token
                    }
                });

                this.setState({
                    client: apolloClient,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    error: err + "",
                });
            });
    }

    /**
     *
     *
     * @returns
     * @memberof App
     */
    render() {
        const { client, error } = this.state;

        if (error) {
            return <InfoPage text="Error while loading application. Please check if server is running." />;
        }

        if (!client) {
            return <Loading text="Loading app..." />;
        }

        return (
            <Router>
                <div className="eiti-app-wrapper">
                    <div className="eiti-header-wrapper">
                        <Header />
                    </div>

                    <div className="eiti-body-wrapper">
                        <Switch>
                            <Route exact path="/" render={() => <HomePage />} />
                            <Route
                                exact
                                path="/products/skip/:skip/limit/:limit"
                                render={(props) => (
                                    <Products client={client} {...props} />
                                )}
                            />

                            <Route
                                exact
                                path="/product/:id"
                                render={(props) => (
                                    <Product client={client} {...props} />
                                )}
                            />

                            <Route
                                exact
                                path="/add"
                                render={(props) => (
                                    <NewProduct client={client} {...props} />
                                )}
                            />

                            <Route
                                exact
                                path="/profile"
                                render={(props) => <Profile {...props} />}
                            />

                            <Route
                                render={() => (
                                    <InfoPage text="Page not found." />
                                )}
                            />
                        </Switch>
                    </div>

                    <div className="eiti-footer-wrapper">
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
