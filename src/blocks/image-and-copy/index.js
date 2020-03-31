import { registerBlockType } from "@wordpress/blocks";
import { RichText } from "@wordpress/editor";
import { Button } from "@wordpress/components";

import edit from "./edit";

const attributes = {
    copy: {
        type: "string",
        source: "html",
        selector: "p"
    },
    headline: {
        type: "string",
        source: "html",
        selector: "h2",
        default: "Diversity matters, across all corners of Our business"
    },
    image: {
        type: "string",
        default: "http://placehold.it/1920x750"
    },
    btnLabel: {
        type: "string",
        default: "Diversity at LDC"
    },
    btnUrl: {
        type: "string",
        default: "#"
    }
};

registerBlockType("ldc/mop-image-and-copy", {
    title: "Image and Copy Two Cols",
    description: "Meet Our People - Image and Copy Two Cols Block",
    category: "ldc-blocks",
    icon: "laptop",
    keywords: ["image", "copy", "image and copy"],

    attributes,

    edit,

    save: ({ attributes }) => {
        const { copy, headline, btnLabel, btnUrl, image } = attributes;
        return (
            <div>
                <div className="image-and-copy-block">
                    <div
                        className="image-and-copy-block__image-container"
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <div className="image-and-copy-block__content">
                        <h2 className="image-and-copy-block__content-title">{headline}</h2>
                        <div className="image-and-copy-block__content-copy">
                            <RichText.Content tagName="p" value={copy} multiline="p" />
                        </div>
                        <a href={btnUrl} className="ldc-button ldc-button--green">
                            {btnLabel}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
