import { registerBlockType } from "@wordpress/blocks";

import edit from "./edit";

const attributes = {
    title: {
        type: "string",
        selector: "h2",
        default: "Join our talented team"
    },
    categoryLabel: {
        type: "string",
        selector: "label",
        default: "I'm interested in joining"
    },
    locationLabel: {
        type: "string",
        selector: "label",
        default: "in"
    },
    selectedCategory: {
        type: "string"
    },
    selectedLocation: {
        type: "string"
    },
    bgImage: {
        type: "string"
    }
};

registerBlockType("ldc/mop-join-our-team-search", {
    title: "Join our team search CTA",
    description: "Meet Our People - Join our team search CTA Block",
    category: "ldc-blocks",
    icon: "laptop",
    keywords: ["filter", "people", "listing", "search", "cta", "join team"],

    attributes,

    edit,

    save() {
        // Rendering in PHP
        return null;
    }
});
