import React from "react";
import Header from "./Header";
import Profile from "./Profile";
import InfoPage from "./InfoPage";
import Loading from "./Loading";
import HomePage from "./HomePage";
import Product from "./Product";
import Products from "./Products";
import Footer from "./Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const host = process.env.NODE === 'production' ? '/server' : 'http://localhost:5000';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            token: false,
            error: false
        };
    }

    getToken() {
        // only in case of update, delete, create ask client domain (router) for token
        fetch(host, {
            method: HEAD,
            headers: {
                'X-Csrf-Token': 'fetch'
            }
        }).then( res => {
            const token = res.headers.get('X-Csrf-Token');
            
            console.log('Your token: ', token);
            
            this.setState({ token });
        }).catch( err => {

            console.error(err);
            
            this.setState({
                error: true
            }); 
        });
    }


    render() {

        const { token, error } = this.state;

        if (!token) { // there is no token yet

            return <Loading text="Loading token..." />
        }
 
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" render={() => <HomePage />} />
                        <Route path="/products/skip/:skip/limit/:limit" render={(props) => <Products {...props} host={host} />} />
                        <Route path="/product/:id?" render={(props) => <Product {...props} token={token} host={host}  />}  />
                        <Route path="/profile" render={(props) => <Profile {...props} host={host}  />} />
                        <Route>
                            <InfoPage text="Page not found." />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
