const { Fragment } = wp.element;
const { __ } = wp.i18n;
import { excerpt } from "../../../js/helpers";

const FeaturedPerson = props => {
    const className = "wp-block-ldc-leadership-menu-ctas-tabs";
    const { featuredPerson, handleShowModal } = props;

    return (
        <Fragment>
            {featuredPerson && (
                <div className="container">
                    <div className={`${className}__featured-person`}>
                        <div
                            className="featured-person__image-container"
                            onClick={() => handleShowModal(featuredPerson.id)}
                        >
                            <div class="featured-person__image-container-overlay"></div>
                            <div
                                className="featured-person__image"
                                style={{
                                    backgroundImage: `url(${featuredPerson.featured_img_url})`
                                }}
                            ></div>
                        </div>
                        <div className="featured-person__content">
                            <div className="featured-person__content-name">
                                {featuredPerson.title.rendered}
                            </div>
                            <div className="featured-person__content-role">
                                {featuredPerson.acf.leader_role}
                            </div>
                            <div
                                className="featured-person__content-info"
                                dangerouslySetInnerHTML={{
                                    __html: excerpt(featuredPerson.content.rendered, 189)
                                }}
                            ></div>
                            <div className="featured-person__content-cta">
                                <button
                                    className="featured-person__content-cta-button"
                                    onClick={() => handleShowModal(featuredPerson.id)}
                                >
                                    {__("See profile")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default FeaturedPerson;
