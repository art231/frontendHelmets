import React from "react";
import moment from 'moment-timezone';
import Calendar from '../calendar';
import Dropdown from './dropdown';

const ZoneAndDateSelector = ({ geofences }) => (
  <div className="col-md-4 col-sm-12 card mb-3 overflow-hidden">
    <div className="card-body position-relative">
      <h3 className="text-center mb-3">Объект</h3>
      <Dropdown
        title="Список геозон"
        objects={geofences} 
        onChange={}/>
      <Calendar
        selectPeriod={this.getDates}
        from={moment().subtract(8, 'days')}
        to={moment().subtract(1, 'days')} />
      <button
        className="btn btn-lg btn-primary mt-4 w-100"
        onClick={this.makeReport}>Сформировать отчет</button>
    </div>
  </div>
)

export default ZoneAndDateSelector;
