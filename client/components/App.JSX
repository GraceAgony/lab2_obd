import React from 'react';
import AirportsGrid from "./airportsGrid.JSX";
import CompanysGrid from  "./companysGrid.JSX";
import FlightsGrid from "./flightsGrid.JSX";
import PlanesGrid from "./planesGrid.JSX";

class App extends React.Component{
    constructor(props){
        super(props);
        this.getFlights = this.getFlights.bind(this);
        this.getPlanes = this.getPlanes.bind(this);
        this.getCompanys = this.getCompanys.bind(this);
        this.getAirports = this.getAirports.bind(this);
        this.handleAddOptions = this.handleAddOptions.bind(this);
        this.handleChangeLastId = this.handleChangeLastId.bind(this);
        this.handleOnAdd = this.handleOnAdd.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
        this.handleOnEdit = this.handleOnEdit.bind(this);
        this.searchByWord = this.searchByWord.bind(this);
        this.searchByFull = this.searchByFull.bind(this);
        this.searchByDate = this.searchByDate.bind(this);
        this.searchByBool = this.searchByBool.bind(this);
        this.seeResults = this.seeResults.bind(this);
       // this.setFlights = this.setFlights.bind(this);
        this.state = {
            airports:[],
            flights:[],
            planes: [],
            companys: [],
            flightLastId: 0,
            dataArray: [],
            table: undefined,
        };
    };

      getPlanes(){
        var a;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/plane/all');
        xhr.send();
        function load(e) {
            a = JSON.parse(xhr.response);
            //console.log(a);
            this.setState({planes: a[0].data});
        };
        xhr.onload = load.bind(this);
    };


    getAirports(){
        var a;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/airport/all');
        xhr.send();
        function load(e) {
            a = JSON.parse(xhr.response);
            //console.log(a);
            this.setState({airports: a[0].data});
        };
        xhr.onload = load.bind(this);
    };


    getCompanys(){
        var a;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/company/all');
        xhr.send();
        function load(e) {
            a = JSON.parse(xhr.response);
           // console.log(a);
            this.setState({companys: a[0].data});
        };
        xhr.onload = load.bind(this);
    };


    getFlights(){
        var a;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/flight/all');
        xhr.send();
        function load(e) {
            a = JSON.parse(xhr.response);
            console.log(a[0].data);
            this.setState({flights: a[0].data});
            console.log(this.state.flights);
        };
        xhr.onload = load.bind(this);
    };

    componentWillMount() {
      this.getFlights();
      this.getAirports();
      this.getCompanys();
      this.getPlanes();
    };

    handleOnDelete(id){
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.response);
            }
        };
        xmlhttp.open("DELETE", `http://localhost:5000/flight/delete/${id}`);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send();
        this.getFlights();
    };


    handleChangeLastId(x){
        this.setState({flightLastId: x});
    };

    handleOnAdd(flight){
        console.log(flight);
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.response);
            }
        };
        xmlhttp.open("POST", "http://localhost:5000/flight/add");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        //xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*");
        flight = JSON.stringify(flight);

        xmlhttp.send(flight);
        this.getFlights();

    };

    handleAddOptions(options){
        for(let i=0; i<this.state.flights.length; i++){
            let newOption = document.createElement('option');
           // newOption.index = i;
           // console.log(this.state.flights);
            newOption.text = this.state.flights[i].id;
            options.appendChild(newOption);
        };
    };


    handleOnEdit(id, field, key){

        var req = {'field':field, 'key':key};
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.response);
            }
        };
        xmlhttp.open("POST", `http://localhost:5000/flight/edit/${id}`);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(req));
        this.getFlights();
    };

    searchByWord(){
        var str = this.refs.selectSearch.selectedOptions[0].value+'';
        var to = str.indexOf(' ');
        var field  =  str.slice(0, to);
        console.log(field);
        var table = str.slice(to+2,str.length-1);
        console.log(table);
        var key = this.refs.searchWord.value;
        console.log('key= '+key);
        var req = {'field':field, 'key':key, 'table':table};
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", `http://localhost:5000/searchByWord`);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(req));
        console.log(req);
        function load(e) {
            var a = JSON.parse(xmlhttp.response);
            console.log(a[0].data);
            this.setState({table:table, dataArray:a[0].data});
        };
        xmlhttp.onload = load.bind(this);

    };



    searchByFull(){
        var str = this.refs.selectSearch.selectedOptions[0].value+'';
        var to = str.indexOf(' ');
        var field  =  str.slice(0, to);
        var table = str.slice(to+2,str.length-1);
        console.log(table);
        var key = this.refs.searchFull.value;
        var req = {'field':field, 'key':key, 'table':table};
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", `http://localhost:5000/searchByFull`);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(req));
        console.log(req);
        function load(e) {
            var a = JSON.parse(xmlhttp.response);
            console.log(a[0].data);
            this.setState({table:table, dataArray:a[0].data});
        };
        xmlhttp.onload = load.bind(this);

    };

    searchByDate(){
        var str = this.refs.selectSearch1.selectedOptions[0].value+'';
        var from = this.refs.from.value;
        var t = str.indexOf('(');
        var field  =  str.slice(0, t-1);
        var to = this.refs.to.value;
        var table = str.slice(t+1,str.length-1);
        console.log(table);
        if(field ==='date of create'){
            field = 'dateOfCreate';
        };
        var req = {'from':from, 'to':to,'table':table,'field':field};
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", `http://localhost:5000/serchByDate`);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(req));
        console.log(req);
        function load(e) {
            var a = JSON.parse(xmlhttp.response);
            console.log(a[0].data);
            this.setState({table:table, dataArray:a[0].data});
        };
        xmlhttp.onload = load.bind(this);


    };

    searchByBool(){
        var str = this.refs.selectSearch2.selectedOptions[0].value+'';
        var t = str.indexOf('(');
        var field  =  str.slice(0, t-1);
        var key = this.refs.selectSearch3.selectedOptions[0].value+'';
        var table = str.slice(t+1,str.length-1);
        console.log(table);
        var req = {'table':table,'field':field, 'key':key};
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", `http://localhost:5000/searchByBool`);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(req));
        console.log(req);
        function load(e) {
            var a = JSON.parse(xmlhttp.response);
            console.log(a[0].data);
            this.setState({table:table, dataArray:a[0].data});
        };
        xmlhttp.onload = load.bind(this);

    };

