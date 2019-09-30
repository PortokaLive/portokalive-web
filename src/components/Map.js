import React from 'react'
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '90%',
    marginTop:'70px'
  };

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          stores: [{latitude: 1.2966012, longitude: 103.7874421},
                  {latitude: 1.3117862, longitude: 103.87222633}]
        }
      }
    
      displayMarkers = () => {
        return this.state.stores.map((store, index) => {
          return <Marker key={index} id={index} position={{
           lat: store.latitude,
           lng: store.longitude
         }}
         onClick={() =>  this.props.history.push(`/live`)} />
        })
      }
    

    render(){

    return(
        <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        //disableDefaultUI={true}
        scrollwheel={false}
        //navigationControl={false}
        //mapTypeControl={false}
        //scaleControl={false}
        draggable={false}
        //zoomControl={false}
        initialCenter={{ lat: 	process.env.REACT_APP_SG_LAT, lng: process.env.REACT_APP_SG_LNG}}
      >
        {this.displayMarkers()}
      </Map> 
    )
}
}


export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GMAP_API_KEY
  })(MapContainer);