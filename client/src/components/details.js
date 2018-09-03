import React, { Component } from 'react'
import axios from 'axios';


export default class Details extends Component {
  state = {
    img: "https://picsum.photos/200/300/?random",
    description: "Please select a marker for place desciption",
    place: "Click on a marker"

  }
  componentDidUpdate() {
    axios.get("/db").then((response) => {
      var data = response.data;
      var datakeys = Object.keys(response.data);
      for (var i = 1; i < datakeys.length; i++) {
        if ((this.props.selectedMarker[0] === data[datakeys[i]].placePosition[0]) && (this.props.selectedMarker[1] === data[datakeys[i]].placePosition[1])) {
          this.setState({
            place: datakeys[i],
            img: data[datakeys[i]].imageURL,
            description: data[datakeys[i]].description
          });
        }
      }
    })
  }
  render() {
    return (
      <div>
        <div className="card" style={{ width: "25rem" }}>
          <img className="card-img-top" src={this.state.img} />
          <div className="card-body">
            <h5 className="card-title">{this.state.place}</h5>
            <p className="card-text">{this.state.description}</p>
          </div>
        </div>
      </div>
    )
  }
}
