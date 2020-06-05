import React from 'react';
import {Route, Switch} from "react-router";
import {ProductDetail, ProductEdit, ProductList, Reset, SignIn, SignUp} from "./templates";
import Auth from "./Auth";

const Router = () => {
    return (
        <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signin/reset" component={Reset} />
            <Route exact path="/signup" component={SignUp} />

            <Auth>
                <Route exact path="(/)?" component={ProductList} />
                <Route exact path="/product/:id" component={ProductDetail} />
                <Route exact path="/product/edit(/:id)?" component={ProductEdit} />
            </Auth>
        </Switch>
    );
};

export default Router;