import { Component } from "@wordpress/element";
import { Button, PanelBody, PanelRow, TextControl } from "@wordpress/components";
import { RichText, MediaUpload, InspectorControls } from "@wordpress/editor";

class ImageAndCopy extends Component {
    onImageSelect = imageObject => {
        this.props.setAttributes({
            image: imageObject.sizes.full.url
        });
    };

    render() {
        const { className, attributes } = this.props;
        const { copy, headline, image, btnLabel, btnUrl } = attributes;

        return [
            <InspectorControls>
                <PanelBody title="Image and Copy Settings">
                    <PanelRow>
                        <MediaUpload
                            onSelect={this.onImageSelect}
                            type="image"
                            value={image}
                            render={({ open }) => (
                                <Button isDefault onClick={open}>
                                    Upload Image
                                </Button>
                            )}
                        />
                    </PanelRow>
                    <PanelRow className="d-block">
                        <TextControl
                            label="CTA Button Link Url"
                            value={btnUrl}
                            onChange={btnUrl => this.props.setAttributes({ btnUrl })}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,

            <div className={className}>
                <div className="image-and-copy-block">
                    <div
                        className="image-and-copy-block__image-container"
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <div className="image-and-copy-block__content">
                        <RichText
                            className={"image-and-copy-block__content-title"}
                            onChange={headline => this.props.setAttributes({ headline })}
                            value={headline}
                            placeholder={"Write Headline"}
                            formattingControls={[]}
                        />
                        <RichText
                            className={"image-and-copy-block__content-copy"}
                            onChange={copy => this.props.setAttributes({ copy })}
                            value={copy}
                            placeholder={"Write Copy"}
                            formattingControls={[]}
                        />
                        <button className="ldc-button ldc-button--green">
                            <RichText
                                onChange={btnLabel => this.props.setAttributes({ btnLabel })}
                                value={btnLabel}
                                placeholder="Button label"
                            />
                        </button>
                    </div>
                </div>
            </div>
        ];
    }
}

export default ImageAndCopy;
