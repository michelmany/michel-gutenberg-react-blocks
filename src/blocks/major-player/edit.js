const { Component, Fragment } = wp.element;
const { Button, IconButton, PanelBody, TextControl, RangeControl } = wp.components;
const { RichText, InspectorControls } = wp.blockEditor;

import CategoriesNav from "../../js/components/CategoriesNav";

class MajorPlayerEdit extends Component {
    onChangeHeadline = headline => {
        this.props.setAttributes({ headline });
    };

    onChangeSubline = subline => {
        this.props.setAttributes({ subline });
    };

    onChangeSectionBottomText = sectionBottomText => {
        this.props.setAttributes({ sectionBottomText });
    };

    handleAddCategory = () => {
        const categories = [...this.props.attributes.categories];
        categories.push({
            title: "",
            barCharts: [
                {
                    label: "2019",
                    value: "US$ 36.5 Bn",
                    size: 50
                },
                {
                    label: "2020",
                    value: "US$ 38.0 Bn",
                    size: 100
                }
            ]
        });
        this.props.setAttributes({ categories });
    };

    handleRemoveCategory = index => {
        const categories = [...this.props.attributes.categories];
        categories.splice(index, 1);
        this.props.setAttributes({ categories });
    };

    handleCategoryChange = (title, index) => {
        const categories = [...this.props.attributes.categories];
        categories[index].title = title;
        this.props.setAttributes({ categories });
    };

    onChangeBarLabel = (category, label, index) => {
        const categoryIndex = _.indexOf(this.props.attributes.categories, category);
        const categories = [...this.props.attributes.categories];
        categories[categoryIndex].barCharts[index].label = label;
        this.props.setAttributes({ categories });
    };

    onChangeBarValue = (category, value, index) => {
        const categoryIndex = _.indexOf(this.props.attributes.categories, category);
        const categories = [...this.props.attributes.categories];
        categories[categoryIndex].barCharts[index].value = value;
        this.props.setAttributes({ categories });
    };

    onChangeBarSize = (category, size, index) => {
        const categoryIndex = _.indexOf(this.props.attributes.categories, category);
        const categories = [...this.props.attributes.categories];
        categories[categoryIndex].barCharts[index].size = size;
        this.props.setAttributes({ categories });
    };

    render() {
        const { className, attributes } = this.props;
        const { headline, subline, categories, sectionBottomText } = attributes;

        let categoriesFields;

        if (categories.length) {
            categoriesFields = categories.map((category, index) => {
                return (
                    <Fragment key={index}>
                        <div class="ldc-inspector-control__content">
                            <TextControl
                                className="ldc-inspector-control__text-field"
                                placeholder="Category Title"
                                value={categories[index].title}
                                onChange={title => this.handleCategoryChange(title, index)}
                            />
                            <IconButton
                                className="ldc-inspector-control__icon-button"
                                icon="no-alt"
                                label="Delete category"
                                onClick={() => this.handleRemoveCategory(index)}
                            />
                        </div>
                        {category.barCharts.map((bar, i) => {
                            const whichBar = i === 0 ? "First" : "Second";
                            return (
                                <RangeControl
                                    label={`${whichBar} bar chart width`}
                                    value={bar.size}
                                    onChange={size => this.onChangeBarSize(category, size, i)}
                                    separatorType={"fullWidth"}
                                    min={40}
                                    max={100}
                                />
                            );
                        })}
                        <hr />
                    </Fragment>
                );
            });
        }

        return (
            <Fragment>
                <InspectorControls key="1">
                    <PanelBody title="Categories Tabs">
                        {categoriesFields}

                        <Button isDefault isLarge onClick={this.handleAddCategory}>
                            Add Category
                        </Button>
                    </PanelBody>
                </InspectorControls>

                <div className={className}>
                    <div className="container">
                        <RichText
                            className={`${className}__headline`}
                            onChange={this.onChangeHeadline}
                            value={headline}
                            placeholder={"Write headline..."}
                            formattingControls={[]}
                        />
                        <RichText
                            className={`${className}__subline`}
                            onChange={this.onChangeSubline}
                            value={subline}
                            placeholder={"Write subline..."}
                            formattingControls={[]}
                        />
                        <div className={`${className}__content`}>
                            {categories.length && <CategoriesNav categories={categories} className={className} />}

                            <div class="tab-content" id={`${className}-categories-content`}>
                                {categories.map((category, i) => {
                                    return (
                                        <div
                                            key={`key-${i}`}
                                            id={`${className}-category-0${i}`}
                                            aria-labelledby={`${className}-dropdown-category-0${i}-tab`}
                                            className={
                                                i === 0
                                                    ? `${className}__charts tab-pane fade show active`
                                                    : `${className}__charts tab-pane fade`
                                            }
                                            role="tabpanel"
                                            aria-labelledby={`${className}-category-0${i}-tab`}
                                        >
                                            {category.barCharts.map((bar, index) => {
                                                return (
                                                    <div className="charts-item">
                                                        <RichText
                                                            className="charts-item__year"
                                                            onChange={label =>
                                                                this.onChangeBarLabel(category, label, index)
                                                            }
                                                            value={bar.label}
                                                            placeholder="Write bar label..."
                                                            formattingControls={[]}
                                                        />
                                                        <div
                                                            className="charts-item__bar"
                                                            style={{
                                                                "--chart-bar-width": bar.size + "%"
                                                            }}
                                                        >
                                                            <RichText
                                                                onChange={value =>
                                                                    this.onChangeBarValue(category, value, index)
                                                                }
                                                                tagName="span"
                                                                value={bar.value}
                                                                placeholder="Write bar value..."
                                                                formattingControls={[]}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>

                            <RichText
                                className={`${className}__bottom-text`}
                                onChange={this.onChangeSectionBottomText}
                                value={sectionBottomText}
                                placeholder={"Write text here..."}
                                formattingControls={[]}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MajorPlayerEdit;
