import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import main from '../../../scss/style.scss';
import Loader from "../loader/loader";
import DiWo from "../../../assets/img/diwo/diwo.png";

class Login extends Component {

    state = {
        error: undefined,
        errorLogin: false,
        errorPassword: false,
        loading: true,
        passwordShown: false,
        data: {
            login: '',
            password: '',
        }
    }

    componentDidMount() {
        this.timerHandle = setTimeout(() => {
            this.setState({
                loading: this.props.loading,
                error: this.props.error,
            })
            this.timerHandle = 0;
        }, 1000);
        $('[data-toggle="tooltip"]').tooltip();
    }

    componentWillUnmount = () => {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = 0;
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        $('[data-toggle="tooltip"]').tooltip();

        if (prevProps !== this.props) {
            this.setState({
                loading: this.props.loading,
                error: this.props.error,
            })
        }
    }

    onChangeHandler = (event, field) => {
        event.preventDefault();
        let data = { ...this.state.data }

        if (field === 'login') {
            data.login = event.target.value;
        } else {
            data.password = event.target.value;
        }

        this.setState({
            data
        })
    }

    submitHandler = event => {
        event.preventDefault()
    };

    showHide = () => {
        this.setState({ passwordShown: !this.state.passwordShown });
    }

    loginHandler = () => {
        if (this.state.data.login.length > 0 && this.state.data.password.length > 0) {
            this.props.putAuth(this.state.data);
            this.setState({
                error: undefined,
                errorLogin: false,
                errorPassword: false,
            })
        } else if (this.state.data.password.length > 0) {
            this.setState({
                error: 'Логин пустой',
                errorLogin: true,
                errorPassword: false,
            })
        } else if (this.state.data.login.length > 0) {
            this.setState({
                error: 'Пароль пустой',
                errorPassword: true,
                errorLogin: false,
            })
        } else {
            this.setState({
                error: 'Логин и пароль пустой',
                errorLogin: true,
                errorPassword: true,
            })
        }
    }

    render() {

        if (!this.state.loading) {
            return (
                <div className="container">
                    <div className="row flex-center min-vh-100 p-6">
                        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <Link className="d-flex flex-center mb-4" to="/">
                                <div className="d-flex align-items-center"><img src={DiWo} alt="" width="100" /></div>
                            </Link>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <div className="row text-left justify-content-between align-items-center mb-2">
                                        <div className="col-auto">
                                            <h5>Войдите в аккаунт</h5>
                                        </div>
                                    </div>
                                    <form onSubmit={this.submitHandler}>
                                        <div className="form-group">
                                            <input className={['form-control', (this.state.errorLogin) ? 'border-danger' : ''].join(' ')} type="email" placeholder="Логин"
                                                name="email"
                                                onChange={(event) => this.onChangeHandler(event, 'login')}
                                                value={this.state.data.login} />
                                        </div>
                                        <div className="form-group">
                                            <input className={['form-control', (this.state.errorPassword) ? 'border-danger' : ''].join(' ')} type={this.state.passwordShown ? "text" : "password"} placeholder="Пароль"
                                                name="password"
                                                onChange={(event) => this.onChangeHandler(event, 'password')}
                                                value={this.state.data.password} />
                                            <div className="text-right mr-2" onClick={this.showHide}>
                                                <span className="text-black-50 h6" role="button">{this.state.passwordShown ? "Скрыть" : "Показать"}</span>
                                            </div>
                                        </div>
                                        {(this.state.error) ?
                                            <div className="badge badge-soft-danger" data-toggle="tooltip" data-placement="bottom"
                                                title="Напишите нам в поддержку support@diwo.tech">{(this.state.error === 422) ? 'Такого логина не существует!' : this.state.error}<span
                                                    className="ml-2 far fa-question-circle" data-fa-transform="shrink-1"></span></div>
                                            : null}
                                        <button className="btn btn-primary btn-block mt-2"
                                            onClick={() => this.loginHandler()}>Войти</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );
        } else {
            return (
                <Loader />
            );
        }

    }
}
export default Login;

