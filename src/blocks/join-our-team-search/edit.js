import { Component } from "@wordpress/element";
import { Button, PanelBody, PanelRow } from "@wordpress/components";
import { RichText, InspectorControls, MediaUpload } from "@wordpress/editor";

class JoinOurTeamSearchEdit extends Component {
    onImageSelect = imageObject => {
        this.props.setAttributes({
            bgImage: imageObject.url
        });
    };

    render() {
        const { className, attributes } = this.props;
        const { title, categoryLabel, locationLabel, bgImage } = attributes;

        return [
            <InspectorControls>
                <PanelBody title="Join Our Team Search Settings">
                    <PanelRow className="d-block">
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
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,

            <div className={className} style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="container">
                    <div className="join-our-team-search">
                        <RichText
                            tagName="h2"
                            className={"join-our-team-search__title"}
                            value={title}
                            onChange={title => this.props.setAttributes({ title })}
                        />
                        <div className="join-our-team-search__fields">
                            <div className="join-our-team-search__fields-select">
                                <RichText
                                    tagName="label"
                                    value={categoryLabel}
                                    onChange={categoryLabel =>
                                        this.props.setAttributes({ categoryLabel })
                                    }
                                />
                            </div>
                            <div className="join-our-team-search__fields-select">
                                <RichText
                                    tagName="label"
                                    value={locationLabel}
                                    onChange={locationLabel =>
                                        this.props.setAttributes({ locationLabel })
                                    }
                                />
                            </div>
                            <div className="join-our-team-search__button-container">
                                <a href="#" className="ldc-button ldc-button--green">
                                    Search
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ];
    }
}

export default JoinOurTeamSearchEdit;
