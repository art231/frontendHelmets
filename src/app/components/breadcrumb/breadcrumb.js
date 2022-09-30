import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash';

export default class BreadCrumb extends Component {

    roundItem(path) {
        let arrayItem = [];
        let arrayLink = [];
        let length = path.length;

        for(let b = 0, i = 1; i < length;) {
            b = path.indexOf('/', b)
            i = path.indexOf('/', i)

            if(i < length && i !== -1) {
                arrayItem.push(path.slice(b + 1, i))
                arrayLink.push(path.slice(b + 1, i))
                b = i;
                i++;
            } else {
                arrayItem.push(path.slice(b + 1, length))
                arrayLink.push(path.slice(b + 1, length))
                break;
            }
        }

        if (arrayItem.indexOf('helmet') > -1) {
            let index = arrayItem.indexOf('helmet')
            arrayItem.splice(index + 1, index + 1)
        }

        if (arrayLink.indexOf('helmet') > -1) {
            let index = arrayLink.indexOf('helmet')
            let serial = arrayLink.splice(index + 1, index + 1)
            arrayLink[index] = 'helmet/' + serial
        }

        return {arrayItem, arrayLink};
    }

    render() {
        let path = location.pathname;
        let {arrayItem, arrayLink} = this.roundItem(path);
        console.log('arrayItem', arrayItem, arrayLink)

        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {(path !== '/') ?
                        <React.Fragment>
                            <li className="breadcrumb-item"><Link to="/">Список касок</Link></li>
                            {(!_.isEmpty(arrayItem)) ?

                                arrayItem.map((item, index) => {
                                    return(
                                        <React.Fragment key={`${index}-${Math.random()}`} >
                                            <li className="breadcrumb-item">
                                                {(arrayItem.length - 1 === index)
                                                    ? item
                                                    : <Link to={'/' + arrayLink[index]}>{item}</Link>
                                                }

                                            </li>
                                        </React.Fragment>
                                    )
                                })

                                : null

                            }
                        </React.Fragment>
                        : null
                    }

                    {/*<li className="breadcrumb-item"><a href="helmet.html">Каска LM - 1</a></li>*/}
                    {/*<li className="breadcrumb-item active" aria-current="page">История событий</li>*/}
                </ol>
            </nav>
        );
    }
}
