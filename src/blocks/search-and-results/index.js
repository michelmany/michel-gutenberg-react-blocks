import { registerBlockType } from '@wordpress/blocks'
import edit from './edit'

const attributes = {
}

registerBlockType('ldc/search-and-results', {
    title: 'Search and Results Page',
    description: 'Search and Results Page Block',
    category: 'ldc-blocks',
    icon: 'laptop',
    keywords: ['Search', 'Results', 'Search and Results Page'],
    attributes,
    edit,
    save: () => {
        return <div></div>
    }
})