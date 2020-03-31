import { registerBlockType } from "@wordpress/blocks";

import edit from "./edit";

const attributes = {
    people: {
        type: "array",
        default: []
    },
    categories: {
        type: "array",
        default: []
    },
    selectedFeaturedPersonId: {
        type: "integer",
        default: 0
    }
};

registerBlockType("ldc/leadership-menu-ctas-tabs", {
    title: "Leadership Menu With CTAs & Tabs",
    description: "Leadership Menu With CTAs & Tabs",
    category: "ldc-blocks",
    icon: "laptop",
    keywords: ["Leadership Menu With CTAs & Tabs"],

    attributes,

    edit,

    save: ({ attributes }) => {
        const { selectedFeaturedPersonId } = attributes;
        return <div data-featured-person-id={selectedFeaturedPersonId} />;
    }
});
