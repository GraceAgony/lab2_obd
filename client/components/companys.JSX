import React from 'react';


class Company extends React.Component{
    constructor(props){
        super(props);
        this.state ={};
    }

    render() {
        return (
            <div className="Company">
                {/*<div className="id_company">id: {this.props.id_company}</div>*/}
                {/*<div className="dateOfCreate">date of create: {this.props.dateOfCreate}</div>*/}
                {/*<div className="contacts">contacts: {this.props.contacts}</div>*/}
                {/*<div className="name">name: {this.props.name}</div>*/}
                <table>
                    <tbody>
                    <tr>
                        <td>{this.props.id_company}</td>
                        <td>{this.props.dateOfCreate}</td>
                        <td>{this.props.contacts}</td>
                        <td>{this.props.name}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
};

export default Company;
