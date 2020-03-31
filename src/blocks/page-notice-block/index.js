const { registerBlockType, getBlockDefaultClassName } = wp.blocks;
import edit from "./edit";

const attributes = {
    title: {
        type: "string",
        selector: "h2",
        default: "Important Notice"
    },
    copy: {
        type: "string",
        selector: "p",
        default: "Any seller that delivers commodities that include, are produced from, are tainted or contaminated by, or contain any amount of, GMO seed or GMO events not approved in all export markets shall be in breach of its contract with Ide and liable for all resulting direct and consequential damages, including, without limitation, any losses arising from facility closure."
    },
    url: {
        type: "string",
    }
};

registerBlockType("ldc/page-notice-block", {
    title: "Page Notice Block",
    description: "US Facilities - Page Notice Block",
    icon: "laptop", 
    category: "ldc-blocks",
    keywords: ['notice', 'page notice block'],

    attributes,

    edit,

    save: ({attributes}) => {
        const className = getBlockDefaultClassName('ldc/page-notice-block'); // For BEM classes
        const { title, copy, url } = attributes;
        
        

        return (
            <div>
                
                <div className={`${className}__close-box`}>
                    <svg id={`${className}__close`} width="26" height="26" className={`${className}__close`} xmlns="http://www.w3.org/2000/svg"><g fill="#717171" fill-rule="nonzero"><path d="M13 0C5.832 0 0 5.832 0 13s5.832 13 13 13 13-5.832 13-13S20.168 0 13 0zm0 25C6.384 25 1 19.616 1 13S6.384 1 13 1s12 5.384 12 12-5.384 12-12 12z"/><path d="M16.916 9.084a.403.403 0 00-.57 0L13 12.43 9.655 9.084a.403.403 0 10-.57.57L12.43 13l-3.346 3.345a.403.403 0 10.57.57L13 13.57l3.345 3.346a.402.402 0 00.57 0 .403.403 0 000-.57L13.57 13l3.346-3.345a.403.403 0 000-.57z"/></g></svg>
                </div>

                {title 
                ? <h2 className={`${className}__title`}>{title}</h2>
                : ''
                }

                {copy
                ? <p className={`${className}__copy`}>{copy}</p>
                : ''
                }

                {url 
                ?   <div className={`${className}__link-box`}>
                        <a className={`${className}__link`} href={url}>{`Find out more`}</a>
                    </div>
                : ''
                }
                <script type="text/javascript">
                    
                </script>

            </div>
        )
    }
});
