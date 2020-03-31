const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { RichText } = wp.blockEditor;

import edit from "./edit";

const attributes = {
    content: {
        type: "string",
        default: "Write headline..."
    }
};

registerBlockType("ldc/key-figures-introduction", {
    title: "Key Figures Introduction",
    description: "Key Figures Introduction block",
    icon: "laptop",
    category: "ldc-blocks",
    keywords: [],

    attributes,

    edit,

    save: ({ attributes }) => {
        const className = getBlockDefaultClassName("ldc/key-figures-introduction"); // For BEM classes
        const { content } = attributes;

        return (
            <div className={`container-fluid ${className}`}>
                <div className={`container`}>
                    <div className={`row`}>
                        <RichText.Content className={`${className}__content`} tagName="h2" value={content} />
                    </div>
                </div>
            </div>
        );
    }
});
