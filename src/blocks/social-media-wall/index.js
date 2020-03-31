import { registerBlockType } from '@wordpress/blocks'
import edit from './edit'

const attributes = {
    shortcode: {
        type: 'string'
    }
}

registerBlockType('ldc/social-media-wall', {
    title: 'Social Media Wall',
    description: 'Social Media Wall Block',
    category: 'ldc-blocks',
    icon: 'laptop',
    keywords: ['Social', 'Media', 'Wall', 'Social Media Wall'],
    attributes,
    edit,
    save: ({attributes}) => {
        const { shortcode } = attributes;
        return (
            <div className={`container-fluid`}>
                <div className={`container`}> 
                    {shortcode}
                </div>
            </div>
        )
    }
})