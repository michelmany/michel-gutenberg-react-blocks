import { GoogleMap, LoadScript, Data, Marker, MarkerClusterer } from "@react-google-maps/api";
import mapStyle from "./ldc-map-style.json";

const { useEffect, useState } = wp.element;

const apiKey = "AIzaSyDBVV6e4Afldka51vqFgaipCf08YOP4XWs";

const onMapLoad = map => {
    console.log("map.data: ", map.data);
};

const onCenterMap = map => {
    console.log("center mapa: ", map);
};

const onDataLoad = data => {
    console.log("data: ", data);
};

const onClick = (...args) => {
    console.log("onClick args: ", args[0].latLng.lat(), " : ", args[0].latLng.lng());
};

const mapCenter = {
    lat: 38.84981727671268,
    lng: 0
};

let markers = {};
let mapInstance;

const LocationGoogleMap = props => {

    const [zoom, setZoom ] = useState(props.zoom);
    const [center, setCenter ] = useState(mapCenter);

    useEffect(() => {
      setZoom(3)
      setCenter(props.centerFrom || mapCenter)
    }, [ props.locations ])

    useEffect(() => {
      setZoom(3)
      if( props.centerFrom ){
        setTimeout(() => {
          setCenter({
            lat: props.centerFrom.lat,
            lng: props.centerFrom.lng
          })
        }, 500 )
      }
    }, [ props.centerFrom, props.locations ])

    useEffect(() => {
      if( props.focusedMarker && props.focusedMarker.lat && props.focusedMarker.lng ){
        setZoom(15)
        setCenter({
          lat: parseFloat(props.focusedMarker.lat),
          lng: parseFloat(props.focusedMarker.lng),
        })
      }
    }, [ props.focusedMarker ] )

    const setMarkerRef = ( element, location ) => {
      if( element && element.state && element.state.marker ){
        markers[ location.id ] = {
          location: location,
          marker: element.state.marker
        }
      }
    }

    const refMap = ( element ) => {
      if( element && element.state && element.state.map ){
        mapInstance = element.state.map;
      }
    }

    const highlightArea = () => {
      let found = []
      Object.keys( markers ).forEach(( id ) => {
        const markerItem = markers[id]
        if( mapInstance.getBounds().contains(markerItem.marker.getPosition()) ){
          found.push( markerItem.location )
        }
      })
      props.highlightArea( found )
    }

    return (
        <>
            <LoadScript id="script-loader" googleMapsApiKey={apiKey}>
                <GoogleMap
                    id={props.id}
                    zoom={zoom}
                    center={center}
                    onClick={onClick}
                    onLoad={onMapLoad}
                    options={{ styles: mapStyle }}
                    ref={ refMap }
                    onCenterChanged={() => {onCenterMap(); props.clearFocusedMarker() } }
                    onDragEnd={highlightArea}
                    onZoomChanged={highlightArea}
                >
                  <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                    onDataLoad={() => console.log('loaded clusters') }
                  >{clusterer =>
                    props.locations.map( location => {
                      return location.acf.location_geolocation ?
                      <Marker clusterer={clusterer} position={{
                        lat: parseFloat(location.acf.location_geolocation.lat),
                        lng: parseFloat(location.acf.location_geolocation.lng) }}
                        onClick={( event ) => {
                          setZoom( 15 )
                          setCenter(event.latLng)
                          if( props.highlightLocation ){
                            props.highlightLocation( location )
                          }
                        }}
                        ref={ ( element ) => setMarkerRef( element, location ) }
                      /> : null
                    })
                  }
                  </MarkerClusterer>
                </GoogleMap>
            </LoadScript>
        </>
    );
};

export default LocationGoogleMap;


