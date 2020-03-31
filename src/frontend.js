import "./blocks.style.sass";

require("es6-promise").polyfill();
import cssVars from "css-vars-ponyfill";
cssVars({ shadowDOM: true });

import "./blocks/major-player/frontend";
import "./blocks/operational-indicators/frontend";
import "./blocks/people-listing/frontend";
import "./blocks/location-search-map/frontend";
import "./blocks/leadership-menu-ctas-tabs/frontend";
import "./blocks/image-and-video-library/frontend";
import "./blocks/social-media-wall/frontend";
import "./blocks/search-and-results/frontend";
import "./blocks/text-product-image-menu/frontend";
import "./blocks/page-notice-block/frontend";