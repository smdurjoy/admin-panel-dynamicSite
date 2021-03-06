import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router";
import HomePage from "../pages/HomePage";
import CoursePage from "../pages/CoursePage";
import ProjectPage from "../pages/ProjectPage";
import ServicePage from "../pages/ServicePage";
import ClientReviewPage from "../pages/ClientReviewPage";
import ContactPage from "../pages/ContactPage";

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/courses" component={CoursePage}/>
                    <Route exact path="/projects" component={ProjectPage}/>
                    <Route exact path="/services" component={ServicePage}/>
                    <Route exact path="/clientReview" component={ClientReviewPage}/>
                    <Route exact path="/contact" component={ContactPage}/>
                </Switch>
            </Fragment>
        );
    }
}

export default AppRoute;
