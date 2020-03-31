const { Component, render } = wp.element
import GalleryMasonry from './components/GalleryMasonry'

class ViewSocial extends Component {

    render() {

        return (
            <div className="container-fluid">
                <div className="container">
                        <GalleryMasonry /> 
                </div>
            </div>
        )


    }

}

// jQuery code for first tabination name
jQuery(document).ready(function() {
    jQuery(window).load(function () {
        setTimeout(() => {
            jQuery('.j-display-filters li.all').addClass('highlight');
        }, 1000)
    });
});

//const socialWallView = document.querySelector(".wp-block-ldc-social-media-wall");
//if (socialWallView) render(<ViewSocial />, socialWallView);