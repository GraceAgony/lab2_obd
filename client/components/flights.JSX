import React from 'react';


class Flight extends React.Component{
    constructor(props){
        super(props);
        this.state ={};
    }

    componentWillMount(){
        console.log(this.props.date);
        console.log(this.props.status);
    };

    render() {
        return (
            <div className="Flight">
                {/*<div className="id_flight">id: {this.props.id}</div>*/}
                {/*<div className="id_originalAirport">id_originalAirport: {this.props.id_originalAirport}</div>*/}
                {/*<div className="id_destinationAirport">id_destinationAirport: {this.props.id_destinationAirport}</div>*/}
                {/*<div className="id_company">id_company: {this.props.id_company}</div>*/}
                {/*<div className="id_plane">id_plane: {this.props.id_plane}</div>*/}
                {/*<div className="status">status: {this.props.status}</div>*/}
                {/*<div className="dateOfDeparture">date: {this.props.date}</div>*/}
                <table>
                    <tbody>
                    <tr>
                        <td>{this.props.id}</td>
                        <td>{this.props.id_originalAirport}</td>
                        <td>{this.props.id_destinationAirport}</td>
                        <td>{this.props.id_company}</td>
                        <td>{this.props.id_plane}</td>
                        <td>{this.props.status}</td>
                        <td>{this.props.date}</td>
                    </tr>
                    </tbody>
                </table>
            </div>



        )
    }
}

export default Flight;

