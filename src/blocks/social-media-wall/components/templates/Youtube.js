import { Component } from "@wordpress/element";
import imgVideo from "./assets/selector.png";

class TemplateYoutube extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePop: false
        };
    }

    render() {
        const newDate = () => {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            const data = new Date(this.props.data.snippet.publishedAt);
            return "Published on " + months[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
        };

        const handleClick = e => {
            const dataID = e.currentTarget.dataset.id;
            const activePop = this.state.activePop;
            if (activePop) {
                const getElement = document.getElementById(dataID);
                getElement.classList.remove("active__youtube__popup");
                this.setState({ activePop: false });
            } else {
                const getElement = document.getElementById(dataID);
                getElement.classList.add("active__youtube__popup");
                this.setState({ activePop: true });
            }
        };

        return (
            <div className="container-block">
                <div
                    className="container-block_image"
                    style={{ backgroundImage: `url(${this.props.data.snippet.thumbnails.high.url})` }}
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="youtube"
                        class="svg-inline--fa fa-youtube fa-w-18 container-block_image_youtube"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                            fill="currentColor"
                            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                        ></path>
                    </svg>
                    <div
                        className="container-block_image_overlay"
                        id={`youtbube_id_${this.props.data.id.videoId}`}
                        onClick={handleClick}
                        data-id={`youtbube_id_${this.props.data.id.videoId}`}
                    >
                        <div className="container-block_image_overlay_inner">
                            <img src={imgVideo} />
                        </div>
                        <div className="block-youtube-popup">
                            <div className="block-youtube-popup_inner">
                                <div
                                    className={`block-youtube-popup_inner_in youtbube_id_${this.props.data.id.videoId}`}
                                >
                                    <div>
                                        <iframe
                                            width="560"
                                            height="315"
                                            src={"https://www.youtube.com/embed/" + this.props.data.id.videoId}
                                            frameborder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                        ></iframe>
                                    </div>
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="times-circle"
                                        className={`svg-inline--fa fa-times-circle fa-w-16 block-youtube-popup_inner_in_close popup_inner_in_close_${this.props.data.id.videoId}`}
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row container-block_info">
                    <div className="col-lg-1 container-block_info_logo">
                        <svg onClick={handleClick} viewBox="0 0 122 56.9" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m118.2 43.1c2.1 0 3.8-1.7 3.8-3.8s-1.7-3.8-3.8-3.8-3.8 1.7-3.8 3.8 1.7 3.8 3.8 3.8"
                                fill="#4e9d2d"
                            />
                            <path
                                d="m11.4 35.3c0 2.9.2 4 1.5 4.5s3.4.6 6.4.6c6.3 0 9.6-.8 10.8-8.7h1.8l-.7 10.8h-31.2v-1.7c5.3-.4 5.4-.5 5.4-3.8v-30.5c0-3.4-.1-3.5-5.4-3.9v-1.7h17.1v1.7c-5.6.4-5.8.5-5.8 3.8v28.9zm32.8-.3c0 4.7 1 5.4 6.3 5.4 10.1 0 17.5-4 17.5-19.2 0-10.2-3.8-18-16.8-18.2-6.4 0-7 .3-7 3.4zm8.6-34.1c7.2.1 12.6 1.6 16.5 5.2 3.7 3.5 5.4 8.8 5.4 14.8 0 9-3.4 14.6-7.8 17.7s-9.9 3.8-15.3 3.8h-18.8v-1.7c5.3-.4 5.4-.5 5.4-3.8v-30.4c0-3.4-.1-3.5-5.4-3.8v-1.8zm58.9 10.8h-1.8c-1.1-7.1-5.4-9.6-11.5-9.6-11.3-.1-15.2 9.9-15.2 19.7 0 7.3 2.6 19.5 15 19.5 7.9 0 10.9-4.6 12.6-10.8h1.8l-.8 10c-2.9 1.6-8.4 2.9-13.2 2.9-6.7 0-12.6-1.4-16.4-5.1-3.6-3.6-5.7-9.3-5.7-16.3 0-6.8 2-12 5.5-15.8 3.6-4 9.6-6.2 17-6.2 5.5 0 10 1.1 12.7 2.3z"
                                fill="#32556e"
                            />
                            <path
                                d="m2.2 54.1h2.9v.9h-4v-6.4h1.1zm3-1.6c0-.5.1-.9.3-1.3s.4-.7.8-.9c.3-.2.7-.3 1.2-.3.6 0 1.2.2 1.6.6s.6 1 .6 1.6v.3c0 .5-.1.9-.3 1.3s-.4.7-.8.9-.8.3-1.2.3c-.7 0-1.2-.2-1.6-.7-.4-.4-.6-1-.6-1.8zm1 .1c0 .5.1.9.3 1.1.2.3.5.4.8.4.4 0 .6-.1.8-.4s.3-.7.3-1.2-.1-.9-.3-1.1c-.1-.3-.4-.4-.7-.4s-.6.1-.8.4c-.3.3-.4.7-.4 1.2zm6.9 1.9c-.3.4-.8.6-1.3.6s-.9-.2-1.2-.5-.4-.7-.4-1.3v-3.1h1.1v3.1c0 .6.3.9.8.9s.9-.2 1.1-.6v-3.4h1.1v4.8h-1zm2-5.5c0-.2.1-.3.2-.4s.3-.2.4-.2.3.1.4.2.2.2.2.4-.1.3-.2.4-.3.2-.4.2-.3-.1-.4-.2-.2-.3-.2-.4zm1.1 6h-1.1v-4.8h1.1zm3.7-1.3c0-.2-.1-.3-.2-.4-.2-.1-.4-.2-.8-.3s-.7-.2-.9-.3c-.5-.3-.8-.6-.8-1.1 0-.4.2-.8.5-1 .3-.3.8-.4 1.3-.4.6 0 1 .1 1.4.4s.5.6.5 1.1h-1.1c0-.2-.1-.4-.2-.5-.2-.1-.4-.2-.6-.2s-.4.1-.6.2c-.1.1-.2.3-.2.4 0 .2.1.3.2.4s.4.2.8.3.7.2 1 .3c.2.1.4.3.5.5s.2.4.2.7c0 .4-.2.8-.5 1-.4.3-.8.4-1.4.4-.4 0-.7-.1-1-.2s-.5-.3-.7-.6-.3-.5-.3-.8h1c0 .3.1.4.3.6.2.1.4.2.7.2s.5-.1.6-.2c.3-.2.3-.4.3-.5zm4 1.3v-6.4h1.9c.6 0 1.1.1 1.5.4s.8.6 1 1.1.4 1 .4 1.6v.3c0 .6-.1 1.1-.4 1.6-.2.5-.6.8-1 1.1-.4.2-1 .4-1.5.4h-1.9zm1.1-5.6v4.6h.7c.6 0 1-.2 1.3-.5.3-.4.5-.9.5-1.6v-.4c0-.7-.2-1.2-.5-1.6s-.7-.5-1.3-.5zm7 1.8h-.4c-.5 0-.8.2-1 .6v3.2h-1.1v-4.8h1v.5c.3-.4.6-.6 1.1-.6.2 0 .3 0 .4.1zm2.6 3.8c-.7 0-1.2-.2-1.6-.6s-.6-1-.6-1.7v-.1c0-.5.1-.9.3-1.3s.4-.7.8-.9c.3-.2.7-.3 1.1-.3.6 0 1.1.2 1.5.6s.5 1 .5 1.8v.4h-3.1c0 .4.2.7.4.9s.5.3.9.3c.5 0 .9-.2 1.2-.6l.6.5c-.2.3-.4.5-.8.7-.5.3-.8.3-1.2.3zm-.2-4c-.3 0-.5.1-.7.3s-.3.5-.3.9h2v-.1c0-.4-.1-.6-.3-.8-.1-.2-.4-.3-.7-.3zm4.5 2.4 1-3.2h1.1l-1.9 5.5c-.3.8-.8 1.2-1.5 1.2-.2 0-.3 0-.5-.1v-.8h.2c.3 0 .5 0 .6-.1s.2-.3.3-.5l.2-.4-1.7-4.7h1.2zm3.3 1.6v-4h-.7v-.8h.7v-.4c0-.5.1-.9.4-1.2s.7-.4 1.2-.4c.2 0 .4 0 .6.1v.8h-.4c-.5 0-.8.3-.8.8v.4h1v.7h-1v4zm5.7-.5c-.3.4-.8.6-1.3.6s-.9-.2-1.2-.5-.4-.7-.4-1.3v-3.1h1.1v3.1c0 .6.3.9.8.9s.9-.2 1.1-.6v-3.4h1v4.8h-1zm4.8-.8c0-.2-.1-.3-.2-.4-.2-.2-.5-.3-.9-.3-.4-.1-.7-.2-.9-.3-.5-.3-.8-.6-.8-1.1 0-.4.2-.8.5-1 .3-.3.8-.4 1.3-.4.6 0 1 .1 1.4.4s.5.6.5 1.1h-1.1c0-.2-.1-.4-.2-.5-.2-.1-.4-.2-.6-.2s-.4.1-.6.2c-.1 0-.1.1-.1.3s.1.3.2.4.4.2.8.3.7.2 1 .3c.2.1.4.3.5.5s.2.4.2.7c0 .4-.2.8-.5 1-.4.3-.8.4-1.4.4-.4 0-.7-.1-1-.2s-.5-.3-.7-.6-.3-.5-.3-.8h1c0 .3.1.4.3.6.2.1.4.2.7.2s.5-.1.6-.2c.2-.1.3-.3.3-.4zm8.9-.8c-.1.7-.3 1.2-.8 1.6-.4.4-1 .6-1.8.6-.5 0-1-.1-1.3-.4-.4-.2-.7-.6-.9-1s-.3-1-.3-1.6v-.6c0-.6.1-1.1.3-1.6s.5-.8.9-1.1c.4-.2.9-.4 1.4-.4.7 0 1.3.2 1.7.6s.7.9.8 1.6h-1.1c-.1-.5-.2-.8-.4-1s-.5-.3-.9-.3c-.5 0-.9.2-1.1.5-.3.4-.4.9-.4 1.6v.6c0 .7.1 1.2.4 1.6.2.4.6.5 1.1.5.4 0 .8-.1 1-.3s.4-.5.4-1h1zm.5-.4c0-.5.1-.9.3-1.3s.4-.7.8-.9c.3-.2.7-.3 1.2-.3.6 0 1.2.2 1.6.6s.6 1 .6 1.6v.3c0 .5-.1.9-.3 1.3s-.4.7-.8.9c-.3.2-.7.3-1.2.3-.7 0-1.2-.2-1.6-.7-.4-.4-.6-1-.6-1.8zm1.1.1c0 .5.1.9.3 1.1.2.3.5.4.8.4.4 0 .6-.1.8-.4s.3-.7.3-1.2-.1-.9-.3-1.1c-.2-.3-.5-.4-.8-.4s-.6.1-.8.4-.3.7-.3 1.2zm5-2.4v.5c.3-.4.8-.6 1.4-.6s1.1.2 1.3.7c.3-.5.8-.7 1.5-.7.5 0 .9.1 1.2.4s.4.7.4 1.3v3.2h-1.1v-3.1c0-.3-.1-.5-.2-.7-.2-.1-.4-.2-.7-.2-.2 0-.4.1-.6.2s-.3.3-.3.5v3.3h-1.1v-3.1c0-.6-.3-.8-.9-.8-.4 0-.7.2-.9.5v3.4h-1.1v-4.8zm10.8 2.4c0 .7-.2 1.3-.5 1.8-.3.4-.8.7-1.3.7s-.9-.2-1.3-.5v2.3h-1.1v-6.6h1v.5c.3-.4.7-.6 1.3-.6s1 .2 1.4.6c.3.4.5 1 .5 1.8zm-1.1-.1c0-.5-.1-.9-.3-1.1-.2-.3-.5-.4-.8-.4-.4 0-.8.2-.9.5v2.1c.2.4.5.6.9.6.3 0 .6-.1.8-.4s.3-.7.3-1.3zm4.6 2.5c0-.1-.1-.2-.1-.4-.3.4-.8.5-1.2.5-.5 0-.9-.1-1.2-.4s-.5-.6-.5-1c0-.5.2-.9.6-1.2s.9-.4 1.6-.4h.7v-.3c0-.2-.1-.4-.2-.6-.1-.1-.3-.2-.6-.2-.2 0-.4.1-.6.2s-.2.3-.2.5h-1.1c0-.3.1-.5.3-.7s.4-.4.7-.5.6-.2 1-.2c.6 0 1 .1 1.3.4s.5.7.5 1.2v2.1c0 .4.1.8.2 1zm-1.1-.8c.2 0 .4-.1.6-.2s.3-.2.4-.4v-.9h-.6c-.4 0-.7.1-.9.2s-.3.3-.3.6c0 .2.1.4.2.5s.3.2.6.2zm4.1-4v.5c.4-.4.8-.6 1.4-.6 1 0 1.5.6 1.5 1.7v3.2h-1.1v-3.1c0-.3-.1-.5-.2-.7-.1-.1-.3-.2-.6-.2-.4 0-.8.2-1 .6v3.4h-1.1v-4.8zm5.5 3.2 1-3.2h1.1l-1.9 5.5c-.3.8-.8 1.2-1.5 1.2-.2 0-.3 0-.5-.1v-.8h.2c.3 0 .5 0 .6-.1s.2-.3.3-.5l.2-.4-1.7-4.7h1.2z"
                                fill="#4e9d2d"
                            />
                        </svg>
                    </div>
                    <div className="col-lg-10">
                        <div className="container-block_info_title">
                            <h3>{this.props.data.snippet.title}</h3>
                            <span className="container-block_info_title_description">{newDate()}</span>
                        </div>
                        <p>{this.props.data.snippet.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TemplateYoutube;
