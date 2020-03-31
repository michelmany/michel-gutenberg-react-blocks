const { Fragment, useState, useEffect } = wp.element;
const { __ } = wp.i18n;
import SpinLoadingIcon from "../../../js/components/SpinLoadingIcon";

const PeopleListingCards = ({
    regions,
    people,
    featuredPerson,
    featuredPersonQuote,
    fetchPeople,
    numberPerson,
    loading,
    countPeople
}) => {
    const [filteredByRegion, setFilteredByRegion] = useState(false);
    const [propnumberPerson, setpropnumberPerson] = useState(numberPerson);
    return (
        <Fragment>
            <div className="people-listing__bar" id="people-listing__bar">
                <div className="container">
                    <div className="people-listing__bar-content ">
                        <div className="people-listing__select-label">
                            {__("Filter People by Region:")}
                        </div>
                        <div className={`people-listing__select-container`}>
                            <select
                                className="people-listing__select-field"
                                onChange={e => {
                                    const value = parseInt(e.target.value);
                                    fetchPeople(propnumberPerson, value);
                                    value !== 0
                                        ? setFilteredByRegion(true)
                                        : setFilteredByRegion(false);
                                }}
                            >
                                <option selected value={0}>
                                    {__("All people")}
                                </option>
                                {regions.map(region => {
                                    return <option value={region.id}>{region.name}</option>;
                                })}
                            </select>
                            <svg className={`people-listing__select-arrow`} width="17" height="9" xmlns="http://www.w3.org/2000/svg"><path d="M9.086 9a.766.766 0 01-.51-.195l-8.3-7.37A.837.837 0 01.187.285a.765.765 0 011.106-.09l7.751 6.882 6.618-6.84a.763.763 0 011.109.004.837.837 0 01-.003 1.152l-7.13 7.37A.767.767 0 019.086 9z" fill="#FFF" fill-rule="nonzero"/></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="people-listing__cards">
                <div className="container">
                    {/* Featured Person */}
                    {featuredPerson && !filteredByRegion && (
                        <div className="people-listing__cards--featured">
                            <a href={featuredPerson.link} className="people-listing__cards--featured--link"></a>
                            <div 
                                className="people-listing-item__container-image"
                                style={{
                                    backgroundImage: `url(${featuredPerson.featured_img_url})`
                                }}    
                            >
                            <div className="people-listing-item__overlay"></div>
                            </div>
                            <div className="people-listing-item__content">
                                {featuredPersonQuote && (
                                    <div className="people-listing-item__quote">
                                        “{featuredPersonQuote}”
                                    </div>
                                )}
                                {featuredPerson.acf.user_details 
                                ?
                                <>
                                <h2 className="people-listing-item__title">
                                    {featuredPerson.acf.user_details.name}
                                </h2>
                                <p className="people-listing-item__role">
                                    {featuredPerson.acf.user_details.role}
                                </p>
                                <p className="people-listing-item__location">
                                    {featuredPerson.acf.user_details.location}
                                </p>
                                </>
                                : ''
                                }                                
                            </div>
                        </div>
                    )}
                    {/* Featured Person */}

                    {/* People Cards */}
                    {loading ? (
                        <SpinLoadingIcon />
                    ) : countPeople == false ? (
                        <div className="people-listing__no-results">
                            No results
                        </div>
                    ) : (
                        <div className="people-listing__cards-wrapper">
                            {people.map(person => {
                                let anchor_class = ''
                                if(person.acf.thumbnail_anchor == 'top') {
                                    anchor_class = 'thumb-anchor-top'
                                } else if (person.acf.thumbnail_anchor == 'left') {
                                    anchor_class = 'thumb-anchor-left'
                                } else if (person.acf.thumbnail_anchor == 'right') {
                                    anchor_class = 'thumb-anchor-right'
                                } else if (person.acf.thumbnail_anchor == 'bottom') {
                                    anchor_class = 'thumb-anchor-bottom'
                                } else if (person.acf.thumbnail_anchor == 'top_left') {
                                    anchor_class = 'thumb-anchor-top-left'
                                } else if (person.acf.thumbnail_anchor == 'top_right') {
                                    anchor_class = 'thumb-anchor-top-right'
                                } else if (person.acf.thumbnail_anchor == 'bottom_left') {
                                    anchor_class = 'thumb-anchor-bottom-left'
                                } else if (person.acf.thumbnail_anchor == 'bottom_right') {
                                    anchor_class = 'thumb-anchor-bottom-right'
                                } else {
                                    anchor_class = 'thumb-anchor-centered'
                                }
                                return (
                                    <div className="people-listing__cards--item people-listing-item">
                                        <a href={person.link} className="people-listing-item__link"></a>
                                        <div className="people-listing-item__overlay"></div>
                                        {person.acf.user_details 
                                        ?  
                                        <div className="people-listing-item__content">
                                            <h2 className="people-listing-item__title">
                                                {person.acf.user_details.name}
                                            </h2>
                                            <p className="people-listing-item__role" dangerouslySetInnerHTML={{__html: person.acf.user_details.role}} />
                                            <p className="people-listing-item__location">
                                                {person.acf.user_details.location}
                                            </p>
                                        </div>
                                        : ''
                                        }
                                        <div
                                            className={`people-listing-item__image ${anchor_class}`}
                                            style={{
                                                backgroundImage: `url(${person.featured_img_url})`
                                            }}
                                        ></div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {/* People Cards */}
                </div>
            </div>
        </Fragment>
    );
};

export default PeopleListingCards;
