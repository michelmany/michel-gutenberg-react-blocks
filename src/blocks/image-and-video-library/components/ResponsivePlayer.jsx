import ReactPlayer from "react-player";
import "./responsive-player.sass";

const ResponsivePlayer = ({ url, controls }) => {
    return (
        <div className="player-wrapper">
            <ReactPlayer className="react-player" url={url} width="100%" height="100%" controls={controls} />
        </div>
    );
};

export default ResponsivePlayer;
