import React from 'react';
import Plane from './planes.jsx';
import Button from './loadFromFileButton.jsx';
// import './planesGrid.css';

class PlanesGrid extends React.Component{
    constructor(props){
        super(props);
        this.handleUploadSubmit= this.handleUploadSubmit.bind(this);
    };

    handleUploadSubmit(file){

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.response);
            }
        };
        xmlhttp.open("POST", "http://localhost:5000/planes/loadFromFile");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");;
        xmlhttp.send(file);

    };

    render() {
        return (
            <div id="PlaneGrid">
                <h1>Planes</h1>
                <Button
                    handleUploadSubmit = {this.handleUploadSubmit}
                />
                <table className="tbl">
                    <tbody>
                    <tr>
                        <td>id</td>
                        <td>date of create</td>
                        <td>model</td>
                        <td>numberOfSits</td>
                    </tr>
                    </tbody>
                </table>
                {
                    this.props.planes && this.props.planes.map(plane =>
                        <Plane
                            key = {plane.id_plane}
                            id_plane={plane.id_plane}
                            dateOfCreate={plane.dateOfCreate}
                            model={plane.model}
                            numberOfSeats = {plane.numberOfSeats}
                        >
                        </Plane>
                    )
                }
            </div>
        );

    };
}

export default PlanesGrid;
