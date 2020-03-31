import { registerBlockType } from "@wordpress/blocks";

import edit from "./edit";

const attributes = {
    people: {
        type: "array",
        default: []
    },
    regions: {
        type: "array",
        default: []
    },
    selectedFeaturedPersonId: {
        type: "integer",
        default: 0
    },
    quote: {
        type: "string",
        default: "My colleagues are experienced and are completely open to sharing their knowledge."
    }
};

registerBlockType("ldc/mop-people-listing", {
    title: "People Listing with Filter",
    description: "Meet Our People - People Listing Block",
    category: "ldc-blocks",
    icon: "laptop",
    keywords: ["filter", "people", "listing"],

    attributes,

    edit,

    save: ({ attributes }) => {
        const { selectedFeaturedPersonId, quote } = attributes;
        return (
            <div
                data-featured-person-id={selectedFeaturedPersonId}
                data-featured-person-quote={quote}
            />
        );
    }
});
