import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet';
import axios from 'axios';
import Markers from './markers';
import Details from './details';

export default class Map_Component extends Component {
  state = {
    location: [[12.971599, 77.594566]],
    zoom: 5,
    position: [22.572645, 88.363892],
    selectedMarker: []
  }

  componentDidMount() {
    axios.get('/db').then((response) => {
      var placesKeyArr = Object.keys(response.data);
      var locations = [];
      for (var i = 1; i < placesKeyArr.length; i++) {
        var positionTest = response.data[placesKeyArr[i]].placePosition;
        locations.push(positionTest);
      }
      this.setState({
        location: locations
      });
    });
  }



  render() {
    const MarkersData = this.state.location.map((elem) => {
      return (
        <Markers
          onSelectedMarker={
            singleMarker => this.setState(
              {
                selectedMarker: singleMarker,
                zoom: 10,
                position: singleMarker
              })}
          pos={elem}
        />)
    })

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <Map className="map-box" center={this.state.position} zoom={this.state.zoom}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {MarkersData}

            </Map>
          </div>
          <div className="col-md-4">
            <Details selectedMarker={this.state.selectedMarker} />
          </div>
        </div>
      </div>
    );
  }
}
