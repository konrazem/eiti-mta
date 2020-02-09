import React from 'react';
import { Header, LanSwitch } from './header';
import { Body, Profile, NotFound } from './body';
import Footer from './Footer';
import Loading from './Loading';
import text from '../text';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// APOLLO
// import { InMemoryCache } from 'apollo-boost'; 
import { createHttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";

import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { UserProvider } from '../context';





class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      client: null,
      loaded: false,
      lan: true
    };

  }

  /**
   * fetchToken
   * By default the application router enables CSRF protection for any HTTP method that is not HEAD or GET and the route is not public. A path is considered public, if it does not require authentication. This is the case for routes with authenticationType: none or if authentication is disabled completely via the top level property authenticationMethod: none.
 
To obtain a CSRF token one must send a GET or HEAD request with a x-csrf-token: fetch header to the application router. The application router will return the created token in a x-csrf-token: <token> header, where <token> will be the value of the CSRF token.
 
If a CSRF protected route is requested with any of the above mentioned methods, x-csrf-token: <token> header should be present in the request with the previously obtained token. This request must use the same session as the fetch token request. If the x-csrf-token header is not present or invalid, the application router will return status code 403 Forbidden and a response header x-csrf-token: Required.
   * @returns
   * @memberof App
   */
  fetchToken() {
    // check for browser support of fetch in the window interface. 
    if (!("fetch" in window)) {
        console.log("Fetch API not found, try including the polyfill");
        return;
    }
    return new Promise(function (resolve, reject) {

      fetch('/user', { // certain fetch as reffer to local server storage
        method: 'HEAD',
        credentials: 'same-origin', //If you only want to send credentials if the request URL is on the same origin as the calling script, add credentials: 'same-origin'
        headers: {
          'X-Csrf-Token': 'fetch'
        }
      })
        .then(res => {
          // here take token -> The application router will return the created token in a x-csrf-token: <token> header, where <token> will be the value of the CSRF token.
          if (!res.ok) {
              throw Error(res.statusText);
          }
          const token = res.headers.get('X-Csrf-Token');

          //  (resolve) is called when the asynchronous task completes successfully and returns the results of the task as a value
          resolve(token);

        })
        .catch(err => reject('Error: ' + err.message));
    })
  }


  /**
   *The best place to make calls to fetch data is within componentDidMount(). componentDidMount() is only called once, on the client, compared to componentWillMount() which is called twice, once to the server and once on the client. It is called after the initial render when the client received data from the server and before the data is displayed in the browser. Due to the fact that the data won’t be loaded until after the initial render, the developer NEEDS to set up the components initial state properly. 
   *
   * @memberof App
   */
  async componentDidMount() {

    const cache = new InMemoryCache();
    
    const URI =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5000/graphql"
            : "/api/v1/graphql"; //one entry point. The URI for cloud foundry as api/something everything is redirect to destination of eiti-server. 

    /** 
     * The http link is a terminating link that fetches GraphQL results from a GraphQL endpoint over an http connection. The http link supports both POST and GET requests with the ability to change the http options on a per query basis. This can be used for authentication, persisted queries, dynamic uris, and other granular updates.
     */
    const link = createHttpLink({
      uri: URI,
      includeExtensions: false, //  If your server supports it, the HTTP link can also send over metadata about the request in the extensions field. To enable this, pass includeExtensions as true.
      // credentials: 'same-origin',
      useGETForQueries: false //set to true to use the HTTP GET method for queries (but not for mutations). It is very important since sap approuter need token for POST not for GET fetch methods!
    });


    // https://www.apollographql.com/docs/react/recipes/authentication/
    // https://www.apollographql.com/docs/link/links/context/ 
    const authLink = setContext((req, context) => {
      // get the authentication token from local storage if it exists
      // return the headers to the context so httpLink can read them


      //TODO: this will fetch on every QUERY!
      return this.fetchToken().then(token => {

        return {
          headers: {
            ...req.headers,
            'X-Csrf-Token': token
          }
        }
      });
    });

    const client = new ApolloClient({
      link: process.env.NODE_ENV === 'development' ? link : authLink.concat(link),
      cache,
    });


    this.setState({
      client,
      loaded: true,
    });

  }


  changeLan() {
    this.setState({ ...this.state, lan: !this.state.lan });
  }

  render() {


    const { client, loaded, lan } = this.state;

    if (!loaded) {

      return <Loading />

    }

    return (<Router><ApolloProvider client={client}>
      <UserProvider value={{ text: text[lan ? 'en' : 'pl'] }} >
        <div className="eiti-app-wrapper">

          <div className="eiti-header-wrapper">

            <LanSwitch changeLan={this.changeLan.bind(this)} lan={this.state.lan} />
            <Header />

          </div>

          <div>
            <Switch>

              <Route exact path="/" component={Body} />

              <Route exact path="/profile" component={Profile} />

              <Route render={() => <NotFound />} />

            </Switch>
          </div>

          <div className="eiti-footer-wrapper">

            <Footer />

          </div>
        </div>
      </UserProvider></ApolloProvider></Router>);

  }
}


export default App;