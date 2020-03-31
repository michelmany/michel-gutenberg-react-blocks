const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
const { RichText } = wp.blockEditor;

import edit from "./edit";
import tabsDefault from "./tabs-default.json";

const attributes = {
    tabKey: {
        type: "string",
        default: "board-members"
    },
    tabs: {
        type: "array",
        default: tabsDefault
    }
};

registerBlockType("ldc/multi-tab-menu-images", {
    title: "Multi Tab Menu With Images",
    description: "Multi Tab Menu With Images",
    category: "ldc-blocks",
    icon: "laptop",
    keywords: ["Multi Tab Menu With Images"],

    attributes,

    edit,

    save: ({ attributes }) => {
        const className = getBlockDefaultClassName("ldc/multi-tab-menu-images");
        const { tabs } = attributes;
        return (
            <div>
                <div className={`${className}__tabs-menu`}>

                    <nav class="nav nav-pills nav-fill" id={`${className}-tabs`} role="tablist">
                        <a
                            class="nav-item nav-link active"
                            id={`${tabs[0].slug}-tab`}
                            data-toggle="tab"
                            href={`#${tabs[0].slug}`}
                            role="tab"
                            aria-controls={`#${tabs[0].slug}`}
                            aria-selected="true"
                        >
                            {tabs[0].name}
                        </a>

                        <a
                            class="nav-item nav-link"
                            id={`${tabs[0].slug}-tab`}
                            data-toggle="tab"
                            href={`#${tabs[1].slug}`}
                            role="tab"
                            aria-controls={`#${tabs[1].slug}`}
                            aria-selected="false"
                        >
                            {tabs[1].name}
                        </a>

                        <a
                            class="nav-item nav-link"
                            id={`${tabs[0].slug}-tab`}
                            data-toggle="tab"
                            href={`#${tabs[2].slug}`}
                            role="tab"
                            aria-controls={`#${tabs[2].slug}`}
                            aria-selected="false"
                        >
                            {tabs[2].name}
                        </a>
                    </nav>

                    <div class="tab-content" id="myTabContent">
                        <div
                            class="tab-pane fade show active"
                            id={tabs[0].slug}
                            role="tabpanel"
                            aria-labelledby={`${tabs[0].slug}-tab`}
                        >
                            <div className="container">
                                <div className={`${className}__tabs-content`}>
                                    <RichText.Content
                                        className={`${className}__tabs-headline`}
                                        tagName="h3"
                                        value={tabs[0].headline}
                                    />
                                </div>

                                <div className={`${className}-featured-person`}>
                                    <div className={`${className}-featured-person__image-container`}>
                                        <div
                                            className={`${className}-featured-person__image`}
                                            style={{
                                                backgroundImage: `url(${tabs[0].member.imageUrl}`
                                            }}
                                        ></div>
                                    </div>
                                    <div className={`${className}-featured-person__content`}>
                                        <div className={`${className}-featured-person__name`}>
                                            {tabs[0].member.name}
                                        </div>
                                        <div className={`${className}-featured-person__role`}>
                                            {tabs[0].member.role}
                                        </div>
                                        <div
                                            className={`${className}-featured-person__copy`}
                                            dangerouslySetInnerHTML={{
                                                __html: tabs[0].member.copy
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className={`${className}-boards`}>
                                    {tabs[0].boards.map(board => {
                                        return (
                                            <div className={`${className}-boards-item`}>
                                                <div className={`${className}-boards-item__header`}>
                                                    <RichText.Content
                                                        className={`${className}-boards-item__headline`}
                                                        value={board.headline}
                                                        tagName="h3"
                                                    />
                                                    <RichText.Content
                                                        className={`${className}-boards-item__subline`}
                                                        value={board.subline}
                                                        tagName="h4"
                                                    />
                                                </div>
                                                <div className={`${className}-boards-item__list-columns`}>
                                                    {board.lists.map(list => {
                                                        return (
                                                            <div className={`${className}-boards-item__list`}>
                                                                <RichText.Content
                                                                    className={`${className}-boards-item__list-title`}
                                                                    value={list.title}
                                                                    tagName="p"
                                                                />
                                                                <RichText.Content
                                                                    className={`${className}-boards-item__list-item`}
                                                                    value={list.items}
                                                                    tagName="ul"
                                                                    multiline="li"
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        
                        <div
                            class="tab-pane fade"
                            id={tabs[1].slug}
                            role="tabpanel"
                            aria-labelledby={`${tabs[1].slug}-tab`}
                        >
                            <div className="container">
                                <div className={`${className}__tabs-content`}>
                                    <RichText.Content
                                        className={`${className}__tabs-headline`}
                                        tagName="h3"
                                        value={tabs[1].headline}
                                    />
                                    <RichText.Content
                                        className={`${className}__tabs-copy`}
                                        tagName="p"
                                        value={tabs[1].copy}
                                    />
                                </div>

                                <div className={`${className}__tabs-accordions`}>
                                    <div id={`${tabs[1].slug}-accordion`}>
                                        {tabs[1].accordions.map((accordion, index) => {
                                            return (
                                                <div className="item">
                                                    <button
                                                        className="accordion-heading collapsed"
                                                        data-toggle="collapse"
                                                        data-target={`#${tabs[1].slug}-collapse-0${index}`}
                                                    >
                                                        <span>{accordion.title}</span>
                                                        <i class="ldc-icon ldc-icon-accordion-up"></i>
                                                    </button>

                                                    <div
                                                        id={`${tabs[1].slug}-collapse-0${index}`}
                                                        className="collapse"
                                                        data-parent={`#${tabs[1].slug}-accordion`}
                                                    >
                                                        <div className="accordion-body">
                                                            <RichText.Content value={accordion.copy} tagName="p" />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            class="tab-pane fade"
                            id={tabs[2].slug}
                            role="tabpanel"
                            aria-labelledby={`${tabs[2].slug}-tab`}
                        >
                            <div className="container">
                                <div className={`${className}__tabs-content`}>
                                    <RichText.Content
                                        className={`${className}__tabs-headline`}
                                        tagName="h3"
                                        value={tabs[2].headline}
                                    />
                                    <RichText.Content
                                        className={`${className}__tabs-copy`}
                                        tagName="p"
                                        value={tabs[2].copy}
                                    />
                                </div>

                                <div className={`${className}__tabs-accordions`}>
                                    <div id={`${tabs[2].slug}-accordion`}>
                                        {tabs[2].accordions.map((accordion, index) => {
                                            return (
                                                <div className="item">
                                                    <button
                                                        className="accordion-heading collapsed"
                                                        data-toggle="collapse"
                                                        data-target={`#${tabs[2].slug}-collapse-0${index}`}
                                                    >
                                                        <span>{accordion.title}</span>
                                                        <i class="ldc-icon ldc-icon-accordion-up"></i>
                                                    </button>

                                                    <div
                                                        id={`${tabs[2].slug}-collapse-0${index}`}
                                                        className="collapse"
                                                        data-parent={`#${tabs[2].slug}-accordion`}
                                                    >
                                                        <div className="accordion-body">
                                                            <RichText.Content value={accordion.copy} tagName="p" />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
