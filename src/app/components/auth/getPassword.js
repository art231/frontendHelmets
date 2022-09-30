import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import img from "../../../assets/img/illustrations/4.png";
import Loader from "../loader/loader";
import Envelope from "../../../assets/img/illustrations/envelope.png"


class GetPassword extends Component {

    state = {
        error: undefined,
        loading: true,
        email: '',
    }

    componentDidMount() {
        this.timerHandle = setTimeout(() => {
            this.setState({
                loading: false,
            })
            this.timerHandle = 0;
        }, 1000);

        if(!this.props.email) {
            this.props.history.push('/login')
        }

        let email = this.props.email

        this.setState({
            email
        })
    }

    componentWillUnmount = () => {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = 0;
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {

        if(!this.state.loading) {
            return (

                <div className="row flex-center min-vh-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4"><Link
                            className="d-flex flex-center mb-2" to="/"><span
                            className="text-sans-serif font-weight-extra-bold fs-5 d-inline-block">DiWo</span></Link>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <div className="text-center mb-5"><img className="d-block mx-auto mb-4"
                                                                           src={Envelope}
                                                                           alt="Email" width="70"/>
                                        {/*<h4>Проверьте почтовый ящик!</h4>*/}
                                        {/*<p>На ваш почтовый ящик <strong>{this.state.email}</strong> отправлено письмо с вашем*/}
                                        {/*    паролем.</p>*/}
                                    </div>
                                    <div className="row text-left justify-content-between align-items-center mb-2">
                                        <div className="col-auto">
                                            <h5>Введите пароль</h5>
                                        </div>
                                    </div>
                                    <form>
                                        <div className="form-group">
                                            <input className="form-control" type="password" placeholder="Пароль"/>
                                        </div>
                                        <div className="form-group">
                                            <Link className="btn btn-primary btn-block mt-3" type="submit" name="submit"
                                                  onClick={() => {this.props.putAuth()}}
                                                  to="/">Войти</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
            );
        } else {
            return (
                <Loader />
            );
        }

    }
}
export default GetPassword;

