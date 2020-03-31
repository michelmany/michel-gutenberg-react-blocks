const { Component } = wp.element

class ViewTemplate extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            linkImage: '',
            defaultFeatured: ''
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({ defaultFeatured: nextProps.featured })
    }

    handleReqImage() {

        const featureMedia = this.props.page.featured_media
        if(featureMedia != 0) {
            fetch(`${siteUrl}/wp-json/wp/v2/media/${featureMedia}`, {
                method: 'GET'
            })
            .then(resp => resp.json())
            .then(data => {
                this.setState({linkImage: data.source_url})
            })
            .catch(e => console.log(e))
        }
        
    }

    componentDidMount() {
        this.handleReqImage()
    }


    render() {

        let imageUrl = this.state.defaultFeatured
        if(this.state.linkImage && this.state.linkImage.length > 0) {
            imageUrl = this.state.linkImage
        } 

        const styleImage = {
            backgroundImage: 'url(' + imageUrl + ')'
        }
            
        
        return (
            
            <div className={"wp-block-ldc-search-and-results__item col-lg-12 " + this.props.classTemplate }>
                <div className="row wp-block-ldc-search-and-results__posts-section">
                    <div className="col-lg-2 col-md-3 wp-block-ldc-search-and-results__posts-section-image">
                        <div 
                            className={`wp-block-ldc-search-and-results__image-block`}
                            style={styleImage}
                            
                        ></div>
                    </div>
                    <div className="col-lg-10 col-md-9 wp-block-ldc-search-and-results__posts-section-content">
                        <div className="wp-block-ldc-search-and-results__name">{this.props.nameType}</div>
                        <div className="wp-block-ldc-search-and-results__title" dangerouslySetInnerHTML={{__html: this.props.page.title.rendered}} />
                        <div className="wp-block-ldc-search-and-results__content" dangerouslySetInnerHTML={{__html: this.props.page.excerpt.rendered}} />
                        <div className="wp-block-ldc-search-and-results__readmore">
                            <a href={this.props.page.link}>Read more</a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default ViewTemplate
