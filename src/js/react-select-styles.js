const selectCustomStyles = {
    option: (provided, state) => ({
        ...provided,
        border: 0,
        color: "#676767",
        backgroundColor: state.isSelected || state.isFocused ? "#F3F3F3" : null,
        ":active": {
            ...provided[":active"],
            backgroundColor: "#F3F3F3"
        }
    }),
    control: (provided, state) => ({
        ...provided,
        width: 200
    }),
    menu: (provided, state) => ({
        ...provided,
        marginTop: 0
    })
};

export default selectCustomStyles;
