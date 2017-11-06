import React from 'react';
import Flight from './flights.jsx';
// import './airportGrid.css';

class FlightsGrid extends React.Component{
    constructor(props){
        super(props);
        this.state = {flightLastId :this.props.flightLastId};
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleOnEdit = this.handleOnEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    };

    handleOnEdit(){
        var id = this.refs.option.selectedOptions[0].value;
        this.props.handleOnEdit(id);
    };

    handleAdd(){
        console.log(this.props.flights);
        if(this.refs.originalAirportInput.value &&
            this.refs.destinationAirportInput.value &&
            this.refs.companyInput.value &&
            this.refs.planeInput.value &&
            this.refs.statusInput.value &&
            this.refs.dateInput.value
        ){
            var flight = {
                'id_originalAirport': this.refs.originalAirportInput.value,
                'id_destinationAirport':this.refs.destinationAirportInput.value,
                'id_company': this.refs.companyInput.value ,
                'id_plane': this.refs.planeInput.value,
                'status': this.refs.statusInput.value,
                'date': this.refs.dateInput.value,
            };
        };
        this.props.handleOnAdd(flight);
    };

    handleDelete(){
        this.props.handleAddOptions(this.refs.option);
    };

     handleEdit(){
        this.props.handleAddOptions(this.refs.optionEdit);
    };

    handleOnEdit(){
        var id = this.refs.optionEdit.selectedOptions[0].value;
        var field = this.refs.optionEditField.selectedOptions[0].value;
        var key = this.refs.optionEditKey.value;
        this.props.handleOnEdit(id, field, key);
    };

    handleChoose(){
         var id = this.refs.option.selectedOptions[0].value;
         this.props.handleOnDelete(id);
     };

    render() {
        return (
            <div id="FligthGrid">
                <h1>Flights</h1>
                <div id="addDiv">
                    <input ref="originalAirportInput" placeholder="enter flight`s original airport id" type="text"></input>
                    <input  ref="destinationAirportInput"  placeholder="enter flight`s destination airport id" type="text"></input>
                    <input  ref="companyInput" placeholder="enter flight`s company id" type="text"></input>
                    <input  ref="planeInput" placeholder="enter flight`s plane id" type="text"></input>
                    <input  ref="statusInput" placeholder="enter flight`s status" type="number"></input>
                    <input  ref="dateInput" placeholder="enter flight`s date" type="date"></input>
                    <button className="addBtn" onClick={this.handleAdd}>add</button>
                </div>
                <div>
                    <button className="deleteBtn" onClick={this.handleChoose}>delete</button>
                    <select ref="option" onFocus={this.handleDelete} ></select>
                </div>
                <div>
                    <button className="editBtn" >edit</button>
                    <select ref="optionEdit" onFocus={this.handleEdit} ></select>
                    <select ref="optionEditField" >
                        <option>id_originalAirport</option>
                        <option>id_destinationAirport</option>
                        <option>id_company</option>
                        <option>id_plane</option>
                        <option>status</option>
                        <option>dateOfDeparture</option>
                    </select>
                    <input ref="optionEditKey" placeholder="new value" type="text"></input>
                    <button onClick={this.handleOnEdit}>Submit</button>
                </div>
                <table className="tbl">
                    <tbody>
                    <tr>
                        <td>id</td>
                        <td>id_originalAirport</td>
                        <td>id_destinationAirport</td>
                        <td>id_company</td>
                        <td>id_plane</td>
                        <td>status</td>
                        <td>date</td>
                    </tr>
                    </tbody>
                </table>
                    {
                        this.props.flights && this.props.flights.map(flight =>
                        <Flight
                            key={flight.id}
                            id={flight.id}
                            id_originalAirport={flight.id_originalAirport}
                            id_destinationAirport={flight.id_destinationAirport}
                            id_company = {flight.id_company}
                            id_plane = {flight.id_plane}
                            status = {flight.status}
                            date = {flight.date}
                        >
                        </Flight>
                    )
                }
            </div>
        );

    };
}

export default FlightsGrid;