seeResults(table,dataArray){
    switch(table){
        case 'airport':
            return <AirportsGrid airports = {dataArray}/>;
        case "planes":
           return  <PlanesGrid planes = {dataArray}/>
        case "company":
            return <CompanysGrid companys = {dataArray}/>;
        default:
            return <div> Select table </div>
};
};

    render(){
      return(
          <div id="app">
            <div id="searches">
                  <div className="search">
                      <h3>search</h3>
                      <select id="selectSearch" ref = "selectSearch">
                        <option>name (airport)</option>
                        <option>address (airport)</option>
                        <option>contacts (company)</option>
                        <option>name (company)</option>
                        <option>model (planes)</option>
                    </select>
                    <input ref = "searchWord" type="text" placeholder="слово входить"/>
                    <button className="searchBtn" onClick={this.searchByWord}>Search</button>
                    <input  ref = "searchFull" type="text" placeholder="ціла фраза"/>
                    <button className="searchBtn" onClick={this.searchByFull}>Search</button>
                  </div>
                  <div className="search">
                    <h3>search date</h3>
                    <select id="selectSearch1" ref = "selectSearch1">
                         <option>date of create (company)</option>
                        <option>date of create (planes)</option>
                    </select>
                    <input ref ="from" type="date"/>
                    <input ref = "to" type="date"/>
                    <button className="searchBtn" onClick={this.searchByDate}>Search</button>


              <div className="search">
                  <h3>boolean search</h3>
                  <select id="selectSearch2" ref = "selectSearch2">
                      <option>allow (airport)</option>
                  </select>
                  <select id="selectSearch3" ref = "selectSearch3">
                      <option>1</option>
                      <option>0</option>
                  </select>
                  <button className="searchBtn" onClick={this.searchByBool}>Search</button>
              </div>
              </div>
          </div>
              <div id='results'>
                  <h3>result of search</h3>
                  {this.seeResults(this.state.table, this.state.dataArray)}
              </div>
              <div id="Grids">
                  <AirportsGrid airports = {this.state.airports}/>
              <CompanysGrid companys = {this.state.companys}/>
              <PlanesGrid planes = {this.state.planes}/>
              <FlightsGrid flights = {this.state.flights}
                           handleAddOptions = {this.handleAddOptions}
                           handleOnAdd = {this.handleOnAdd}
                           handleOnDelete = {this.handleOnDelete}
                           handleOnEdit = {this.handleOnEdit}
                           handleChangeLastId = {this.handleChangeLastId}
                           flightLastId = {this.state.flightLastId}
                          // handleEdit = {this.state.handleEdit}
              />
              </div>
          </div>
      )
    };
}

export default App;