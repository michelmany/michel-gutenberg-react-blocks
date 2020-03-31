import { Component } from "@wordpress/element";
import { PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/editor";

class socialWall extends Component {
    
    handleChange = (value) => {
        this.props.setAttributes({ shortcode: value });
    };

    render() {

        const { attributes } = this.props;
        const { shortcode } = attributes;

        return [
            <InspectorControls>
                <PanelBody title="Social Wall Settings">
                    <PanelRow className="d-block">
                        <TextControl
                            label="Add shortcode" 
                            value={ shortcode }
                            onChange={value => this.handleChange(value)}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,

            <div>
                <b>Social Wall Block</b>
            </div>
        ]

    }

}

export default socialWall