import React from "react";
import Header from "./Header";
import Profile from "./Profile";
import InfoPage from "./InfoPage";
import HomePage from "./HomePage";
import Product from "./Product";
import Products from "./Products";
import Footer from "./Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => <Router>
    <div>
        <Header />
        <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route path="/products/skip/:skip/limit/:limit" component={Products} />
            <Route path="/product/:id?" component={Product} />
            <Route path="/profile" component={Profile} />
            <Route>
                <InfoPage text="Page not found." />
            </Route>
        </Switch>
        <Footer />
    </div>
</Router>

export default App;
