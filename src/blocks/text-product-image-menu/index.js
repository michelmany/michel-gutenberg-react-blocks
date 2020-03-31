const { registerBlockType } = wp.blocks;
import edit from "./edit";

const attributes = {
    text_up: {
        type: "string",
        default: "Text Up"
    },
    text_down: {
        type: "string",
        default: "Text Down"
    },
};

registerBlockType("ldc/text-product-image-menu", {
    title: "Text & Product Image Menu",
    description: "Text & Product Image Menu",
    icon: "laptop", // Choose an icon here: https://developer.wordpress.org/resource/dashicons/
    category: "ldc-blocks",
    keywords: ["Text & Product Image Menu"],

    attributes,

    edit,

    save: ({attributes}) => {
        // const className = getBlockDefaultClassName('ldc/what-we-do'); // For BEM classes
        const { text_up, text_down } = attributes;

        return (
            <div className="row block-what-we-do">
                    <div className="col-md-12 block-what-we-do__mobile-sidebar"></div>
                    <div className="col-lg-3 col-md-12 block-what-we-do__sidebar">
                    </div>
                    <div className="col-lg-9 col-md-12 block-what-we-do__content">
                        <div className="block-what-we-do__head">
                            <h3>{text_up}</h3>
                            <p>{text_down}</p>
                        </div>
                    
                        <div className="row block-what-we-do__categories">
                        </div>
                    
                    </div>
                </div>
        );
    }
});
