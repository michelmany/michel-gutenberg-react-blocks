const { Component, Fragment, useEffect, useState } = wp.element;
const { withSelect } = wp.data;
const { __ } = wp.i18n;
import SpinLoadingIcon from "../../../js/components/SpinLoadingIcon.js";

const LocationSearchMapSidebar = ({ getSelectedRegionId, locations, regions, currentView, changeLocations, currentSelectedRegionId, setFocusedMarker, highlightLocations, highlightArea, loaderActive }) => {
    const toggleViewMode = ( view ) => {
        const sectionType = document.querySelector(".wp-block-ldc-location-search-map");
        if( view && typeof(view) === "string" ){
          if( view === 'map' ){
            sectionType.classList.remove("m--cards-view");
          } else {
            sectionType.classList.add("m--cards-view");
          }
        } else {
          sectionType.classList.toggle("m--cards-view");
        }
    };

    const removeActiveClass = itemsString => {
        const activeItems = [...document.querySelectorAll(`${itemsString}.active`)];

        activeItems.map(item => {
            item.classList.remove("active");
        });
    };

    const activeItem = (e, itemId) => {
        const item = e.target;
        const items = `#${itemId} .dropdown-item`;
        const itemDropdown = document.querySelector(`#${itemId} .filter-item__dropdown`);
        itemDropdown.textContent = item.textContent;
        removeActiveClass(items);
        item.classList.add("active");
    };

    const className = "wp-block-ldc-location-search-map";

    const [orderedLocations, setOrderedLocations ] = useState( locations )
    const [uiOrder, setUIOrder ] = useState('Sort');
    const [highlightedLocations, setHighlightedLocations ] = useState( highlightLocations )
    const [highlightedAreaLocations, setHighlightedAreaLocations ] = useState( highlightArea )

    const setOrder = ( order ) => {
      setUIOrder( order );
      if( order === 'Sort' ) {
        setOrderedLocations( [...locations].sort((a, b) => {
          return a.date > b.date ? 1 : -1;
        }));
      } else {
        setOrderedLocations([...locations].sort((a, b) => {
          if( order === 'Sort (A-Z)'){
            return a.title.raw < b.title.raw ? -1 : 1;
          } else if( order === 'Sort (Z-A)') {
            return a.title.raw < b.title.raw ? 1 : -1;
          }
          return 0;
        }));
      }
    }

    const orderList = ( arr ) => {
      return arr.sort((a, b) => {
        if( uiOrder === 'Sort (A-Z)'){
          return a.title.raw < b.title.raw ? -1 : 1;
        } else if( uiOrder === 'Sort (Z-A)') {
          return a.title.raw < b.title.raw ? 1 : -1;
        }
        return 0;
      })
    }

    const resetSearch = ( event ) => {
      setHighlightedLocations( [] )
    }

    useEffect(() => {
      if( uiOrder ){
        setOrder(uiOrder);
      }
    }, [locations] )

    useEffect(() => {
      toggleViewMode( currentView )
    }, [] );

    useEffect(() => {
      changeLocations( locations )
      setHighlightedAreaLocations( null )
    }, [locations] );

    useEffect(() => {
      setHighlightedLocations( highlightLocations )
    }, [highlightLocations])

    useEffect(() => {
      if( highlightArea ){
        const loc = highlightArea.filter(( each ) => {
          return each.region.indexOf(currentSelectedRegionId) > -1 || currentSelectedRegionId == 0;
        })
        setHighlightedAreaLocations( loc )
        resetSearch();
      } else {
        setHighlightedAreaLocations( null )
      }

    }, [highlightArea])

    return (
        <Fragment>
            <div className={`${className}__sidebar`}>
                <i
                    className="ldc-icon ldc-icon-card-view j_toggle-view-mode"
                    onClick={toggleViewMode}
                ></i>
                <i
                    className="ldc-icon ldc-icon-circle-close j_toggle-view-mode"
                    onClick={toggleViewMode}
                ></i>
                <div className={`${className}__filters`}>
                    <div id="filter-by-region" className="filter-item">
                        <button
                            type="button"
                            className="filter-item__dropdown dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {regions.length ? __("World") : __("Loading Regions...")}
                        </button>
                        <div className="dropdown-menu">
                            {regions &&
                                regions.map(region => {
                                    return (
                                        <li
                                            className="dropdown-item"
                                            onClick={e => {
                                                getSelectedRegionId(region.id);
                                                activeItem(e, "filter-by-region");
                                            }}
                                        >
                                            {region.name}
                                        </li>
                                    );
                                })}
                            <li
                                className="dropdown-item active "
                                onClick={e => {
                                    getSelectedRegionId(0);
                                    activeItem(e, "filter-by-region");
                                }}
                            >
                                {__("World")}
                            </li>
                        </div>
                    </div>
                    <div className="filter-item">
                        <button
                            type="button"
                            className="filter-item__dropdown dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {uiOrder}
                        </button>
                        <div className="dropdown-menu">
                            <li className="dropdown-item" onClick={ () => setOrder('Sort (A-Z)') }>Sort (A-Z)</li>
                            <li className="dropdown-item" onClick={ () => setOrder('Sort (Z-A)') }>Sort (Z-A)</li>
                        </div>
                    </div>
                </div>
                <div className={`${className}__cards`} data-test>
                    { loaderActive ? (
                        <SpinLoadingIcon width={120} />
                    ) : (
                      (
                        highlightedLocations.length ? highlightedLocations :
                          (
                            highlightedAreaLocations ?
                            orderList(highlightedAreaLocations)
                          : orderedLocations
                          )
                      ).map((location, key) => {
                            return (
                                <div className="ldc-location-card" key={key} style={{ cursor: 'pointer'}} onClick={() => {
                                  setFocusedMarker( location.acf.location_geolocation )
                                }}>
                                    { getFeaturedImage(location) &&
                                      <div className="ldc-location-card__header">
                                          <img src={getFeaturedImage(location)} alt="" />
                                      </div>
                                    }
                                    <div className="ldc-location-card__body">
                                        <div className="ldc-location-card__title">
                                            {location.title.rendered}
                                        </div>
                                        <div className="ldc-location-card__content-wrapper">
                                            {location.acf.location_address && (
                                                <div className="ldc-location-card__content">
                                                    <i className="ldc-icon ldc-icon-pin ldc-icon-pin--green"></i>
                                                    <div>
                                                        <div
                                                            className="ldc-location-card__content-text"
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    location.acf.location_address
                                                            }}
                                                        ></div>

                                                        {location.acf.location_view_on_map_link && (
                                                            <a
                                                                href={
                                                                    location.acf
                                                                        .location_view_on_map_link
                                                                        .url
                                                                }
                                                                className="ldc-location-card__content-cta"
                                                                onClick={ () => setFocusedMarker( location.acf.location_geolocation ) }
                                                            >
                                                                {
                                                                    location.acf
                                                                        .location_view_on_map_link
                                                                        .title
                                                                }
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {location.acf.location_phone && (
                                                <div className="ldc-location-card__content">
                                                    <i className="ldc-icon ldc-icon-phone ldc-icon-phone--green"></i>
                                                    <div>
                                                        <div
                                                            className="ldc-location-card__content-text"
                                                            dangerouslySetInnerHTML={{
                                                                __html: location.acf.location_phone
                                                            }}
                                                        ></div>
                                                        {location.acf.location_contact_us_link && (
                                                            <a
                                                                href={
                                                                    location.acf
                                                                        .location_contact_us_link
                                                                        .url
                                                                }
                                                                className="ldc-location-card__content-cta"
                                                            >
                                                                {
                                                                    location.acf
                                                                        .location_contact_us_link
                                                                        .title
                                                                }
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {location.acf.location_website_link && (
                                                <div className="ldc-location-card__content">
                                                    <i className="ldc-icon ldc-icon-globe ldc-icon-globe--green"></i>
                                                    <div>
                                                        <a
                                                            href={
                                                                location.acf.location_website_link
                                                                    .url
                                                            }
                                                            className="ldc-location-card__content-cta"
                                                        >
                                                            {
                                                                location.acf.location_website_link
                                                                    .title
                                                            }
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    { !loaderActive && ! highlightedLocations.length && ! orderedLocations.length ? <div className="ldc-location-card__show-current-results">No results.</div> : null }
                </div>
            </div>
        </Fragment>
    );
};

const getFeaturedImage = location => {
  try {
    return location._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url;
  } catch( e ){}
}

export default withSelect((select, props) => {
    let query = { per_page: -1, _embed: 1, context: 'view' };
    const { selectedRegionId } = props;

    if (selectedRegionId) {
        query["region"] = [selectedRegionId];
    }

    const [locations, setLocations] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [regions, setRegions] = useState([]);
    const [loaderActive, setLoaderActive] = useState( true );

    if( allLocations.length === 0 ){
      wp.apiFetch({ url: window.siteUrl + "/wp-json/wp/v2/location?_embed=1&per_page=100"}).then( function( data ){
        setAllLocations( data );
        setLoaderActive( false );
      });
    }

    if( regions.length === 0 ){
      wp.apiFetch({ url: window.siteUrl + "/wp-json/wp/v2/region?_embed=1&per_page=100"}).then( function( data ){
        setRegions(data);
      });
    }

    useEffect(() => {
      setLocations( allLocations.filter( each => {
        return each.region.indexOf(selectedRegionId) > -1 || selectedRegionId == 0;
      }));
    }, [ selectedRegionId, allLocations.length ]);

    return {
      locations: locations,
      regions: regions,
      // locations: select("core").getEntityRecords("postType", "location", query) || [],
      // regions: select("core").getEntityRecords("taxonomy", "region", query) || [],
      currentSelectedRegionId: selectedRegionId,
      loaderActive: loaderActive
    };
})(LocationSearchMapSidebar);
