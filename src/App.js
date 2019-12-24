import React, { Component } from "react";
import "./App.css";
import { Button, Modal, Form, Input, Segment } from 'semantic-ui-react';
import Swal from 'sweetalert2';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [
        {
          imagewidth: 500,
          imageHeight: 500,
          plotX: 200,
          plotY: 300,
          display: "Narayan Shrestha"
        },
        {
          imagewidth: 600,
          imageHeight: 600,
          plotX: 100,
          plotY: 50,
          display: "Paurakh Sharma Humagain"
        },
        {
          imagewidth: 500,
          imageHeight: 500,
          plotX: 200,
          plotY: 300,
          display: "Bijay Chaudhary"
        }
      ],
      newImage: {
        location: "",
        imagewidth: "",
        imageHeight: "",
        plotX: "",
        plotY: "",
        display: ""
      }    
    };
  }

  componentDidMount = () => {
    
    this._renderCanvas();

  };

  _renderCanvas = () => {

    const { images } = this.state;

    var canvas = document.querySelectorAll("canvas");

    canvas.forEach( function(e, i) {

      var c = e.getContext("2d");

      c.fillStyle = "#ffffff";
      c.font = "20px Arial";
      c.fillText(`${images[i].display}(${images[i].plotX}, ${images[i].plotY})`, images[i].plotX, images[i].plotY)
      c.fillStyle = "rgba(255,0,0,0.5)";
      c.fillRect(images[i].plotX, images[i].plotY, 75, 75);

    });
  }

  _onChange = (e) => {

    let { newImage } = this.state;

    newImage[e.target.name] = e.target.value;

    this.setState({
      newImage
    })
  }

  _onSubmit = (e) => {

    e.preventDefault();

    let { images, newImage } = this.state;

    Swal.fire(
      'Success',
      'New Image Uploaded to state!',
      'success'
    )

    this.setState({
      images : [... images, newImage],
      newImage: {
        imagewidth: "",
        imageHeight: "",
        plotX: "",
        plotY: "",
        display: ""
      }
    }, () => { this._renderCanvas(); })

  }

  render() {

    const { images, loading, newImage } = this.state;

    return (
      <div className="App">

        <h1>Canvas Image Gallery</h1>
        {images &&
          images.map((data, i) => {
            return (
              <React.Fragment key={i}>
                <canvas
                  width={data.imagewidth}
                  height={data.imageHeight}
                ></canvas>
                <img
                  src={`https://picsum.photos/${data.imagewidth}/${data.imageHeight}`}
                  alt={data.display}
                  height={data.height}
                  width={data.width}
                />
                <br />
              </React.Fragment>
            );
          })}

        <Modal trigger={<Button primary>Upload New Photo</Button>} centered={false} closeOnDimmerClick closeOnDocumentClick closeIcon>
          <Modal.Header>New Photo</Modal.Header>
          <Modal.Content >
            <Form onSubmit={(e) => this._onSubmit(e)}>
              <Form.Group inline>
                <Form.Field>
                  <label>Image Location : </label>
                  <Input placeholder='https://picsum.photos' value="https://picsum.photos"/>/
                </Form.Field>
                <Form.Field>
                  <Input type="number" name="imagewidth" placeholder='imageWidth' value={newImage.imagewidth} onChange={(e) => this._onChange(e)} required />/
                </Form.Field>
                <Form.Field>
                  <Input type="number" name="imageHeight" placeholder='imageHeight' value={newImage.imageHeight} onChange={(e) => this._onChange(e)} required />
                </Form.Field>
              </Form.Group>
              <Segment>Image Location Example : https://picsum.photos/500/400</Segment>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Display Name' name="display" placeholder="Display Name" value={newImage.display} onChange={(e) => this._onChange(e)} required/>
                <Form.Input fluid label='Plot X' type="number" name="plotX" placeholder='Plot X' value={newImage.plotX} onChange={(e) => this._onChange(e)} required/>
                <Form.Input fluid label='Plot Y' type="number" name="plotY" placeholder='Plot Y' value={newImage.plotY} onChange={(e) => this._onChange(e)} required/>
              </Form.Group>
              <Button primary>Upload</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
