const { Component } = wp.element
const { RichText, URLInputButton } = wp.editor 

class viewEdit extends Component {

    render() {

        const { className, attributes, setAttributes } = this.props;
        const { title, url, copy } = attributes;    

        return (
            <>
                <RichText
                    className={`${className}__title`}
                    value={title}
                    onChange={title => setAttributes({ title })}
                    tagName="h2"
                />
                <RichText
                    className={`${className}__copy`}
                    value={copy}
                    onChange={copy => setAttributes({ copy })}
                    tagName="p"
                />
                <URLInputButton
                    url={ url }
                    onChange={ ( url ) => setAttributes( { url } ) }
                />

            </>
        )
    }
}

export default viewEdit