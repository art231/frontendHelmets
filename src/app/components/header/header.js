import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import DiWo from "../../../assets/img/diwo/diwo.png";
import main from '../../../scss/style.scss';
import { removeDataStorage } from "../../common/localStorageHelper";

export default class Header extends Component {

    remove = () => {
        removeDataStorage("access_Token");
        removeDataStorage("refresh_Token");
        removeDataStorage("refresh_Time");
        removeDataStorage("expires_in");
        this.props.logout()
    }

    onClickHandler = () => {
        this.props.onClickShowSidepanel();
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light fs--1 pt-3">
                    <Link to='/' className="navbar-brand mr-1 mr-sm-3 mt-n3 pb-1">
                        <div className="d-flex align-items-center"><img className="mr-2"
                            src={DiWo}
                            alt="" width="80" />
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarContent1" aria-controls="navbarContent1" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent1">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link"
                                    to='/'
                                    id=""
                                    role="button"
                                    exact
                                    activeClassName={main.ActiveLink}
                                >
                                    Каски
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link"
                                    to='/list-reports'
                                    id=""
                                    role="button"
                                    activeClassName={main.ActiveLink}
                                >
                                    Отчеты
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link"
                                    to='/geozones'
                                    id=""
                                    role="button"
                                    activeClassName={main.ActiveLink}
                                >
                                    Геозоны
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link"
                                    to='/list-incident'
                                    id=""
                                    role="button"
                                    exact
                                    activeClassName={main.ActiveLink}
                                >
                                    Происшествия
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="d-lg-block d-sm-none d-md-none">
                        <ul className="navbar-nav navbar-nav-icons ml-auto flex-row align-items-center">
                            <li className="container mr-2">
                                {/* <i class="fa fa-exclamation-triangle" aria-hidden="true" style={{ width: '2rem', height: '2rem', color: 'black' }}></i> */}
                                {/* <i class="bi bi-exclamation-triangle-fill" style={{ width: '2rem', height: '2rem', color: 'black' }}></i> */}
                                <span role='button' data-toggle="modal" data-target="#sidepanelModal" onClick={this.onClickHandler}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                                    </svg>
                                </span>
                            </li>
                            <li className="nav-item dropdown dropdown-on-hover">

                                <Link className="nav-a pr-0"
                                    id="navbarDropdownUser" to='#'
                                    role="button" data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <div className="avatar">
                                        <i className="fas fa-user-circle"
                                            style={{ width: '2rem', height: '2rem', color: 'black' }}></i>
                                    </div>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right py-0"
                                    aria-labelledby="navbarDropdownUser">
                                    <div className="bg-white rounded-soft py-2">
                                        <Link className="dropdown-item" to="/companies">Управление компаниями</Link>
                                        <Link className="dropdown-item" to="/">Настройки</Link>
                                        <Link className="dropdown-item" to="/logout" onClick={() => this.remove()}>Выйти</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

