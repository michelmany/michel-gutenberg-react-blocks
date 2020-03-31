const { Fragment, render, useState, useEffect } = wp.element;

import PeopleListingCards from "./components/PeopleListingCards";
import SpinLoadingIcon from "../../js/components/SpinLoadingIcon";

const className = "wp-block-ldc-mop-people-listing";
const block = document.querySelector(`.${className}`);
let featuredPersonId = block ? parseInt(block.dataset.featuredPersonId) : 0;
const featuredPersonQuote = block ? block.dataset.featuredPersonQuote : null;

const PeopleListingFrontend = () => {
    const [people, setPeople] = useState([]);
    const [regions, setRegions] = useState([]);
    const [countPeople, setcountPeople] = useState(true);
    const [featuredPerson, setfeaturedPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [numberPerson, setnumberPerson] = useState(9);
    const [regionselectedId, setregionselectedId] = useState();

    const fetchFeaturedPerson = () => {
        if (featuredPersonId != 0) {
            wp.apiFetch({
                url: `/wp-json/wp/v2/meet-our-people/${featuredPersonId}`
            }).then(response => {
                setfeaturedPerson(response);
            });
        }
    };

    const fetchPeople = (personNumber, regionId) => {
        
        if (regionId && parseInt(regionId) !== 0) {
            featuredPersonId = 0;
        } else {
            featuredPersonId = block ? parseInt(block.dataset.featuredPersonId) : 0;
        }
        
        let query = `per_page=${numberPerson}&exclude[]=${featuredPersonId}`;
        
        setLoading(true);

        if (personNumber && personNumber > 9) {
            query = `per_page=${personNumber}&exclude[]=${featuredPersonId}`;
        }

        if (regionId && parseInt(regionId) !== 0) {
            setregionselectedId(regionId)
            query = `${query}&region=${regionId}`;
        }

        wp.apiFetch({
            url: `/wp-json/wp/v2/meet-our-people?${query}`
        }).then(response => {
            setLoading(false);
            setPeople(response);

            if(response.length < 1) {
                setcountPeople(false)
            } else {
                setcountPeople(true)
            }

        });

    };

    const fetchPeopleLoadMore = (personNumber, regionId) => {
        
        if (regionId && parseInt(regionId) !== 0) {
            featuredPersonId = 0;
        } else {
            featuredPersonId = block ? parseInt(block.dataset.featuredPersonId) : 0;
        }
        
        let query = `per_page=${numberPerson}&exclude[]=${featuredPersonId}`;
        
        setLoadingMore(true);

        if (personNumber && personNumber > 9) {
            query = `per_page=${personNumber}&exclude[]=${featuredPersonId}`;
        }

        if (regionId && parseInt(regionId) !== 0) {
            setregionselectedId(regionId)
            query = `${query}&region=${regionId}`;
        }

        wp.apiFetch({
            url: `/wp-json/wp/v2/meet-our-people?${query}`
        }).then(response => {
            setLoadingMore(false);
            setPeople(response);

            if(response.length < 1) {
                setcountPeople(false)
            } else {
                setcountPeople(true)
            }

        });

    };

    const fetchRegions = () => {
        wp.apiFetch({
            url: "/wp-json/wp/v2/region"
        }).then(response => {
            setRegions(response);
        });
    };

    useEffect(() => {
        fetchFeaturedPerson();
        fetchPeople();
        fetchRegions();
    }, []);

    return (
        <Fragment>
            {!_.isEmpty(regions) ? (
                <>
                <div className={`${className}__container`}>
                    <PeopleListingCards
                        featuredPerson={featuredPerson}
                        featuredPersonQuote={featuredPersonQuote}
                        regions={regions}
                        people={people}
                        fetchPeople={fetchPeople}
                        numberPerson={numberPerson}
                        loading={loading}
                        countPeople={countPeople}
                    />
                </div>
                {loadingMore
                ? <SpinLoadingIcon />
                : ''
                }
                <div 
                className={`people-listing__cards-load-more ${
                    people.length < numberPerson
                    ? 'people-listing__cards-load-more_disabled'
                    : ``
                } `}
                >
                    <button 
                    className="ldc-button ldc-button--green"
                    onClick={(e) => {
                        e.preventDefault()
                        const newNumberPerson = numberPerson + 3;
                        setnumberPerson(newNumberPerson)
                        fetchPeopleLoadMore(newNumberPerson, regionselectedId)
                    }}
                    >
                        Load more people
                    </button>
                </div>
                </>
            ) : (
                <SpinLoadingIcon />
            )}
        </Fragment>
    );
};

if (block) render(<PeopleListingFrontend />, block);
