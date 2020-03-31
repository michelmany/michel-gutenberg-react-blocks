import { Component, render } from "@wordpress/element";
import ProductSidebar from './productsidebar'
import { __ } from '@wordpress/i18n';
import axios from 'axios'

class ViewMobileSidebar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeListingsProducts: false,
      activeMobileCategory: false,
      isAjaxLoading: false
    }

    this.handleClickMobile = this.handleClickMobile.bind(this);

  }

  handleClickMobile(e) {

    const arrowMobile = document.querySelector('.block-what-we-do__mobile-arrow')
    const sidebarSelect = document.querySelector('.block-what-we-do__sidebar')
    const {activeMobileCategory} = this.state

    if(activeMobileCategory) {
      arrowMobile.classList.remove('block-what-we-do__mobile-arrow_active')
      sidebarSelect.classList.remove('block-what-we-do__sidebar_active')
      this.setState({activeMobileCategory: false})
    } else {
      arrowMobile.classList.add('block-what-we-do__mobile-arrow_active')
      sidebarSelect.classList.add('block-what-we-do__sidebar_active')
      this.setState({activeMobileCategory: true})
    }


  }

  render() {

    return (
      <>
        <div className={`block-what-we-do__mobile`} onClick={this.handleClickMobile}>
            <span className={`block-what-we-do__mobile-text`}>
                { __( 'Select a product category from the dropdown' ) }
            </span>
            <span className={`block-what-we-do__mobile-text_phone`}>
                { __( 'Select a product category' ) }
            </span>
        </div>
      </>
    )
  }

}

const viewMSidebar = document.querySelector(".block-what-we-do__mobile-sidebar");
if (viewMSidebar) render(<ViewMobileSidebar />, viewMSidebar);

class ViewSidebar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      listCat: [],
      activeListingsProducts: false,
      activeMobileCategory: false
    }

    this.handleClickCategory = this.handleClickCategory.bind(this);

  }

  fetchListCat() {

    let listCat = `${siteUrl}/wp-json/wp/v2/product-category?lang=${siteLang}`

    fetch(listCat, {
      method: 'GET'
    })
      .then(resp => resp.json())
      .then(data => this.setState({ listCat: data }))
      .catch(e => console.log(e))

  }

  componentDidMount() {
    this.fetchListCat()
  }

  handleClickCategory(e) {
    const dataSlug = e.target.getAttribute('data-slug')
    const dataName = e.target.getAttribute('data-name')
    const viewContent = document.querySelector(".block-what-we-do__content")

    window.location.replace(`${siteUrl}/product-category/${dataSlug}`)

  }

  render() {

    const { listCat } = this.state

    return (
      <>
        <ul className="block-what-we-do__list-categories">
          {listCat
            ? listCat.map((cat) => {
              return [
                <>
                  <li key={cat} className={`block-what-we-do__products-${cat.id}`} >
                    <a href={cat.link} onClick={this.handleClickCategory} data-id={cat.id} data-name={cat.name} data-slug={cat.slug} dangerouslySetInnerHTML={{__html: cat.name}}></a>
                  </li>
                </>
              ]
            })
            : 'Nothing to show'
          }
        </ul>
      </>
    )
  }

}

const viewSidebar = document.querySelector(".block-what-we-do__sidebar");
if (viewSidebar) render(<ViewSidebar />, viewSidebar);


class ViewContent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      listCat: [],
      activeListingsProducts: false,
      activeMobileCategory: false
    }

  }

  fetchListCat() {

    let listCat = `${siteUrl}/wp-json/wp/v2/product-category?lang=${siteLang}`

    fetch(listCat, {
      method: 'GET'
    })
      .then(resp => resp.json())
      .then(data => this.setState({ listCat: data }))
      .catch(e => console.log(e))

  }

  componentDidMount() {
    this.fetchListCat()
  }

  render() {

    const { listCat } = this.state

    return (
      <>
        {listCat.length != 0
          ? listCat.map(cat => {
            return (
              <div key={cat} className={`col-md-6 col-lg-6 col-sm-12 block-what-we-do__category`}>

                <a href={cat.link} className={`block-what-we-do__image lazyload`} data-bg={cat.acf.image}>
                  <div className={`block-what-we-do__image-cat`}></div>
                  <h3 dangerouslySetInnerHTML={{__html: cat.name}} />
                </a>
              </div>
            )
          })
          : null
        }
      </>
    )
  }

}

const viewContent = document.querySelector(".block-what-we-do__categories");
if (viewContent) render(<ViewContent />, viewContent);
