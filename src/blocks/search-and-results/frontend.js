const { Component, render } = wp.element
import ViewSearchContent from './components/searchcontent'

class ViewSR extends Component {

    render() {

        return (
            <>
                <div className={`wp-block-ldc-search-and-results__search-title container-fluid`}>
                    <div className={`container`}>
                        <h1>Search and Results</h1>
                    </div>
                </div>
                <ViewSearchContent />
            </>
        )
    }

}

const searchResultaView = document.querySelector(".wp-block-ldc-search-and-results");
if (searchResultaView) render(<ViewSR />, searchResultaView);