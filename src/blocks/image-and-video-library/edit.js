const { Fragment, useState, useEffect } = wp.element;
const { SelectControl, PanelBody, Button, IconButton, TextControl } = wp.components;
const { InspectorControls } = wp.blockEditor;

import axios from "axios";
import SpinLoadingIcon from "../../js/components/SpinLoadingIcon";
import LibraryItems from "./components/LibraryItems.jsx";
import LibraryFilterNav from "./components/LibraryFilterNav.jsx";

const ImageAndVideoEdit = ({ className, attributes, setAttributes }) => {
    const { filters } = attributes;
    const [activeFilterId, setActiveFilterId] = useState([]);
    const [folders, setFolders] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesQty, setPagesQty] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMoreItems, setIsLoadingMoreItems] = useState(false);

    const mediaApiUrl = "/wp-json/wp/v2/media/";

    const fetchMedia = () => {
        setIsLoading(true);

        axios
            .get(mediaApiUrl, {
                params: {
                    nt_wmc_folder: filters[0].foldersIds,
                    per_page: 12,
                    page: currentPage
                }
            })
            .then(function(res) {
                setFilteredItems(res.data);
                setIsLoading(false);
                makePagination(res);
            });
    };

    const fetchFolders = () => {
        axios.get("/wp-json/wp/v2/nt_wmc_folder/").then(function(res) {
            setFolders(res.data);

            const foldersIds = [];

            folders.map(folder => {
                foldersIds.push(folder.id);
            });

            const newFilters = [...filters];
            newFilters[0][foldersIds] = foldersIds;
            setAttributes({ filters: newFilters });
        });
    };

    const filterMediaBy = filterId => {
        setIsLoading(true);
        setActiveFilterId(filterId);
        setCurrentPage(1);

        axios
            .get(mediaApiUrl, {
                params: {
                    nt_wmc_folder: filterId,
                    per_page: 12,
                    page: 1
                }
            })
            .then(function(res) {
                setIsLoading(false);
                setFilteredItems(res.data);
                makePagination(res);
            });
    };

    useEffect(() => {
        fetchMedia();
        fetchFolders();
    }, []);

    const onLoadMoreItems = () => {
        setIsLoadingMoreItems(true);
        const nextPage = currentPage + 1;

        axios
            .get(mediaApiUrl, {
                params: {
                    nt_wmc_folder: activeFilterId,
                    per_page: 12,
                    page: nextPage
                }
            })
            .then(function(res) {
                const newItems = [...filteredItems, ...res.data];
                setIsLoadingMoreItems(false);
                setFilteredItems(newItems);
                makePagination(res);
                setCurrentPage(nextPage);
            });
    };

    const makePagination = data => {
        const totalPages = data.headers && data.headers["x-wp-totalpages"];
        setPagesQty(totalPages);
    };

    const handleFilterChange = (key, value, index) => {
        const newValue = [...filters];
        newValue[index][key] = value;
        setAttributes({ filters: newValue });
    };

    const handleAddFilterItem = () => {
        const newValue = [...filters];
        newValue.push({
            name: "Filter name",
            foldersIds: []
        });
        setAttributes({ filters: newValue });
    };

    const handleRemoveFilterItem = index => {
        const newValue = [...filters];
        newValue.splice(index, 1);
        setAttributes({ filters: newValue });
    };

    const hasItems = () => {
        return filteredItems.length > 0;
    };

    const hasMorePages = () => {
        return currentPage < pagesQty;
    };

    // options for SelectControl
    const options = [];

    if (folders.length) {
        options.push({ value: null, label: "Select folders", disabled: true });
        folders.map(folder => {
            options.push({ value: folder.id, label: folder.name });
        });
    } else {
        options.push({ value: 0, label: "Loading..." });
    }

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title="Library Filter Options">
                    {filters.map((filter, index) => {
                        console.log(filter.foldersIds);
                        return (
                            <Fragment>
                                <div className="ldc-inspector-control__content" key={index}>
                                    <TextControl
                                        className="ldc-inspector-control__text-field"
                                        placeholder="Filter item name"
                                        value={filter.name}
                                        onChange={value => handleFilterChange("name", value, index)}
                                    />
                                    <IconButton
                                        className="ldc-inspector-control__icon-button"
                                        icon="no-alt"
                                        label="Delete filter"
                                        onClick={() => handleRemoveFilterItem(index)}
                                    />
                                </div>

                                <div className="ldc-inspector-control__content">
                                    <SelectControl
                                        multiple
                                        label="Relational folder"
                                        value={filter.foldersIds}
                                        onChange={value => handleFilterChange("foldersIds", value, index)}
                                        options={options}
                                    />
                                </div>
                                <hr />
                            </Fragment>
                        );
                    })}

                    <Button isDefault isLarge onClick={() => handleAddFilterItem()}>
                        Add filter item
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div className={className}>
                <div className="container">
                    <LibraryFilterNav filters={filters} className={className} filterMediaBy={filterMediaBy} />

                    {!isLoading && hasItems() && <LibraryItems items={filteredItems} className={className} />}

                    {!isLoadingMoreItems && !isLoading && hasItems() && hasMorePages() && (
                        <div className={`${className}__loadmore text-center`}>
                            <button className="ldc-button ldc-button--green" onClick={onLoadMoreItems}>
                                Load more media
                            </button>
                        </div>
                    )}

                    {(isLoading || isLoadingMoreItems) && <SpinLoadingIcon />}
                </div>
            </div>
        </Fragment>
    );
};

export default ImageAndVideoEdit;
