import mapStyle from "./ldc-map-style.json";
import { asyncWrapper, MarkerClusterer, Marker, BaiduMap, point } from 'react-baidu-maps';
let LDCMap = asyncWrapper(BaiduMap);

const onMapLoad = map => {};

const { useEffect, useState, useRef } = wp.element;

// Tried to register but not able to at:
// https://passport.baidu.com/v2/?reg&regType=1&overseas=1
// Found a key on a Github gist, temporary use only (working on localhost)
const apiKey = "QdWrlUoXGnfzLfn45LLkbZDp";

const mapCenter = {
    lat: 38.84981727671268,
    lng: 0
};

const LocationBaiduMap = props => {

    const [zoom, setZoom ] = useState(props.zoom);
    const [center, setCenter ] = useState(mapCenter);
    const instance = useRef(null);
    const cluster = useRef(null);

    useEffect(() => {
      if( cluster.current && props.locations.length === 0 ){
        cluster.current.clearMarkers();
      }
      setZoom(zoom)
      setCenter(mapCenter)
    }, [ props.locations ])

    useEffect(() => {
      if( props.focusedMarker && props.focusedMarker.lat && props.focusedMarker.lng ){
        setZoom( 15 )
        setCenter({
          lat: parseFloat(props.focusedMarker.lat),
          lng: parseFloat(props.focusedMarker.lng),
        })
      }
    }, [ props.focusedMarker ] )

    return (
        <>
          <LDCMap
            zoom={zoom}
            center={center}
            mapStyle={mapStyle}
            onLoad={onMapLoad}
            ref={(ref) => instance.current = ref }
            mapUrl={`https://api.map.baidu.com/api?v=3.0&ak=${apiKey}`}
            loadingElement={<div></div>}
            mapContainer={<div style={{ height: '100%' }} />}
          >
            <MarkerClusterer ref={(ref) => cluster.current = ref }>{
              props.locations.map( location => {
                  return <Marker position={{
                    lat: parseFloat(location.acf.location_geolocation.lat),
                    lng: parseFloat(location.acf.location_geolocation.lng) }}
                    onClick={( event ) => {
                      setZoom( 15 )
                      setCenter(event.point)
                    }}
                  />
              })}
            </MarkerClusterer>
          </LDCMap>
        </>
    );
};

export default LocationBaiduMap;
