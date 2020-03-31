const { Component } = wp.element;
const { RichText } = wp.editor;

class Edit extends Component {
    render() {
        const { content } = this.props.attributes;
        const { className, setAttributes } = this.props;

        return [
            <div className={`container ${className}__editor-container`}>
                <RichText
                    tagName="h2"
                    value={content}
                    className={`${className}__editor-content`}
                    onChange={content => setAttributes({ content })}
                />
            </div>
        ];
    }
}

export default Edit;
