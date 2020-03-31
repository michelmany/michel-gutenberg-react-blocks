const { Fragment, render, useState, useEffect } = wp.element;

import LeadershipPeopleCards from "./components/LeadershipPeopleCards";
import SpinLoadingIcon from "../../js/components/SpinLoadingIcon";

const className = "wp-block-ldc-leadership-menu-ctas-tabs";
const block = document.querySelector(`.${className}`);
const featuredPersonId = block ? parseInt(block.dataset.featuredPersonId) : 0;
const peopleApiUrl = "/wp-json/wp/v2/leadership?orderby=menu_order&order=asc&_embed&per_page=100";
const categoriesApiUrl =
    "/wp-json/wp/v2/leadership-category?filter[orderby]=name&order=desc&per_page=2";

const LeadershipTabbedContent = () => {
    const [people, setPeople] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchPeople = () => {
        wp.apiFetch({
            url: peopleApiUrl
        }).then(response => {
            setPeople(response);
        });
    };

    const fetchCategories = () => {
        wp.apiFetch({
            url: categoriesApiUrl
        }).then(response => {
            setCategories(response);
        });
    };

    useEffect(() => {
        fetchPeople();
        fetchCategories();
    }, []);

    return (
        <Fragment>
            {!_.isEmpty(people) && !_.isEmpty(categories) ? (
                <LeadershipPeopleCards
                    className={className}
                    featuredPersonId={featuredPersonId}
                    categories={categories}
                    people={people}
                />
            ) : (
                <SpinLoadingIcon />
            )}
        </Fragment>
    );
};

if (block) render(<LeadershipTabbedContent />, block);
