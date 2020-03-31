const { Component, Fragment } = wp.element;
const { RichText, MediaPlaceholder, InspectorControls } = wp.blockEditor;
const { Button, IconButton, PanelBody, TextControl, Icon } = wp.components;
import { Tabs, Tab, Container } from "react-bootstrap";

class GovernanceTabbetContentEdit extends Component {
    handleChangeTab = (key, value, index) => {
        const tabs = [...this.props.attributes.tabs];
        tabs[index][key] = value;
        this.props.setAttributes({ tabs });
    };

    handleChangeFeaturedPerson = (key, value, index) => {
        const tabs = [...this.props.attributes.tabs];
        tabs[index].member[key] = value;
        this.props.setAttributes({ tabs });
    };

    handleAddAccordion = index => {
        const tabs = [...this.props.attributes.tabs];
        tabs[index].accordions.push({
            title: "New Accordion Title",
            copy: ""
        });
        this.props.setAttributes({ tabs });
    };

    handleRemoveAccordion = (accordionIndex, index) => {
        const tabs = [...this.props.attributes.tabs];
        tabs[index].accordions.splice(accordionIndex, 1);
        this.props.setAttributes({ tabs });
    };

    handleChangeBoard = (key, value, boardIndex, index) => {
        const tabs = [...this.props.attributes.tabs];
        tabs[index].boards[boardIndex][key] = value;
        this.props.setAttributes({ tabs });
    };

    handleChangeBoardList = (key, value, listIndex, boardIndex, index) => {
        const tabs = [...this.props.attributes.tabs];
        tabs[index].boards[boardIndex].lists[listIndex][key] = value;
        this.props.setAttributes({ tabs });
    };

    handleAccordionChange = (key, value, accordionIndex, index) => {
        const tabs = [...this.props.attributes.tabs];
        tabs[index].accordions[accordionIndex][key] = value;
        this.props.setAttributes({ tabs });
    };
   

