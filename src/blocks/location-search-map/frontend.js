const { Component, Fragment, render } = wp.element;
import LocationGoogleMap from "./components/LocationGoogleMap";
import LocationBaiduMap from "./components/LocationBaiduMap";
import LocationSearchMapSidebar from "./components/LocationSearchMapSidebar";

// get map type
const getDataMap = document.querySelector('.wp-block-ldc-location-search-map');
let getMapType = '';
if(getDataMap) { getMapType = getDataMap.getAttribute('data-map') }


class LocationSearchMapFrontend extends Component {
    state = {
        selectedRegionId: 0,
        currentView: 'map',
        locations: [],
        highlightArea: null,
        focusedMarker: null
    };

    onFilterByRegion = selectedRegionId => {
        this.setState({
          selectedRegionId ,
          focusedMarker: null
        });
    };

    onLocationsChanged = locations => {
      // This clears markers initially which solves Baidu maps issues
      this.setState({
        locations: [],
        highlightLocations: [],
        highlightArea: null,
        focusedMarker: null
      }, () => {
        const loc = [...locations.filter( each => each.acf.location_geolocation ).sort((a, b) => {
          return a.date > b.date ? 1 : -1;
        })]
        this.setState({
          locations: loc,
          centerFrom: this.getCenterFrom( loc )
        })
      });
    };

    setFocusedMarker = geolocation => {
      this.setState({
        focusedMarker: geolocation,
        centerFrom: null
      })
    }

    highlightLocation = highlightLocation => {
      this.setState({
        highlightLocations: [highlightLocation],
        centerFrom: null
      })
    }

    highlightArea = locations => {
      this.setState({
        highlightArea: locations,
        centerFrom: null
      })
    }

    getCenterFrom = ( locations ) => {
      const firstLocation = locations[ 0 ]
      if( firstLocation && firstLocation.acf && firstLocation.acf.location_geolocation ){
        const { lng, lat } = firstLocation.acf.location_geolocation
        return {
          lat,
          lng,
          id: firstLocation.id
        }
      } else {
        return null
      }
    }

    render() {
        return (
            <Fragment>
                <div className={"wp-block-ldc-location-search-map__map"}>
                    {  getMapType == 'baidu' ?
                      <LocationBaiduMap
                        id="main-google-map"
                        zoom={1}
                        locations={ this.state.locations }
                        focusedMarker={ this.state.focusedMarker }
                        clearFocusedMarker={ () => this.setFocusedMarker( null ) }
                      /> :
                      <LocationGoogleMap
                        id="main-google-map"
                        zoom={4}
                        locations={ this.state.locations }
                        focusedMarker={ this.state.focusedMarker }
                        clearFocusedMarker={ () => this.setFocusedMarker( null ) }
                        highlightLocation={ ( location ) => this.highlightLocation( location ) }
                        highlightArea={ ( locations ) => { this.highlightArea(locations); }}
                        centerFrom={ this.state.centerFrom }
                      />
                    }
                </div>

                <LocationSearchMapSidebar
                    getSelectedRegionId={this.onFilterByRegion}
                    selectedRegionId={this.state.selectedRegionId}
                    currentView={this.state.currentView}
                    changeLocations={ this.onLocationsChanged }
                    setFocusedMarker={ !this.state.highlightArea ? this.setFocusedMarker : null }
                    highlightLocations= { this.state.highlightLocations || [] }
                    highlightArea={ this.state.highlightArea }
                />
            </Fragment>
        );
    }
}

const locationSearchMapBlock = document.querySelector(".wp-block-ldc-location-search-map");
if (locationSearchMapBlock) render(<LocationSearchMapFrontend />, locationSearchMapBlock);
