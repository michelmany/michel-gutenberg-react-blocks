const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { RichText } = wp.blockEditor;

import edit from "./edit";

const attributes = {
    headline: {
        type: "string",
        default: "A Major player"
    },
    subline: {
        type: "string",
        default:
            "Louis Dreyfus Company is a leading merchant and processor of agricultural goods, leveraging its global reach and extensive asset network to deliver for its customers around the world - safely, responsibly and reliably."
    },
    categories: {
        type: "array",
        default: [
            {
                title: "Net Sales (Total)",
                barCharts: [
                    {
                        label: "2017",
                        value: "US$ 36.5 Bn",
                        size: 75
                    },
                    {
                        label: "2019",
                        value: "US$ 38.0 Bn",
                        size: 100
                    }
                ]
            },
            {
                title: "Volumes Shipped",
                barCharts: [
                    {
                        label: "2017",
                        value: "US$ 36.5 Bn",
                        size: 75
                    },
                    {
                        label: "2019",
                        value: "US$ 38.0 Bn",
                        size: 100
                    }
                ]
            },
            {
                title: "Total Balance Sheet",
                barCharts: [
                    {
                        label: "2017",
                        value: "US$ 36.5 Bn",
                        size: 75
                    },
                    {
                        label: "2019",
                        value: "US$ 38.0 Bn",
                        size: 100
                    }
                ]
            },
            {
                title: "Equity",
                barCharts: [
                    {
                        label: "2017",
                        value: "US$ 36.5 Bn",
                        size: 75
                    },
                    {
                        label: "2019",
                        value: "US$ 38.0 Bn",
                        size: 100
                    }
                ]
            }
        ]
    },
    sectionBottomText: {
        type: "string",
        default: `*Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore.`
    }
};

registerBlockType("ldc/major-player", {
    title: "Major Player",
    description: "Major Player Block",
    category: "ldc-blocks",
    icon: "chart-bar",
    keywords: ["Major Player", "key figures"],

    attributes,

    edit,

    save: ({ attributes }) => {
        const { headline, subline, categories, sectionBottomText } = attributes;
        const className = getBlockDefaultClassName("ldc/major-player");

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
                            })}
                        </div>
                        <RichText.Content
                            className={`${className}__bottom-text`}
                            tagName="p"
                            value={sectionBottomText}
                        />
                    </div>
                </div>
            </div>
        );
    }
});
