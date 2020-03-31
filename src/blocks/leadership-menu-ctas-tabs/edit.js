const { Component, Fragment } = wp.element;
const { SelectControl, PanelBody, PanelRow, TextareaControl } = wp.components;
const { InspectorControls } = wp.blockEditor;

import LeadershipPeopleCards from "./components/LeadershipPeopleCards";
import SpinLoadingIcon from "../../js/components/SpinLoadingIcon";

class LeadershipTabbetContentEdit extends Component {
    getPeopleList = () => {
        if (!this.props.attributes.people.length) {
            wp.apiFetch({
                url: "/wp-json/wp/v2/leadership?_embed&per_page=100"
            }).then(people => {
                this.props.setAttributes({ people });
                // this.setFeaturedOptions(people);
            });
        }
    };

    getCategories = () => {
        if (!this.props.attributes.categories.lenght) {
            wp.apiFetch({
                url: "/wp-json/wp/v2/leadership-category?filter[orderby]=name&order=desc&per_page=2"
            }).then(categories => {
                this.props.setAttributes({ categories });
            });
        }
    };

    setFeaturedOptions = people => {
        // options for SelectControl
        const options = [];
        console.log(people);

        options.push({ value: 0, label: "Select something" });
        people.map(person => {
            options.push({ value: person.id, label: person.title.rendered });
        });

        this.setState({ options });
    };

    componentDidMount() {
        this.getPeopleList();
        this.getCategories();
    }

    onSelectPersonChange = selected => {
        this.props.setAttributes({ selectedFeaturedPersonId: parseInt(selected) });
    };

    render() {
        const { className, attributes } = this.props;
        const { people, categories, selectedFeaturedPersonId } = attributes;

        // options for SelectControl
        const options = [];

        if (people) {
            options.push({ value: 0, label: "Select something" });
            people.map(person => {
                options.push({ value: person.id, label: person.title.rendered });
            });
        } else {
            options.push({ value: 0, label: "Loading..." });
        }

        return [
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
                </PanelBody>
            </InspectorControls>,

            <div className={className}>
                {!_.isEmpty(people) && !_.isEmpty(categories) ? (
                    <LeadershipPeopleCards
                        featuredPersonId={selectedFeaturedPersonId}
                        categories={categories}
                        people={people}
                        className={className}
                    />
                ) : (
                    <SpinLoadingIcon />
                )}
            </div>
        ];
    }
}

export default LeadershipTabbetContentEdit;
