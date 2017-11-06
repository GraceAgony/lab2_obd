import React from 'react';


class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '',};

        this.readFile = this.readFile.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    };

    _handleSubmit(event) {
        event.preventDefault();
        this.props.handleUploadSubmit(this.state.file);
    };


    readFile(event){
        event.preventDefault();
        let file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = (event) => {
            this.setState({
                file: reader.result,
            });
        };
        reader.readAsText(file);
    };

    render(){
      return(
          <div className="btn">
              <form id="uploadForm">
              <input id="upload" className="inputfile" ref="upload" type="file" accept=".json"
                     onChange={(event)=> {
                         this.readFile(event)
                     }}
                />

              <button id="upload-btn"
                      className="btn"
                      type="submit"
                      onClick={(e)=>this._handleSubmit(event)}>Upload</button>
              </form>
          </div>

      )
    };
};

export default Button;