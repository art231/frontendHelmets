import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import helmet from "./helmet";
import listHelmets from "./listHelmets";
import geozones from "./geozones";
import geozone from "./geozone";
import historyHelmet from "./history";
import auth from "./auth";
import listIncidents from "./listIncidents";
import incident from "./incident";

import listGeofences from './listGeofences';
import reportCard from './reportCard';
import reportActive from './reportActive';
import reportGeofences from './reportGeofences';
import conditionsHelmets from './conditionsHelmets';

import listCompanies from './listCompanies';

import listUsers from "./listUsers";
import updateCompany from "./updateCompany";
import getDetailsCompany from "./detailsCompany";
import getUserByLogin from "./getUserByLogin";
import createUser from "./createUser";
import bindUser from "./bindUser";
import checkExistHelmet from "./checkExistHelmet";
import createHelmet from "./createHelmet";
import bindHelmet from "./bindHelmet";
import updateUser from "./updateUser";
import createCompany from "./createCompany";
import deleteUser from "./deleteUser";
import deleteHelmetModal from "./deleteHelmetModal";
import deleteCompany from "./deleteCompany";





export default (history) =>
  combineReducers({
    router: connectRouter(history),
    helmet,
    historyHelmet,
    auth,
    geozones,
    geozone,
    listHelmets,
    listIncidents,
    incident,
    conditionsHelmets,
    listGeofences,
    reportCard,
    reportActive,
    listCompanies,
    listUsers,
    updateCompany,
    getDetailsCompany,
    getUserByLogin,
    createUser,
    bindUser,
    checkExistHelmet,
    createHelmet,
    bindHelmet,
    updateUser,
    createCompany,
    deleteUser,
    deleteHelmetModal,
    deleteCompany,
    reportGeofences,
  });
