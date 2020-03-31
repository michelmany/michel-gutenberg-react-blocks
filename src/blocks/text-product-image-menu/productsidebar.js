import { Component } from '@wordpress/element'

class ProductSidebar extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            listProducts: []
        }

    }

    componentDidMount() {

            fetch(`/wp-json/wp/v2/product?product-category=${this.props.data}&order=asc`, {
                method: 'GET'
            })
            .then(resp => resp.json())
            .then(data => {
                this.setState({listProducts: data})
            })
            .catch(e => console.log(e))
    }

    render() {

        const { listProducts } = this.state

        return (
            <>
                {listProducts
                    ?  listProducts.map(post => {
                        return (
                            <>
                                <li>
                                    <a href={post.link} dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                                </li>
                            </>
                        )
                    })
                    : null
                }
            </>
        )
    }

}

export default ProductSidebar