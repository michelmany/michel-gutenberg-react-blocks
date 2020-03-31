const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { RichText } = wp.blockEditor;

import edit from "./edit";

const attributes = {
    headline: {
        type: "string",
        default: "Operational indicators"
    },
    subline: {
        type: "string",
        default:
            "Louis Dreyfus Company achieved a strong performance in 2018, with both business segments contributing positively to the 25.8% growth in Segment Operating Results. Our agility in adapting to a global environment that remained challenging for the agri-commodities sector proved key to delivering good results."
    },
    categories: {
        type: "array",
        default: [
            {
                title: "Segment Operating Results",
                doubleBars: [
                    {
                        label: "2018",
                        total: {
                            label: "Total",
                            value: "1,300"
                        },
                        size: 100,
                        slice: [
                            {
                                title: "Value chain",
                                value: "US$ 830 million",
                                size: 62.5
                            },
                            {
                                title: "Merchandizing",
                                value: "US$ 500 million",
                                size: 37.5
                            }
                        ]
                    },
                    {
                        label: "2017",
                        total: {
                            label: "Total",
                            value: "1,300"
                        },
                        size: 75,
                        slice: [
                            {
                                title: "Value chain",
                                value: "US$ 714 million",
                                size: 67.5
                            },
                            {
                                title: "Merchandizing",
                                value: "US$ 343 million",
                                size: 32.5
                            }
                        ]
                    }
                ]
            },
            {
                title: "EBITDA",
                barCharts: [
                    {
                        label: "2018",
                        value: "US$ 1,048 million",
                        size: 75
                    },
                    {
                        label: "2017",
                        value: "US$ 800 million",
                        size: 100
                    }
                ]
            },
            {
                title: "Working Capital Usage",
                barCharts: [
                    {
                        label: "2018",
                        value: "US$ 6.6 Bn",
                        size: 75
                    },
                    {
                        label: "2017",
                        value: "US$ 6.3 Bn",
                        size: 100
                    }
                ]
            }
        ]
    }
};

registerBlockType("ldc/operational-indicators", {
    title: "Operational Indicators",
    description: "Operational Indicators Block",
    category: "ldc-blocks",
    icon: "chart-bar",
    keywords: ["Operational Indicators", "key figures"],

    attributes,

    edit,

    save: ({ attributes }) => {
        const { headline, subline, categories } = attributes;
        const className = getBlockDefaultClassName("ldc/operational-indicators");
        
        return (
            <div>
                <div className="container">
                    <RichText.Content className={`${className}__headline`} tagName="h2" value={headline} />
                    <RichText.Content className={`${className}__subline`} tagName="h4" value={subline} />
                    <div className={`${className}__content`}>
                        {categories.length && (
                            <>
                                <div className={`${className}__categories d-none d-md-block`}>
                                    <div className="categories-nav">
                                        {categories.map((category, i) => {
                                            return (
                                                <a  
                                                    key={i}
                                                    className={
                                                        i === 0
                                                            ? "categories-nav__link active"
                                                            : "categories-nav__link "
                                                    }
                                                    data-toggle="tab"
                                                    href={`#${className}-category-0${i}`}
                                                    role="tab"
                                                >
                                                    {category.title}
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className={`${className}__categories d-md-none`} role="tablist">
                                    <div className="dropdown">
                                        <button
                                            className={`${className}__categories-select dropdown-toggle`}
                                            type="button"
                                            id={`${className}-categories-mobile`}
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {categories[0].title}
                                        </button>

                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby={`${className}-categories-mobile`}
                                        >
                                            {categories.map((category, i) => {
                                                return (
                                                    <button
                                                        id={`${className}-dropdown-category-0${i}-tab`}
                                                        className="dropdown-item"
                                                        type="button"
                                                        data-toggle="tab"
                                                        href={`#${className}-category-0${i}`}
                                                        role="tab"
                                                    >
                                                        {category.title}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <div class="tab-content" id={`${className}-categories-content`}>
                            {/* {categories.map((category, i) => {
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
                                        {category.barCharts.map(bar => {
                                            return (
                                                <div className="charts-item">
                                                    <RichText.Content
                                                        className="charts-item__year"
                                                        tagName="div"
                                                        value={bar.label}
                                                    />
                                                    <div
                                                        className="charts-item__bar"
                                                        style={{
                                                            "--chart-bar-width": " " + bar.size + "%"
                                                        }}
                                                    >
                                                        <RichText.Content tagName="span" value={bar.value} />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })} */}

                            <div
                                key={`key-0`}
                                id={`${className}-category-00`}
                                aria-labelledby={`${className}-dropdown-category-00-tab`}
                                className={`${className}__double-charts tab-pane fade show active`}
                                role="tabpanel"
                                aria-labelledby={`${className}-category-00-tab`}
                            >
                                {categories[0].doubleBars.map((bar, index) => {
                                    console.log(bar)
                                    return (
                                        <div className="double-charts-item">
                                            <div className="row">
                                                <div className="col-md-12 align-self-center">
                                                    <RichText.Content
                                                        className="double-charts-item__label"
                                                        value={bar.label}
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
                                                                "max-width": bar.slice[0].size + "%"
                                                            }}
                                                        >
                                                            <RichText.Content
                                                                tagName="span"
                                                                className="double-charts-item__bar-title"
                                                                value={bar.slice[0].title}
                                                            />
                                                            <RichText.Content
                                                                tagName="span"
                                                                className="double-charts-item__bar-value"
                                                                value={bar.slice[0].value}
                                                            />
                                                        </div>

                                                        <div
                                                            className="double-charts-item__bar item-right"
                                                            style={{
                                                                "max-width": bar.slice[1].size  + "%"
                                                            }}
                                                        >
                                                            <RichText.Content
                                                                tagName="span"
                                                                className="double-charts-item__bar-title"
                                                                value={bar.slice[1].title}
                                                            />

                                                            <RichText.Content
                                                                tagName="span"
                                                                className="double-charts-item__bar-value"
                                                                value={bar.slice[1].value}
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
                                            <RichText.Content className="charts-item__year" value={bar.label} />
                                            <div
                                                className="charts-item__bar"
                                                style={{
                                                    "--chart-bar-width": bar.size + "%"
                                                }}
                                            >
                                                <RichText.Content tagName="span" value={bar.value} />
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
                                            <RichText.Content className="charts-item__year" value={bar.label} />
                                            <div
                                                className="charts-item__bar"
                                                style={{
                                                    "--chart-bar-width": bar.size + "%"
                                                }}
                                            >
                                                <RichText.Content tagName="span" value={bar.value} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
