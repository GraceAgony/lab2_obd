import React from 'react';


class Plane extends React.Component{
    constructor(props){
        super(props);
        this.state ={};
    }

render() {
    return (
        <div className="Plane">
            {/*<div className="id_plane">id: {this.props.id_plane}</div>*/}
            {/*<div className="dateOfCreate">date of create: {this.props.dateOfCreate}</div>*/}
            {/*<div className="model">model: {this.props.model}</div>*/}
            {/*<div className="numberOfSits">numberOfSits: {this.props.numberOfSits}</div>*/}
            <table>
                <tbody>
                <tr>
                    <td>{this.props.id_plane}</td>
                    <td>{this.props.dateOfCreate}</td>
                    <td>{this.props.model}</td>
                    <td>{this.props.numberOfSeats}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
}

export default Plane;

