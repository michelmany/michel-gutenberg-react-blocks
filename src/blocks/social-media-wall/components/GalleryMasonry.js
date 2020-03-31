import { Component, useState, useEffect } from '@wordpress/element';
import Elements from './Elements'
import { Button } from 'react-bootstrap';
import Isotope from "isotope-layout/js/isotope";

const IsotopeReact = (e) => {
    
    const [isotope, setIsotope] = useState(null);
    
    const [filterKey, setFilterKey] = useState("*");

    const [classGrid, setClassGrid] = useState("row showAllSocial")
  
    useEffect(() => {
      setTimeout(() => {
        setIsotope(
          new Isotope(".showAllSocial", {
            itemSelector: ".items",
            layoutMode: "fitRows"
          })
        );
      }, 2000)
    }, []);
  
    useEffect(
      () => {
        if (isotope) {
          filterKey === "*"
            ? isotope.arrange({ filter: `*` })
            : isotope.arrange({ filter: `.${filterKey}` });
        }
      },
      [isotope, filterKey]
    );

    const removeIdMasonry = () => {
      const getPostsWithActive = document.querySelector('#active-filter-masonry')
      getPostsWithActive.removeAttribute('id')
    }

    const handleAll = (e) => {
      setFilterKey("*")
      setClassGrid('row showAllSocial')
      removeIdMasonry()
      e.target.setAttribute('id', 'active-filter-masonry')
    }

    const handleLinkedin = (e) => {
      setFilterKey("linkedin")
      setClassGrid('row showAllSocial')
      removeIdMasonry()
      e.target.setAttribute('id', 'active-filter-masonry')
    }

    const handleTwitter = (e) => {
      setFilterKey("twitter")
      setClassGrid('row showAllSocial')
      removeIdMasonry()
      e.target.setAttribute('id', 'active-filter-masonry')

    }

    const handleYoutube = (e) => {
      setFilterKey("youtube")
      setClassGrid('row showAllSocial youtube__active')
      removeIdMasonry()
      e.target.setAttribute('id', 'active-filter-masonry')

    }
  
    return (
      <>
        <div className="filter-masonry">
            <Button variant="link" onClick={handleAll}><span id="active-filter-masonry" className={"filter-masonry_inner"}>All</span></Button>
            <Button variant="link" onClick={handleLinkedin}><span className={"filter-masonry_inner"}>Linkedin</span></Button>
            <Button variant="link" onClick={handleTwitter}><span className={"filter-masonry_inner"}>Twitter</span></Button>
            <Button variant="link" onClick={handleYoutube}><span className={"filter-masonry_inner"}>Youtube</span></Button>
        </div>
        <div className={classGrid}>
            <Elements />
        </div>
      </>
    );
};

class GalleryMasonry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            class: 'row showAllSocial'
        }
    }

    render() {
    
        return (
            <div className="section-masonry">
                <IsotopeReact data={this.state.class}/>    
            </div>
        );
    }


}

export default GalleryMasonry