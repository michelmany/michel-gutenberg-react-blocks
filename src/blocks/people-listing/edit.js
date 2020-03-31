const { Component, Fragment } = wp.element;
const { SelectControl, PanelBody, PanelRow, TextareaControl } = wp.components;
const { InspectorControls } = wp.blockEditor;

import PeopleListingCards from "./components/PeopleListingCards";
import SpinLoadingIcon from "../../js/components/SpinLoadingIcon";

class PeopleListingEdit extends Component {
    state = {
        loading: false,
        featuredPerson: null
    };

    onSelectPersonChange = selectedFeaturedPersonId => {
        console.log(selectedFeaturedPersonId);
        this.props.setAttributes({ selectedFeaturedPersonId: parseInt(selectedFeaturedPersonId) });
        this.fetchFeaturedPerson(selectedFeaturedPersonId);
    };

    fetchFeaturedPerson = featuredPersonId => {
        console.log(featuredPersonId);
        if (featuredPersonId != 0) {
            wp.apiFetch({
                url: `/wp-json/wp/v2/meet-our-people/${featuredPersonId}`
            }).then(response => {
                this.setState({ featuredPerson: response });
            });
        } else {
            this.setState({ featuredPerson: null });
        }
    };

    fetchPeople = regionId => {
        console.log(regionId);

        let query = `per_page=9&exclude[]=${this.props.attributes.selectedFeaturedPersonId}`;

        this.setState({ loading: true });

        if (regionId && parseInt(regionId) !== 0) {
            console.log("diferente");
            query = `${query}&region=${regionId}`;
        }

        wp.apiFetch({
            url: `/wp-json/wp/v2/meet-our-people?${query}`
        }).then(response => {
            this.setState({ loading: false });
            this.props.setAttributes({ people: response });
        });
    };

    fetchRegions = () => {
        wp.apiFetch({
            url: "/wp-json/wp/v2/region"
        }).then(response => {
            this.props.setAttributes({ regions: response });
        });
    };

    componentDidMount() {
        this.fetchPeople();
        this.fetchRegions();
    }

    render() {
        const { className, attributes } = this.props;
        const { people, quote, selectedFeaturedPersonId, regions, selectedRegion } = attributes;

        // options for SelectControl
        const options = [];

        if (people) {
            options.push({ value: 0, label: "Select something" });
            people.forEach(person => {
                options.push({ value: person.id, label: person.title.rendered });
            });
        } else {
            options.push({ value: 0, label: "Loading..." });
        }

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Featured Person Settings">
                        <PanelRow className="d-block">
                            <SelectControl
                                label={"Select a featured person:"}
                                value={selectedFeaturedPersonId}
                                onChange={this.onSelectPersonChange}
                                options={options}
                            />
                        </PanelRow>
                        <PanelRow className="d-block">
                            <TextareaControl
                                label="Write a Quote"
                                value={quote}
                                onChange={quote => this.props.setAttributes({ quote })}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>

                {!_.isEmpty(people) && !_.isEmpty(regions) ? (
                    <div className={className}>
                        <PeopleListingCards
                            featuredPerson={this.state.featuredPerson}
                            featuredPersonQuote={quote}
                            regions={regions}
                            people={people}
                            fetchPeople={this.fetchPeople}
                            loading={this.state.loading}
                        />
                    </div>
                ) : (
                    <SpinLoadingIcon />
                )}
            </Fragment>
        );
    }
}

export default PeopleListingEdit;
