import { Component } from "@wordpress/element";
import { PanelBody, PanelRow, TextareaControl } from "@wordpress/components";
const { InspectorControls } = wp.editor;

class whatWeDoComponent extends Component {
    
    render() {

        const { text_up, text_down } = this.props.attributes
        const { setAttributes } = this.props

        const handleChangeUp = (value) => {
            const newVal = value
            setAttributes({ text_up: newVal })
        }

        const handleChangeDown = (value) => {
            const newVal = value
            setAttributes({ text_down: newVal })
        }

        return [
            <InspectorControls>
                <PanelBody title="Settings Sectors Block">
                    <PanelRow className="d-block">

                        <p>Write Text Top</p>
                        <TextareaControl
                            onChange={value => handleChangeUp(value)}
                            value={text_up}
                            placeholder={"Write headline..."}
                        />

                        <p>Write Text Down</p>
                        <TextareaControl
                            onChange={value => handleChangeDown(value)}
                            value={text_down}
                            placeholder={"Write headline..."}
                        />

                    </PanelRow>
                </PanelBody>
            </InspectorControls>,

            <div><b>Text & Product Image Menu</b></div>
        ]

    }

}

export default whatWeDoComponent
