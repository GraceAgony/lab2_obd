import React from 'react';


class Airport extends React.Component {
    constructor(props) {
        super(props);
        this.state ={};
    };

    render() {
        return (
            <div className="Airport">
                {/*<div className="id_airport">id: {this.props.id_airport}</div>*/}
                {/*<div className="name">name: {this.props.name}</div>*/}
                {/*<div className="address">address: {this.props.address}</div>*/}
                {/*<div className="allow">allow: {this.props.allow}</div>*/}
               <table>
                <tbody>
                <tr>
                    <td>{this.props.id_airport}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.address}</td>
                    <td>{this.props.allow}</td>
                </tr>
                </tbody>
               </table>
            </div>
        )
    };
}

export default Airport;
