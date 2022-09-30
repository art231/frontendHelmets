import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { listCompaniesWithRoleId3 } from '../../common/selectorsHelper';
import _ from "lodash";

const DropdownCompanies = ({ selectCompany, companies }) => {

  const [company, setCompany] = useState(null);
  let companyLocal;

  // useEffect(() => {
  //   companyLocal = JSON.parse(localStorage.getItem("company"));
  //   if(companyLocal) {
  //     setCompany(companyLocal);
  //     selectCompany(companyLocal);
  // }
  // }, [])

  useEffect(() => {
    companyLocal = JSON.parse(localStorage.getItem("company"));
    if(company === null && companyLocal) {
      setCompany(companyLocal);
      selectCompany(companyLocal);
  }
      if (!_.isEmpty(companies) && companies !== null && companies.length && companies.length !== 1) {
        selectCompany(company === null ? companyLocal : company);
        localStorage.setItem("company", JSON.stringify(company === null ? companyLocal : company))
      }
      if ((!_.isEmpty(companies) && companies !== null && companies.length && companies.length === 1)) {
        selectCompany(companies[0]);
        setCompany(companies[0]);
        localStorage.setItem("company", JSON.stringify(companies[0]))
      }
      if ((_.isEmpty(companies) && companies === null && !company && !companyLocal)) {
        selectCompany(null);
        localStorage.setItem("company", null)
      }
    companyLocal = JSON.parse(localStorage.getItem("company"));
  }, [company]);
  
  return (
    <div>
      {(!_.isEmpty(companies) && companies !== null && companies.length && companies.length !== 1)
        ? <div className="dropdown d-flex justify-content-center">
          <button
            className="btn btn-primary dropdown-toggle w-100"
            type="button"
            id="dropdownCompanies"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {_.isEmpty(company) ? 'Список компаний' : company.name}
          </button>
          <div className="dropdown-menu w-100" aria-labelledby="dropdownCompanies">
            {companies.map(item =>
            <>
              <span
                className="dropdown-item"
                role="button"
                onClick={() => setCompany(item)}
                key={item.id}
              >
                {item.name}
              </span>
              </>
            )}
          </div>
        </div>
        : (!_.isEmpty(companies) && companies !== null && companies.length && companies.length === 1)
          ? <div className="dropdown d-flex justify-content-center disabled" >
            <button
              className="btn btn-primary dropdown-toggle w-100"
              type="button"
              id="dropdownCompanies"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {companies[0].name}
            </button>
          </div>
          : <div className="dropdown d-flex justify-content-center disabled">
            <button
              className="btn btn-primary dropdown-toggle w-100"
              type="button"
              id="dropdownCompanies"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Нет доступа к компаниям с отчетами
            </button>
          </div>
      }
    </div>
  )
}

// DropdownCompanies.str = 'Нет доступа к компаниям с отчетами';

const mapStateToProps = state => ({
  companies: state.listCompanies && state.listCompanies.listCompanies.data && listCompaniesWithRoleId3(state.listCompanies.listCompanies.data),
});

export default connect(mapStateToProps)(DropdownCompanies);
