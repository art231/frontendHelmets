export const TYPE_INCIDENT_UNKNOWN = ' неизвестный тип';
export const TYPE_INCIDENT_SOS = ' сос';
export const TYPE_INCIDENT_SHOCK = ' удар';
export const TYPE_INCIDENT_FALL = ' падение';
export const NUM_INCIDENT_SHOCK = ' уровень ';

export const showIncident = ({type, shock}) => {
  if (type === 'Shock') {
    if (shock !== null && !_.isEmpty(shock)) {
      return TYPE_INCIDENT_SHOCK + ',' + NUM_INCIDENT_SHOCK + (shock.thresholdNum !== undefined ? shock.thresholdNum : shock.n);
    } else {
      return TYPE_INCIDENT_SHOCK;
    }
  }
  switch (type) {
    case 'Unknown':
      return TYPE_INCIDENT_UNKNOWN;
      break;
    case 'Sos':
      return TYPE_INCIDENT_SOS;
      break;
    case 'Fall':
      return TYPE_INCIDENT_FALL;
      break;
    default:
      return type;
      break;
  }
}