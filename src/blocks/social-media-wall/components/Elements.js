import { Component } from '@wordpress/element'
//import Linkedin from './requests/Linkedin'
import TemplateTwitter from './templates/Twitter'
import TemplateLinkedin from './templates/Linkedin'
import TemplateYoutube from './templates/Youtube'

class Elements extends Component {

    constructor(props) {
        super(props)

        this.state = {
            youtubeAPI: [],
            twitterAPI: []
        }

    }

    componentDidMount() {

        // get api youtube
        fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyDBVV6e4Afldka51vqFgaipCf08YOP4XWs&channelId=UCudmrVrWjfb5FdRm_1yrtUA&part=snippet,id&order=date&maxResults=4')
        .then(resp => resp.json())
        .then(data => this.setState( { youtubeAPI: data.items } ))
        .catch(e => { console.log(e) });

        // get api twitter
        fetch("/wp-content/plugins/ldc2020-blocks/src/blocks/social-media-wall/components/requests/twitter.php", {
            method: "GET",
        })
        .then(resp => resp.json())
        .then(data => this.setState( { twitterAPI: data } ))
        .catch(e => { console.log(e) });

    }

    render() {

        const Youtube = [
            {
                class: 'youtube',
                object: this.state.youtubeAPI
            }
        ]
        const Twitter = [
            {
                class: 'twitter',
                object: this.state.twitterAPI
            }
        ]
        
        const elementi = []
        elementi.push(...Twitter)
        //elementi.push(...Linkedin)
        elementi.push(...Youtube)

        const ChildElements = (elementi) => elementi.map((element) => {

                if(element.class == 'twitter')

                    return [
                        element.object.map((data) => {
                            return [
                                <div key={data} className={'items col-lg-4 col-md-6 col-sm-12 ' + element.class}>
                                    <TemplateTwitter data={data} />
                                </div>
                            ]
                        }) 
                    ]
                    
                if(element.class == 'linkedin')

                    return [
                        element.object.map((data) => {
                            return [
                                <div key={data} className={'items col-lg-4 col-md-6 col-sm-12 ' + element.class}>
                                    <TemplateLinkedin data={data} />
                                </div>
                                
                            ]
                        }) 
                    ]

                
                if(element.class == 'youtube')

                return [
                    element.object.map((data) => {
                        return [
                            <div key={data} className={'items col-lg-8 col-md-12 col-sm-12 ' + element.class}>
                                <TemplateYoutube data={data} />
                            </div>
                            
                        ]
                    }) 
                ]
                    
                return <div>Nothing to show</div>

        });

        const shuffle = () => {

            const elements = ChildElements(elementi)
            const elementsTwitter = elements[0][0];
            //const elementsLinkedin = elements[1][0];
            const elementsYoutube = elements[1][0];
            const newMatch = []
            newMatch.push(...elementsTwitter)
            //newMatch.push(...elementsLinkedin)
            newMatch.push(...elementsYoutube)
            return newMatch.sort(() => Math.random() - 0.5);

        }

        return shuffle()

    }

}





export default Elements