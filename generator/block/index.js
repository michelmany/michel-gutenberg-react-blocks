const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
import edit from "./edit";

const attributes = {};

registerBlockType("__namespace__/__block__", {
    title: "__block__(noCase)",
    description: "__description__(noCase)",
    icon: "__icon__", // Choose an icon here: https://developer.wordpress.org/resource/dashicons/
    category: "__category__",
    keywords: [],

    attributes,

    edit,

    save: () => {
        // const className = getBlockDefaultClassName('__namespace__/__block__'); // For BEM classes
        // const {  } = props.attributes;

        return <div />;
    }
});
