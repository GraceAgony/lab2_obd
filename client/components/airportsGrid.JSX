import React from 'react';
import Airport from './airports.jsx';
import Button from './loadFromFileButton.jsx';
// import './airportGrid.css';

class AirportsGrid extends React.Component{
    constructor(props){
        super(props);
        this.handleUploadSubmit = this. handleUploadSubmit.bind(this);
    };

    handleUploadSubmit(file){

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               // console.log(this.response);
            }
        };
        xmlhttp.open("POST", "http://localhost:5000/airports/loadFromFile");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");;
        xmlhttp.send(file);

    };


    render() {
        return (
            <div id="AirportGrid">
                <h1>Airports</h1>
                <Button
                    handleUploadSubmit = {this.handleUploadSubmit}
                    />
                <table className="tbl">
                <tbody>
                <tr>
                    <td>id</td>
                    <td>name</td>
                    <td>address</td>
                    <td>allow</td>
                </tr>
                </tbody>
            </table>
                {
                    this.props.airports && this.props.airports.map((airport ,value)=>
                    <Airport
                        key = {value}
                        id_airport={airport.id_airport}
                        name={airport.name}
                        address={airport.address}
                        allow = {airport.allow}
                    >
                    </Airport>
                    )
                }
            </div>
        );

    };
}

export default AirportsGrid;

