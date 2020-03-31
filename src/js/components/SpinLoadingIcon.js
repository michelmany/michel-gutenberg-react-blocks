import icon from "../../assets/images/spin-loading.svg";

const style = {
    width: 120
};

const SpinLoadingIcon = props => {
    const { width } = props;
    return (
        <div class="text-center">
            <img
                class="spin-loading-icon"
                style={{ width: width != undefined ? width : style.width }}
                src={icon}
            />
        </div>
    );
};

export default SpinLoadingIcon;
