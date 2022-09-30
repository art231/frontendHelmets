import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import img from "../../../assets/img/illustrations/4.png";
import Loader from "../loader/loader";
import Rocket from "../../../assets/img/illustrations/rocket.png"
import {removeDataStorage} from '../../common/localStorageHelper'


class LogOut extends Component {

    state = {
        error: undefined,
        loading: true,
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            loading: false,
        }), 1000);
    }

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
                                <div className="text-center"><img className="d-block mx-auto mb-4"
                                                                  src={Rocket}
                                                                  alt="shield" width="70"/>
                                    <h4>Ждем вас снова!</h4>
                                    <p>Спасибо за использование Интерфейса.<br/>Вы успешно вышли из системы</p><Link
                                        className="btn btn-primary btn-sm mt-3" to="/login"><span
                                        className="fas fa-chevron-left mr-1" data-fa-transform="shrink-4 down-1"></span>На
                                        страницу логина</Link>
                                </div>
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
export default LogOut;

