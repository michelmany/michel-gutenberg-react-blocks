import { registerBlockType, getBlockDefaultClassName } from "@wordpress/blocks";
import edit from "./edit";

const attributes = {
    selectedRegionId: {
        type: "string",
        default: 0
    },
    radioMaps: {
        type: 'string',
        default: 'google'
    }
};

registerBlockType("ldc/location-search-map", {
    title: "Location Search and Map",
    description: "Location Search and Map Block",
    category: "ldc-blocks",
    icon: "location",
    keywords: ["location search", "map", "search"],

    attributes,

    edit,

    save: ({attributes}) => {
        const className = getBlockDefaultClassName("ldc/location-search-map");
        const { radioMaps } = attributes;
        return <div className="m--cards-view" data-map={radioMaps}></div>;
    }
});
