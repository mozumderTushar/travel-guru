import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { Component } from 'react'
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

class Map extends Component {
  state = { 
    viewport :{
      latitude: 0,
      longitude: 0,
      zoom: 1
    },
    searchResultLayer: null
  }

  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
 
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    })
  }

    render(){
      const { viewport, searchResultLayer} = this.state
      return (
        <div style={{ height: '100vh'}}>
          <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder', marginTop: '50px' }}>Use the search bar  to find your location</h1>
          <MapGL 
            ref={this.mapRef}
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            width="100%"
            height="90%"
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={'pk.eyJ1IjoidHVzaGFyMDAyIiwiYSI6ImNrZnBoazFxMTBsbGQycWxoYnVrZHMyZ2cifQ.WfPFqTgCEihSik69L3Bmbg'}
            >
              <Geocoder 
                mapRef={this.mapRef}
                onResult={this.handleOnResult}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={'pk.eyJ1IjoidHVzaGFyMDAyIiwiYSI6ImNrZnBoazFxMTBsbGQycWxoYnVrZHMyZ2cifQ.WfPFqTgCEihSik69L3Bmbg'}
                position='top-left'
              />
            </MapGL>
            <DeckGL {...viewport} layers={[searchResultLayer]} />
        </div>
      )
    }
}

export default Map;