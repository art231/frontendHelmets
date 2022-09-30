import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

export default class Geozone extends Component {

    state = {
        error: undefined,
        loading: false,
        id: undefined,
        companyId: 0,
        name: '',
        deleted: false,
        created: false,
    }

    componentDidMount() {
        var zone = this

        console.log("geozone did mount")

        if (this.props.data) {
            var data = this.props.data;
            this.setState({
                id: data.id,
                companyId: data.companyId,
                deleted: data.deleted,
                created: data.created,
            }
            );
            if(data.name) {
                this.setState({name: data.name});
            }
        }
        this.props.map.setOnChangeCallback(function (data) {
            zone.setState({
                polygons: _.map(data, function (item) {
                    return [item];
                })
            })
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        console.log("geozone update", this.props)
        console.log("prev props", prevProps)

        if (prevProps.deleted !== this.props.deleted) {
            this.setState({ deleted: this.props.deleted });
        }

        if (prevProps.created !== this.props.created) {
            this.setState({ created: this.props.created });
        }

        if (this.props.error && this.props.error !== prevProps.error) {
            this.props.onError(this.props.error);
        }


        if (!prevProps.deleted && this.props.deleted || !prevProps.created && this.props.created) {
            this.props.onUpdate();
            this.props.cleanGeozone();
        }
        if (this.props.data.name !== prevProps.data.name 
            || this.props.data.id !== prevProps.data.id
            || this.props.data.companyId !== prevProps.data.companyId) {
            this.setState(
                this.props.data
            );
        }

    }

    onChangeHandler = (event, field) => {
        event.preventDefault();
        let text = event.target.value;
        let name = { ...this.state.name };

        if (field === 'name') {
            name = text
        }

        this.setState({
            name
        })
    }

    onCreatePressed() {
        if (_.isEmpty(this.state.polygons)) {
            this.props.onError("Не задана геозона");
        } else {
            this.props.postGeozone(this.state);
            this.setState({
                id: undefined,
                companyId: 0,
                name: '',
            })
        }
    }

    onDeletePressed() {
        this.props.deleteGeozone(this.state.id);
    }



    render() {
        return (
            <div className="card row" style={{ height: '160px' }}>
                {this.state.id ? <h4 className="text-center mb-3 mt-3">Редактирование</h4> : <h4 className="text-center mb-3 mt-3">Создание геозоны</h4>}
                <div className="form-group mr-3 ml-3">
                    <input onChange={(event) => this.onChangeHandler(event, 'name')} value={this.state.name} className="form-control" id="name" type="text" />
                </div>
                {this.state.id ?
                    <button onClick={() => { this.onDeletePressed() }} className="mb-3 ml-3 mr-3 btn btn-falcon-default btn-sm" type="button">Удалить</button>
                    : <button onClick={() => { this.onCreatePressed() }} className="mb-3 ml-3 mr-3 btn btn-falcon-default btn-sm" type="button">Создать</button>}

            </div>);
    }

}
