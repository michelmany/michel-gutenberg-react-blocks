const { Fragment, useState, useEffect } = wp.element;
import { Modal } from "react-bootstrap";
import ResponsivePlayer from "./ResponsivePlayer.jsx";

const LibraryItems = ({ items, className }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeMedia, setActiveMedia] = useState();

    const handleShowModal = media => {
        setShowModal(true);
        setActiveMedia(media);
    };

    useEffect(() => {
        console.log(activeMedia);
    }, [activeMedia]);

    return (
        <div className={`${className}__items`}>
            <div className="row">
                {items &&
                    items.map(item => {
                        const itemFormat =
                            item.mime_type == "image/jpeg" ? "| jpg" : item.mime_type == "video/mp4" ? "| mp4" : "";
                        const itemType =
                            item.mime_type == "image/jpeg" ? "image" : item.mime_type == "video/mp4" ? "video" : "file";

                        // Only replace if cloudinarily
                        item.download_url = item.source_url.replace('cloudinary.com/ldc/image/upload/', 'cloudinary.com/ldc/image/upload/fl_attachment:download/');

                        return (
                            <Fragment>
                                <Modal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    centered
                                    size="lg"
                                    dialogClassName={`${className}__modal`}
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {activeMedia && (
                                            <>
                                                {activeMedia.media_type === "file" &&
                                                    activeMedia.mime_type === "video/mp4" && (
                                                        <ResponsivePlayer
                                                            url={activeMedia.source_url}
                                                            controls={true}
                                                        />
                                                    )}
                                                {activeMedia.media_type === "image" && (
                                                    <img
                                                        src={activeMedia.source_url}
                                                        alt={activeMedia.title.rendered}
                                                        className="img-responsive"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </Modal.Body>
                                    <Modal.Footer></Modal.Footer>
                                </Modal>

                                <div className="col-md-6 col-lg-4" key={item.id}>
                                    <div className="wp-block-ldc-image-and-video-library__item">
                                        {item.media_type === "image" && (
                                            <div
                                                className="item__image"
                                                style={{ backgroundImage: `url(${item.source_url})` }}
                                                onClick={() => handleShowModal(item)}
                                            ></div>
                                        )}

                                        {item.mime_type === "video/mp4" && (
                                            <div
                                                className="item__image"
                                                style={{ backgroundImage: `url(${item.acf.video_thumbnail})` }}
                                                onClick={() => handleShowModal(item)}
                                            >
                                                <div className="item__video-overlay">
                                                    <i className="ldc-icon ldc-icon-library-video-play"></i>
                                                </div>
                                            </div>
                                        )}

                                        <div className="item__title">{item.title.rendered}</div>

                                        <div className="item__details">
                                            {`${item.filesize} (${item.media_details.width}x${item.media_details.height}) ${itemFormat}`}
                                        </div>

                                        <a className="item__cta" href={item.download_url} download>
                                            <i className="ldc-icon ldc-icon-library-download--green"></i>
                                            <span>Download {itemType}</span>
                                        </a>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
            </div>
        </div>
    );
};

export default LibraryItems;
