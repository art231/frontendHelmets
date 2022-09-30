import { connect } from "react-redux";
import {
  getListHelmets,
  getListCompanies,
  getUsers,
  updateCompany,
  getDetailsCompany,
  getUserByLogin,
  bindUser,
  createUser,
  checkExistHelmet,
  createHelmet,
  bindHelmet,
  updateUser,
  updateHelmet,
  createCompany,
  deleteUser,
  deleteHelmetModal,
  deleteCompany,
} from "../redux/actions";
import DetailsCompany from "../components/detailsCompany/detailsCompany.js";

const mapStateToProps = (state) => {
  // console.log("state", state);
  return {
    errorListUsers: state.listUsers && state.listUsers.error,
    listUsers: state.listUsers.listUsers.data,
    errorListHelmets: state.listHelmets && state.listHelmets.error,
    listHelmets: state.listHelmets.listHelmets.data,
    listCompanies: state.listCompanies.listCompanies.data,
    listCompaniesError: state.listCompanies.error,

    errorCompanies: state.errorListCompanies && state.errorListCompanies.error,
    detailsCompany: state.getDetailsCompany.detailsCompany,
    getUserByLogin: state.getUserByLogin.getUser,
    errorGetUser: state.getUserByLogin.error,
    bindUser: state.bindUser,
    createUser: state.createUser.createUser.object,
    createUserError: state.createUser.error,

    checkExistHelmet: state.checkExistHelmet.checkExistHelmet,
    createHelmet: state.createHelmet,
    createHelmetError: state.createHelmet.error,

    updateUser: state.updateUser,
    updateUserError: state.updateUser.error,
    updateHelmet: state.helmet,
    updateHelmetError: state.helmet.error,
    createCompany: state.createCompany,
    createCompanyError: state.createCompany.error,
    updateCompanyError: state.updateCompany.error,
    deleteUser: state.deleteUser,
    deleteUserError: state.deleteUser.error,
    deleteHelmet: state.deleteHelmetModal,
    deleteHelmetError: state.deleteHelmetModal.error,
    deleteCompany: state.deleteCompany,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getListHelmets: (id) => dispatch(getListHelmets(id)),
  getListCompanies: (role) => dispatch(getListCompanies(role)),
  getUsers: (id) => dispatch(getUsers(id)),

  updateCompany: (company) => dispatch(updateCompany(company)),
  getDetailsCompany: (company) => dispatch(getDetailsCompany(company)),

  getUser: (user) => dispatch(getUserByLogin(user)),
  createUserFunc: (user) => dispatch(createUser(user)),
  bindUserFunc: (data) => dispatch(bindUser(data)),

  checkExistHelmetFunc: (data) => dispatch(checkExistHelmet(data)),
  createHelmetFunc: (data) => dispatch(createHelmet(data)),
  bindHelmetFunc: (data) => dispatch(bindHelmet(data)),

  updateUserFunc: (data) => dispatch(updateUser(data)),
  updateHelmetFunc: (id, data) => dispatch(updateHelmet(id, data)),
  createCompanyFunc: (data) => dispatch(createCompany(data)),
  deleteUserFunc: (data) => dispatch(deleteUser(data)),
  deleteHelmetFunc: (data) => dispatch(deleteHelmetModal(data)),
  deleteCompanyFunc: (data) => dispatch(deleteCompany(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsCompany);
