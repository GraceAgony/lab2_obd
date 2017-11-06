import React from 'react';
import Company from './companys.jsx';
import Button from './loadFromFileButton.jsx';
// import './companysGrid.css';

class CompanysGrid extends React.Component{
    constructor(props){
        super(props);
        this.handleUploadSubmit= this.handleUploadSubmit.bind(this);
    };

    handleUploadSubmit(file){

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                 console.log(this.response);
            }
        };
        xmlhttp.open("POST", "http://localhost:5000/companys/loadFromFile");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");;
        xmlhttp.send(file);

    };


    render() {
        return (
            <div id="CompanysGrid">
                <h1>Companys</h1>
                <Button
                    handleUploadSubmit = {this.handleUploadSubmit}
                />
                <table className="tbl">
                    <tbody>
                    <tr>
                        <td>id</td>
                        <td>date of create</td>
                        <td>contacts</td>
                        <td>name</td>
                    </tr>
                    </tbody>
                </table>
                {
                    this.props.companys && this.props.companys.map(company =>
                        <Company
                            key = {company.id_company}
                            id_company={company.id_company}
                            dateOfCreate={company.dateOfCreate}
                            contacts={company.contacts}
                            name = {company.name}
                        >
                        </Company>
                    )
                }
            </div>
        );

    };
}

export default CompanysGrid;
