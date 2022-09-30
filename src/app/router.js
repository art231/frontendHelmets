import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Helmets
import ConditionsHelmets from './container/conditionsHelmets.js';
import Helmet from './container/helmet.js';
import History from './container/history.js';

//Reports
import ListReports from './container/listReports.js';
import ReportActive from './container/reportActive.js';
import ReportCard from './container/reportCard.js';
import ReportIncident from './container/reportIncident.js';
import ReportDeparture from './container/reportDeparture.js';
import ReportGeofences from './container/reportGeofences.js';


import ListCompanies from './container/listCompanies.js';
import DetailsCompany from './container/detailsCompany.js';

//Geozones
import Geozones from './container/geozones.js'

//Incident
import ListIncident from './container/listIncident.js';
import Incident from './container/incident.js';

// Auth
import LogOut from './components/auth/logout.js'
import Login from './container/login.js';
import GetPassword from './container/getPassword.js';

import Layout from "./container/layout.js";
import {getDataStorage} from "./common/localStorageHelper";
import {refreshToken} from "./common/requestHelper";

export default class Main extends Component {

    renderForAuthenticated() {

        return(
            <Layout {...this.props}>
                <Switch>
                    <Route exact path='/' component={ConditionsHelmets}/>
                    <Route exact path='/helmet/:id' component={Helmet}/>
                    <Route exact path='/helmet/:id/history' component={History}/>
                    <Route exact path='/list-reports' component={ListReports}/>
                    <Route exact path='/list-reports/active' component={ReportActive}/>
                    <Route exact path='/list-reports/card' component={ReportCard}/>
                    <Route exact path='/list-reports/incident' component={ReportIncident}/>
                    <Route exact path='/list-reports/departure' component={ReportDeparture}/>
                    <Route exact path='/companies/' component={ListCompanies}/>
                    <Route exact path='/companies/details-company' component={DetailsCompany}/>
                    <Route exact path='/list-reports/geofences' component={ReportGeofences}/>
                    <Route exact path='/list-incident' component={ListIncident}/>
                    <Route exact path='/list-incident/id' component={Incident}/>
                    <Route exact path='/geozones' component={Geozones}/>

                    <Route path="/login">
                        {({location: {state}}) => state && state.referrer ?
                            <Redirect to={state.referrer}/> : <Redirect to={'/'}/>}
                    </Route>

                </Switch>
            </Layout>
        )
    }

    renderForNotAuthenticated() {
        return(
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/get-password" component={GetPassword}/>
                <Route exact path='/logout' component={LogOut}/>

                <Redirect to={{
                    pathname: '/login',
                    state: {referrer: window.location.pathname}
                }}/>
            </Switch>
        )
    }

    render() {
        const {authenticated} = this.props;

        if(getDataStorage("refresh_Time")) {
            (setInterval(() => {
                if(authenticated) {
                    if(new Date().getTime() > Number(getDataStorage("refresh_Time"))) {
                        refreshToken()
                    }
                }
            }, Number(getDataStorage("expires_in")) + 5000))
        }

        return(
            <Route exact={true} history={history}>
                {authenticated ? this.renderForAuthenticated() : this.renderForNotAuthenticated()}
            </Route>
        )
    }
}
