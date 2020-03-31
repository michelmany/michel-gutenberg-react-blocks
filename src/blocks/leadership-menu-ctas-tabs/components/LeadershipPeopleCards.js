const { Fragment, useState, useEffect } = wp.element;
const { __ } = wp.i18n;
import { Modal, Tabs, Tab } from "react-bootstrap";
import FeaturedPerson from "./FeaturedPerson";

const LeadershipPeopleCards = ({ categories, people, featuredPersonId, className }) => {
    const [activeMenuTab, setActiveMenuTab] = useState("senior-leadership-team");
    const [showModal, setShowModal] = useState(false);
    const [modalPersonIndex, setModalPersonIndex] = useState(0);
    const [isPrevDisable, setIsPrevDisable] = useState(false);
    const [isNextDisable, setIsNextDisable] = useState(false);

    const featuredPerson = _.find(people, person => person.id === featuredPersonId);

    const peopleList = [];
    categories.map((category, key) => {
        peopleList[key] = people.filter(
            person =>
                person["leadership-category"][0] === category.id && person.id !== featuredPersonId
        );
    });

    const handleCloseModal = () => {
      setShowModal(false)
    };

    const handleShowModal = personId => {
        const personIndex = _.findIndex(people, { id: personId });

        setModalPersonIndex(personIndex);
        setShowModal(true);
        location.hash = '#' + personId
    };

    const handlePrevPersonModal = () => {
        if (modalPersonIndex > 0) {
            setModalPersonIndex(modalPersonIndex - 1);
        }
        if( modalPersonIndex <= 0 ){
          setModalPersonIndex( people.length - 1 );
        }
    };

    const handleNextPersonModal = () => {
        if (modalPersonIndex < people.length - 1) {
            setModalPersonIndex(modalPersonIndex + 1);
        }
        if( modalPersonIndex >= (people.length - 1) ){
          setModalPersonIndex(0);
        }
    };

    const checkModalControls = () => {
        if (modalPersonIndex === 0) {

        }

        if (modalPersonIndex === people.length - 1) {

        }

        if (modalPersonIndex !== 0 && modalPersonIndex !== people.length - 1) {
            setIsPrevDisable(false);
            setIsNextDisable(false);
        }
    };

    useEffect(() => {
        checkModalControls();
    }, [modalPersonIndex]);

    useEffect(() => {
      if( location.hash ){
        const urlPerson = _.find(people, person => person.id === parseInt(location.hash.substr(1)));
        console.log( urlPerson )
        if( urlPerson ){
          handleShowModal( urlPerson.id )
        }
      }
    }, [] )

    return (
        <Fragment>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                size="lg"
                dialogClassName={`${className}__profile-modal`}
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="profile-modal-body">
                        <div className="profile-modal__image-container">
                            <div class="profile-modal__image-container-overlay"></div>
                            <img
                                src={people[modalPersonIndex].featured_img_url}
                                className="profile-modal__image"
                            />
                        </div>
                        <div className="profile-modal__content">
                            <div className="profile-modal__content-name">
                                {people[modalPersonIndex].title.rendered}
                            </div>
                            <div className="profile-modal__content-role">
                                {people[modalPersonIndex].acf.leader_role}
                            </div>
                            <div
                                className="profile-modal__content-info"
                                dangerouslySetInnerHTML={{
                                    __html: people[modalPersonIndex].content.rendered
                                }}
                            ></div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/*<i
                        class={`ldc-icon ldc-icon-modal-prev ${
                            isPrevDisable
                                ? "profile-modal__icons is-disable"
                                : "profile-modal__icons"
                        }`}
                        onClick={handlePrevPersonModal}
                    ></i>

                    <i
                        class={`ldc-icon ldc-icon-modal-next ${
                            isNextDisable
                                ? "profile-modal__icons is-disable"
                                : "profile-modal__icons"
                        }`}
                        onClick={handleNextPersonModal}
                    ></i>*/}
                </Modal.Footer>
            </Modal>

            <FeaturedPerson featuredPerson={featuredPerson} handleShowModal={handleShowModal} />

            <div className={`${className}__tabs-menu`}>
                <Tabs
                    id={`${className}-tabs`}
                    activeKey={activeMenuTab}
                    onSelect={k => setActiveMenuTab(k)}
                    variant="pills"
                    className={`${className}__tabs`}
                >
                    {categories.map((category, key) => {
                        return (
                            <Tab eventKey={category.slug} title={category.name}>
                                <div className="people-listing__cards">
                                    <div className="container">
                                        <div className="people-listing__cards-wrapper">
                                            {peopleList[key].map(person => {
                                                return (
                                                    <div
                                                        className="people-listing__cards--item people-listing-item"
                                                        key={person.id}
                                                        onClick={() => handleShowModal(person.id)}
                                                    >
                                                        <div className="people-listing-item__overlay"></div>
                                                        <div className="people-listing-item__content">
                                                            <h2 className="people-listing-item__title">
                                                                {person.title.rendered}
                                                            </h2>
                                                            <p className="people-listing-item__role">
                                                                {person.acf.leader_role}
                                                            </p>
                                                            <button className="people-listing-item__cta">
                                                                {__("See Profile")}
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="people-listing-item__image"
                                                            style={{
                                                                backgroundImage: `url(${person.featured_img_url})`
                                                            }}
                                                        ></div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* <div className="people-listing__cards-load-more">
                                <button className="ldc-button ldc-button--green">
                                    Load more
                                </button>
                            </div> */}
                                    </div>
                                </div>
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </Fragment>
    );
};

export default LeadershipPeopleCards;
