import { Component } from "@wordpress/element";
import { Button, PanelBody } from "@wordpress/components";
import { RichText, MediaUpload, InspectorControls } from "@wordpress/editor";

class HeroFullWidth extends Component {
    onChangeSubline = subline => {
        this.props.setAttributes({ subline });
    };

    onChangeHeadline = headline => {
        this.props.setAttributes({ headline });
    };

    onImageSelect = imageObject => {
        this.props.setAttributes({
            bgImage: imageObject.sizes.full.url
        });
    };

    render() {
        const { className, attributes } = this.props;
        const { subline, headline, bgImage } = attributes;

        return [
            <InspectorControls>
                <PanelBody title="Hero Settings">
                    <p style={{ marginBottom: 5 }}>Select a background image:</p>
                    <MediaUpload
                        onSelect={this.onImageSelect}
                        type="image"
                        value={bgImage}
                        render={({ open }) => (
                            <Button isDefault onClick={open}>
                                Upload Image
                            </Button>
                        )}
                    />
                </PanelBody>
            </InspectorControls>,

            <div className={className} style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="wp-block-ldc-mop-hero-full-width__content">
                    <RichText
                        className={"wp-block-ldc-mop-hero-full-width__subline"}
                        onChange={this.onChangeSubline}
                        value={subline}
                        placeholder={"Subline"}
                        formattingControls={[]}
                    />

                    <RichText
                        className={"wp-block-ldc-mop-hero-full-width__headline"}
                        onChange={this.onChangeHeadline}
                        value={headline}
                        placeholder={"Headline"}
                        formattingControls={[]}
                    />
                </div>
            </div>
        ];
    }
}

export default HeroFullWidth;