    render() {
        const { className, attributes, setAttributes } = this.props;
        const { tabKey, tabs } = attributes;

        let tabsFields;

        if (tabs.length) {
            tabsFields = tabs.map((tab, index) => {
                return (
                    <PanelBody title={`# ${tab.name}`} key={index}>
                        <div className="ldc-inspector-control__content">
                            <TextControl
                                className="ldc-inspector-control__text-field"
                                label="Tab Title"
                                placeholder={`Tab #${index + 1} Title`}
                                value={tab.name}
                                onChange={value => this.handleChangeTab("name", value, index)}
                            />
                        </div>

                        {tab.accordions && (
                            <h4 className={`${className}-inspector-control__accordions-title`}>
                                <Icon icon="list-view" size={14} /> Accordions
                            </h4>
                        )}

                        {tab.accordions &&
                            tab.accordions.map((accordion, accordionIndex) => {
                                return (
                                    <div className="ldc-inspector-control__content" key={accordionIndex}>
                                        <TextControl
                                            className="ldc-inspector-control__text-field"
                                            placeholder="Accordion Header Title"
                                            value={accordion.title}
                                            onChange={title =>
                                                this.handleAccordionChange("title", title, accordionIndex, index)
                                            }
                                        />
                                        <IconButton
                                            className="ldc-inspector-control__icon-button"
                                            icon="no-alt"
                                            label="Delete accordion"
                                            onClick={() => this.handleRemoveAccordion(accordionIndex, index)}
                                        />
                                    </div>
                                );
                            })}
                        {index !== 0 && (
                            <Button isDefault isLarge onClick={() => this.handleAddAccordion(index)}>
                                Add accordion
                            </Button>
                        )}
                    </PanelBody>
                );
            });
        }

        return (
            <Fragment>
                <InspectorControls key="1">{tabsFields}</InspectorControls>

                <div className={className}>
                    <div className={`${className}__tabs-menu`}>
                        <Tabs
                            id={`${className}-tabs`}
                            activeKey={tabKey}
                            onSelect={k => setAttributes({ tabKey: k })}
                            variant="pills"
                            className={`${className}__tabs`}
                        >
                            <Tab eventKey={tabs[0].slug} title={tabs[0].name}>
                                <Container>
                                    <div className={`${className}__tabs-content`}>
                                        <RichText
                                            className={`${className}__tabs-headline`}
                                            onChange={value => this.handleChangeTab("headline", value, 0)}
                                            value={tabs[0].headline}
                                            tagName="h3"
                                            placeholder={"Write headline..."}
                                        />
                                    </div>

                                    <div className={`${className}-featured-person`}>
                                        <div className={`${className}-featured-person__image-container`}>
                                            <div
                                                className={`${className}-featured-person__image`}
                                                style={{
                                                    backgroundImage: `url(${tabs[0].member.imageUrl}`
                                                }}
                                            >
                                                <MediaPlaceholder
                                                    onSelect={el =>
                                                        this.handleChangeFeaturedPerson("imageUrl", el.url, 0)
                                                    }
                                                    allowedTypes={["image"]}
                                                    multiple={false}
                                                    labels={{ title: "Featured Person Image" }}
                                                />
                                            </div>
                                        </div>
                                        <div className={`${className}-featured-person__content`}>
                                            <RichText
                                                className={`${className}-featured-person__name`}
                                                onChange={value => this.handleChangeFeaturedPerson("name", value, 0)}
                                                value={tabs[0].member.name}
                                                tagName="div"
                                                placeholder={"Write name..."}
                                            />
                                            <RichText
                                                className={`${className}-featured-person__role`}
                                                onChange={value => this.handleChangeFeaturedPerson("role", value, 0)}
                                                value={tabs[0].member.role}
                                                tagName="div"
                                                placeholder={"Write role..."}
                                            />
                                            <RichText
                                                className={`${className}-featured-person__copy`}
                                                onChange={value => this.handleChangeFeaturedPerson("copy", value, 0)}
                                                value={tabs[0].member.copy}
                                                tagName="div"
                                                placeholder={"Write copy..."}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${className}-boards`}>
                                        {tabs[0].boards.map((board, boardIndex) => {
                                            return (
                                                <div className={`${className}-boards-item`} key={boardIndex}>
                                                    <div className={`${className}-boards-item__header`}>
                                                        <RichText
                                                            className={`${className}-boards-item__headline`}
                                                            onChange={value =>
                                                                this.handleChangeBoard("headline", value, boardIndex, 0)
                                                            }
                                                            value={board.headline}
                                                            tagName="h3"
                                                            placeholder={"Write headline..."}
                                                        />
                                                        <RichText
                                                            className={`${className}-boards-item__subline`}
                                                            onChange={value =>
                                                                this.handleChangeBoard("subline", value, boardIndex, 0)
                                                            }
                                                            value={board.subline}
                                                            tagName="h4"
                                                            placeholder={"Write Subline..."}
                                                        />
                                                    </div>
                                                    <div className={`${className}-boards-item__list-columns`}>
                                                        {board.lists.map((list, listIndex) => {
                                                            return (
                                                                <div
                                                                    className={`${className}-boards-item__list`}
                                                                    key={listIndex}
                                                                >
                                                                    <RichText
                                                                        className={`${className}-boards-item__list-title`}
                                                                        onChange={value =>
                                                                            this.handleChangeBoardList(
                                                                                "title",
                                                                                value,
                                                                                listIndex,
                                                                                boardIndex,
                                                                                0
                                                                            )
                                                                        }
                                                                        value={list.title}
                                                                        tagName="p"
                                                                        placeholder={"Write title..."}
                                                                    />

                                                                    <RichText
                                                                        className={`${className}-boards-item__list-item`}
                                                                        onChange={value =>
                                                                            this.handleChangeBoardList(
                                                                                "items",
                                                                                value,
                                                                                listIndex,
                                                                                boardIndex,
                                                                                0
                                                                            )
                                                                        }
                                                                        value={list.items}
                                                                        tagName="ul"
                                                                        multiline="li"
                                                                        placeholder={"Write list..."}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Container>
                            </Tab>

                            <Tab eventKey={tabs[1].slug} title={tabs[1].name}>
                                <Container>
                                    <RichText
                                        className={`${className}__tabs-headline`}
                                        onChange={value => this.handleChangeTab("headline", value, 1)}
                                        value={tabs[1].headline}
                                        tagName="h3"
                                        placeholder={"Write headline..."}
                                    />
                                    <RichText
                                        className={`${className}__tabs-copy`}
                                        onChange={value => this.handleChangeTab("copy", value, 1)}
                                        value={tabs[1].copy}
                                        tagName="p"
                                        placeholder={"Write copy..."}
                                    />

                                    <div className={`${className}__tabs-accordions`}>
                                        <div id={`${tabs[1].slug}-accordion`}>
                                            {tabs[1].accordions.map((accordion, index) => {
                                                return (
                                                    <div className="item" key={index}>
                                                        <button
                                                            className="accordion-heading collapsed"
                                                            data-toggle="collapse"
                                                            data-target={`#${tabs[1].slug}-collapse-0${index}`}
                                                        >
                                                            <span>{accordion.title}</span>
                                                            <i className="ldc-icon ldc-icon-accordion-up"></i>
                                                        </button>

                                                        <div
                                                            id={`${tabs[1].slug}-collapse-0${index}`}
                                                            className="collapse"
                                                            data-parent={`#${tabs[1].slug}-accordion`}
                                                        >
                                                            <div className="accordion-body">
                                                                <RichText
                                                                    onChange={copy =>
                                                                        this.handleAccordionChange(
                                                                            "copy",
                                                                            copy,
                                                                            index,
                                                                            1
                                                                        )
                                                                    }
                                                                    value={accordion.copy}
                                                                    tagName="p"
                                                                    placeholder={"Write copy...."}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Container>
                            </Tab>

                            <Tab eventKey={tabs[2].slug} title={tabs[2].name}>
                                <Container>
                                    <RichText
                                        className={`${className}__tabs-headline`}
                                        onChange={value => this.handleChangeTab("headline", value, 2)}
                                        value={tabs[2].headline}
                                        tagName="h3"
                                        placeholder={"Write headline..."}
                                    />
                                    <RichText
                                        className={`${className}__tabs-copy`}
                                        onChange={value => this.handleChangeTab("copy", value, 2)}
                                        value={tabs[2].copy}
                                        tagName="p"
                                        placeholder={"Write copy..."}
                                    />

                                    <div className={`${className}__tabs-accordions`}>
                                        <div id={`${tabs[2].slug}-accordion`}>
                                            {tabs[2].accordions.map((accordion, index) => {
                                                return (
                                                    <div className="item" key={index}>
                                                        <button
                                                            className="accordion-heading collapsed"
                                                            data-toggle="collapse"
                                                            data-target={`#${tabs[2].slug}-collapse-0${index}`}
                                                        >
                                                            <span>{accordion.title}</span>
                                                            <i className="ldc-icon ldc-icon-accordion-up"></i>
                                                        </button>

                                                        <div
                                                            id={`${tabs[2].slug}-collapse-0${index}`}
                                                            className="collapse"
                                                            data-parent={`#${tabs[2].slug}-accordion`}
                                                        >
                                                            <div className="accordion-body">
                                                                <RichText
                                                                    onChange={copy =>
                                                                        this.handleAccordionChange(
                                                                            "copy",
                                                                            copy,
                                                                            index,
                                                                            2
                                                                        )
                                                                    }
                                                                    value={accordion.copy}
                                                                    tagName="div"
                                                                    placeholder={"Write copy..."}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Container>
                            </Tab>
                        
                        </Tabs>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default GovernanceTabbetContentEdit;
