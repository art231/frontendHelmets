import { getHelmet, getHelmetTimezone, deleteHelmet, postHelmet, updateHelmet } from "./helmet";
import { getListHelmets } from "./listHelmets";
import { getHistoryHelmet } from "./history";
import { getListGeozones, postGeozone, deleteGeozone } from "./geozones";
import { putAuth, logout, getEmail } from "./auth";
import { getListIncidents, getNowIncidents } from "./incidents";
import { getListGeofences } from "./listGeofences";
import { getReportCard } from "./reportCard";
import { getGroupReport } from "./reportActive";
import { getConditionsHelmets } from "./conditionsHelmets";
import { getListCompanies } from "./getListCompanies";
import { getUsers } from "./getUsers";
import { updateCompany } from "./updateCompany";
import { getDetailsCompany } from "./detailsCompany";
import { getUserByLogin } from "./getUserByLogin";
import { createUser, bindUser } from "./createUser";
import { checkExistHelmet } from "./checkExistHelmet";
import { createHelmet } from "./createHelmet";
import { bindHelmet } from "./bindHelmet";
import { updateUser } from "./updateUser";
import { createCompany } from "./createCompany";
import { deleteUser } from "./deleteUser";
import { deleteHelmetModal } from "./deleteHelmetModal";
import { deleteCompany } from "./deleteCompany";
import { getReportGeofences } from "./reportGeofences";

export {
  getListGeozones,
  postGeozone,
  deleteGeozone,
  getHelmet,
  getListHelmets,
  getHistoryHelmet,
  getHelmetTimezone,
  putAuth,
  logout,
  deleteHelmet,
  postHelmet,
  getEmail,
  getListIncidents,
  getNowIncidents,
  updateHelmet,
  getListGeofences,
  getListCompanies,
  getReportCard,
  getGroupReport,
  getConditionsHelmets,
  getUsers,
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
  getReportGeofences,
};
