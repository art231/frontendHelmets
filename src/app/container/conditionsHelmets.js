import { connect } from "react-redux";
import {
  deleteHelmet,
  postHelmet,
  updateHelmet,
  getConditionsHelmets,
} from "../redux/actions";
import ConditionsHelmets from "../components/conditions_Helmets/conditionsHelmets.js";

const mapStateToProps = (state) => {
  return {
    state,
    companiesDict:
      state.conditionsHelmets &&
      state.conditionsHelmets.condition &&
      state.conditionsHelmets.condition.companiesDict,
    error: state.conditionsHelmets && state.conditionsHelmets.error,
    loading: state.conditionsHelmets && state.conditionsHelmets.loading,
    errorHelmet: state.helmet && state.helmet.error,
    loadingHelmet: state.helmet && state.helmet.loading,
    helmets:
      state.conditionsHelmets &&
      state.conditionsHelmets.condition &&
      state.conditionsHelmets.condition.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteHelmet: (id) => dispatch(deleteHelmet(id)),
  postHelmet: (helmet) => dispatch(postHelmet(helmet)),
  updateHelmet: (id, newHelmet) => dispatch(updateHelmet(id, newHelmet)),
  getConditionsHelmets: () => dispatch(getConditionsHelmets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConditionsHelmets);
