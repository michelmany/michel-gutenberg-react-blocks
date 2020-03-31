const { Component, Fragment } = wp.element;
import { RadioControl, PanelBody } from '@wordpress/components';
import LocationGoogleMap from "./components/LocationGoogleMap";
import LocationSearchMapSidebar from "./components/LocationSearchMapSidebar";

class LocationSearchMapEdit extends Component {
    onFilterByRegion = selectedRegionId => {
        this.props.setAttributes({ selectedRegionId });
    };

    render() {
        
        const { className, attributes, setAttributes } = this.props;
        const { selectedRegionId, radioMaps } = attributes;

        return (
            <Fragment>
                <PanelBody title="Map Settings">
                    <RadioControl
                        label="Select map type:"
                        selected={ radioMaps }
                        options={ [
                            { label: 'Google', value: 'google' },
                            { label: 'Baidu', value: 'baidu' },
                        ] }
                        onChange={ radioMaps => setAttributes({radioMaps}) }
                    />
                </PanelBody>
                <div className={`${className} m--cards-view`}>
                    <div className={`${className}__map`}>
                        <p style={{color: '#fff', padding: 20}}>Map is displayed here.</p>
                    </div>

                    <LocationSearchMapSidebar
                        getSelectedRegionId={this.onFilterByRegion}
                        selectedRegionId={selectedRegionId}
                        changeLocations={() => {}}
                    />
                    
                </div>
            </Fragment>
        );
    }
}

export default LocationSearchMapEdit;
