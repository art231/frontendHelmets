import React from "react";
import { connect } from 'react-redux';
import { getHistoryHelmet, getHelmetTimezone } from "../redux/actions";
import History from "../components/history/history.js";

const mapStateToProps = state => {
    return {
        state,
        attributes: state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.attributes,
        timelines: state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.timelines && state.historyHelmet.history.timelines.items,
        stepMinutes: state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.timelines && state.historyHelmet.history.timelines.stepMinutes,
        events: state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.events,
        tz: state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.tz,
        company: state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.company,
        tracks: state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.tracks,
        from: state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.timelines && state.historyHelmet.history.timelines.from,
        to: state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.timelines && state.historyHelmet.history.timelines.to,
        tz:  state.historyHelmet && state.historyHelmet.history && state.historyHelmet.history.tz,
        error: state.historyHelmet && state.historyHelmet.error,
        loading: state.historyHelmet && state.historyHelmet.loading,
    };
};

const mapDispatchToProps = dispatch => ({
    getHistoryHelmet: (id, from, to, getTz) => dispatch(getHistoryHelmet(id, from, to, getTz)),
    cleanHistory: () =>{
        dispatch({type: "CLEAN_TIMEZONE", tz: undefined});
        dispatch({type: "CLEAN_HISTORY", history: {}});
    } 

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(History);
