const { render, useState, useEffect } = wp.element;
const { getBlockDefaultClassName } = wp.blocks;

import axios from "axios";
import SpinLoadingIcon from "../../js/components/SpinLoadingIcon";
import LibraryItems from "./components/LibraryItems.jsx";
import LibraryFilterNav from "./components/LibraryFilterNav.jsx";

const className = getBlockDefaultClassName("ldc/image-and-video-library");
const block = document.querySelector(`.${className}`);

const filters = block ? JSON.parse(block.dataset.filters) : [];

const ImageAndVideoFrontend = () => {
    const [activeFilterId, setActiveFilterId] = useState([]);
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
                    nt_wmc_folder: filters[0].foldersIds, //get all
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

    const hasItems = () => {
        return filteredItems.length > 0;
    };

    const hasMorePages = () => {
        return currentPage < pagesQty;
    };

    return (
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
    );
};

if (block) render(<ImageAndVideoFrontend />, block);
