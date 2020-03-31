const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
import edit from "./edit";

const attributes = {
    filters: {
        type: "array",
        default: [{ name: "All", foldersIds: [] }]
    }
};

registerBlockType("ldc/image-and-video-library", {
    title: "Image and Video Library",
    description: "Image and Video Library Block",
    icon: "format-image",
    category: "ldc-blocks",
    keywords: ["image", "video", "image library", "library"],

    attributes,

    edit,

    save: ({ attributes }) => {
        const { filters } = attributes;
        return (
            <div data-filters={JSON.stringify(filters)}>
                {filters.map(filter => (
                    <span
                        class="filters-data d-none"
                        data-name={filter.name}
                        data-folders-ids={`[${filter.foldersIds}]`}
                    ></span>
                ))}
            </div>
        );
    }
});
