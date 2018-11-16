import React from 'react';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
      });
      if(this.props.setImageURL !== undefined) {
        this.props.setImageURL(reader.result);
        console.log("SET URL");
        console.log(reader.result);
      }
      if(this.props.showPreview === true) {
        this.setState({
          imagePreviewUrl: reader.result
        });
      }
      else {
        this.setState({
          imagePreviewUrl: ''
        });
      }
    }
    if(file !== undefined) {
      reader.readAsDataURL(file);
      console.log("FILE NOT UNDEFINED");
    }
    else if(file === undefined){
      this.setState({
        file: '',
        imagePreviewUrl: ''
      })
      console.log("FILE UNDEFINED");
    }
    console.log("OUTSIDE");
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="img-responsive center-block" src={imagePreviewUrl} alt={imagePreviewUrl}/>);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

    return (
      <div className="previewComponent">
        {/*<form onSubmit={(e)=>this._handleSubmit(e)}>*/}
          <input className="fileInput"
                 type="file"
                 multiple accept='image/*'
                 onChange={(e)=>this._handleImageChange(e)} />
          {/*<button className="submitButton"*/}
                  {/*type="submit"*/}
                  {/*onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>*/}
          <div className="imgPreview">
            {$imagePreview}
          </div>
        {/*</form>*/}
      </div>
    )
  }
}

export default ImageUpload;
