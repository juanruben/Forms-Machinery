import React, { Component } from 'react';

class FileUploader extends React.Component {
    constructor(props) {
        super(props);
         
        this.state = {
            active: false,
            imageSrc: '',
            loaded: false
        }
         
        this.onDragEnter  = this.onDragEnter.bind(this);
        this.onDragLeave  = this.onDragLeave.bind(this);
        this.onDrop       = this.onDrop.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
     
    onDragEnter(e) {
        this.setState({ active: true });
    }
     
    onDragLeave(e) {
        this.setState({ active: false });
    }
     
    onDragOver(e) { 
        e.preventDefault(); 
    }
     
    onDrop(e) {
        e.preventDefault();
        this.setState({ active: false });
        this.onFileChange(e, e.dataTransfer.files[0]);
    }
     
    onFileChange(e, file) {
        var file = file || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();
             
         if (!file.type.match(pattern)) { 
            alert('Formato inválido');
            return;
        }
         
        this.setState({ loaded: false });
         
        reader.onload = (e) => {
            this.setState({ 
                imageSrc: reader.result, 
                loaded: true
            }); 
        }
         
        reader.readAsDataURL(file);
    }
     
    getFileObject() {
        return this.refs.input.files[0];
    }
     
    getFileString() {
        return this.state.imageSrc;
    }
     
    render() {
        let state = this.state,
            props = this.props,
            labelClass  = `uploader ${state.loaded && 'loaded'}`,
            borderColor = state.active ? props.activeColor : props.baseColor,
            iconColor   = state.active 
                ? props.activeColor
                : (state.loaded) 
                    ? props.overlayColor 
                    : props.baseColor;
         
        return (
            <>
                <label 
                    className={labelClass+" custom-file-label"}
                    onDragEnter={this.onDragEnter}
                    onDragLeave={this.onDragLeave} 
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}
                    style={{outlineColor: borderColor}}>
                    Subir archivo jpg, png, pdf
                    <i className="icon icon-upload"
                        style={{ color: iconColor }}></i>
                    <input type="file" accept="image/*" onChange={this.onFileChange} ref="input" className="custom-file-input"/>
                </label><br/>                
                <div className="content-image-loader">
                    <img src={state.imageSrc} className={state.loaded ? 'loaded': ''}/>
                </div>
            </>
        );
    }
}

 
export default FileUploader;