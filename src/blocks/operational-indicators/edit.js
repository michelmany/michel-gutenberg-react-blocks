const { Component, Fragment } = wp.element;
const { Button, IconButton, PanelBody, TextControl, RangeControl } = wp.components;
const { RichText, InspectorControls } = wp.blockEditor;

import CategoriesNav from "../../js/components/CategoriesNav";

class OperationalIndicatorsEdit extends Component {
    onChangeHeadline = headline => {
        this.props.setAttributes({ headline });
    };

    onChangeSubline = subline => {
        this.props.setAttributes({ subline });
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

    onChangeDoubleBarSlice = (category, value, index, slice, key ) => {
      const categoryIndex = _.indexOf(this.props.attributes.categories, category);
      const categories = [...this.props.attributes.categories];
      categories[categoryIndex].doubleBars[index].slice[slice][key] = value;
      this.props.setAttributes({ categories });
    };

    onChangeBarSize = (category, size, index) => {
        const categoryIndex = _.indexOf(this.props.attributes.categories, category);
        const categories = [...this.props.attributes.categories];
        categories[categoryIndex].barCharts[index].size = size;
        this.props.setAttributes({ categories });
    };

    onChangeDoubleBarBarSize = (category, size, index) => {
      const categoryIndex = _.indexOf(this.props.attributes.categories, category);
      const categories = [...this.props.attributes.categories];
      categories[categoryIndex].doubleBars[index].size = size;
      this.props.setAttributes({ categories });
    };

    onChangeDoubleBarBarBalance = (category, size, index) => {
      const categoryIndex = _.indexOf(this.props.attributes.categories, category);
      const categories = [...this.props.attributes.categories];
      categories[categoryIndex].doubleBars[index].slice[0].size = size;
      categories[categoryIndex].doubleBars[index].slice[1].size = 100 - size;
      this.props.setAttributes({ categories });
    };

    render() {
        const { className, attributes } = this.props;
        const { headline, subline, categories } = attributes;

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
                        </div>
                        {category.barCharts &&
                            category.barCharts.map((bar, i) => {
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
                          {category.doubleBars &&
                            category.doubleBars.map((bar, i) => {
                                const whichBar = i === 0 ? "First" : "Second";
                                return (
                                  <>
                                    <RangeControl
                                        label={`${whichBar} bar chart width`}
                                        value={bar.size}
                                        onChange={size => this.onChangeDoubleBarBarSize(category, size, i)}
                                        separatorType={"fullWidth"}
                                        min={40}
                                        max={100}
                                    />
                                    <RangeControl
                                        label={`${whichBar} bar chart balance`}
                                        value={ bar.slice[0].size }
                                        onChange={size => this.onChangeDoubleBarBarBalance(category, size, i)}
                                        separatorType={"fullWidth"}
                                        min={20}
                                        max={100}
                                    />
                                  </>
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
                    <PanelBody title="Categories Tabs">{categoriesFields}</PanelBody>
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

                            {/* FIRST TAB */}
                            <div class="tab-content" id={`${className}-categories-content`}>
                                <div
                                    key={`key-0`}
                                    id={`${className}-category-00`}
                                    aria-labelledby={`${className}-dropdown-category-00-tab`}
                                    className={`${className}__double-charts tab-pane fade show active`}
                                    role="tabpanel"
                                    aria-labelledby={`${className}-category-00-tab`}
                                >
                                    {categories[0].doubleBars.map((bar, index) => {
                                        return (
                                            <div className="double-charts-item">
                                                <div className="row">
                                                    <div className="col-md-12 align-self-center">
                                                        <RichText
                                                            className="double-charts-item__label"
                                                            onChange={label =>
                                                                this.onChangeBarLabel(categories[0], label, index)
                                                            }
                                                            value={bar.label}
                                                            placeholder="Write bar label..."
                                                            formattingControls={[]}
                                                        />
                                                    </div>

                                                    <div className="col-md-12 align-self-center">
                                                        <div
                                                            className="double-charts-item__bars"
                                                            style={{ "--double-chart-bar-width": bar.size + "%" }}
                                                        >
                                                            <div
                                                                className="double-charts-item__bar item-left"
                                                                style={{
                                                                    "--double-chart-bar-left-width": bar.slice[0].size + "%"
                                                                }}
                                                            >
                                                                <RichText
                                                                    onChange={value =>
                                                                        this.onChangeDoubleBarSlice(
                                                                            categories[0],
                                                                            value,
                                                                            index,
                                                                            0,
                                                                            'title'
                                                                        )
                                                                    }
                                                                    tagName="span"
                                                                    className="double-charts-item__bar-title"
                                                                    value={bar.slice[0].title}
                                                                    placeholder="Write bar title..."
                                                                    formattingControls={[]}
                                                                />
                                                                <RichText
                                                                    onChange={value =>
                                                                        this.onChangeDoubleBarSlice(
                                                                            categories[0],
                                                                            value,
                                                                            index,
                                                                            0,
                                                                            'value'
                                                                        )
                                                                    }
                                                                    tagName="span"
                                                                    className="double-charts-item__bar-value"
                                                                    value={bar.slice[0].value}
                                                                    placeholder="Write bar values..."
                                                                    formattingControls={[]}
                                                                />
                                                            </div>

                                                            <div
                                                                className="double-charts-item__bar item-right"
                                                                style={{
                                                                    "--double-chart-bar-right-width": bar.slice[1].size + "%"
                                                                }}
                                                            >
                                                                <RichText
                                                                    onChange={value =>
                                                                        this.onChangeDoubleBarSlice(
                                                                            categories[0],
                                                                            value,
                                                                            index,
                                                                            1,
                                                                            'title'
                                                                        )
                                                                    }
                                                                    tagName="span"
                                                                    className="double-charts-item__bar-title"
                                                                    value={bar.slice[1].title}
                                                                    placeholder="Write bar value..."
                                                                    formattingControls={[]}
                                                                />

                                                                <RichText
                                                                    onChange={value =>
                                                                        this.onChangeDoubleBarSlice(
                                                                            categories[0],
                                                                            value,
                                                                            index,
                                                                            1,
                                                                            'value'
                                                                        )
                                                                    }
                                                                    tagName="span"
                                                                    className="double-charts-item__bar-value"
                                                                    value={bar.slice[1].value}
                                                                    placeholder="Write bar value..."
                                                                    formattingControls={[]}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* SECOND TAB */}
                                <div
                                    key={`key-1`}
                                    id={`${className}-category-01`}
                                    aria-labelledby={`${className}-dropdown-category-01-tab`}
                                    className={`${className}__charts tab-pane fade`}
                                    role="tabpanel"
                                    aria-labelledby={`${className}-category-01-tab`}
                                >
                                    {categories[1].barCharts.map((bar, index) => {
                                        return (
                                            <div className="charts-item">
                                                <RichText
                                                    className="charts-item__year"
                                                    onChange={label =>
                                                        this.onChangeBarLabel(categories[1], label, index)
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
                                                            this.onChangeBarValue(categories[1], value, index)
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

                                {/* THIRD TAB */}
                                <div
                                    key={`key-2`}
                                    id={`${className}-category-02`}
                                    aria-labelledby={`${className}-dropdown-category-02-tab`}
                                    className={`${className}__charts tab-pane fade`}
                                    role="tabpanel"
                                    aria-labelledby={`${className}-category-02-tab`}
                                >
                                    {categories[2].barCharts.map((bar, index) => {
                                        return (
                                            <div className="charts-item">
                                                <RichText
                                                    className="charts-item__year"
                                                    onChange={label =>
                                                        this.onChangeBarLabel(categories[2], label, index)
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
                                                            this.onChangeBarValue(categories[2], value, index)
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
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default OperationalIndicatorsEdit;
