export const excerpt = (text, val = 10) => {
    return text.substring(0, val) + "...";
};

export const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

// Also there's a custom function in the theme to add the featured image to the rest-api  (inc/custom-functions.php)
export function getFeaturedImageUrl(obj) {
    if (obj.hasOwnProperty("_embedded") && obj._embedded.hasOwnProperty("wp:featuredmedia"))
        return obj._embedded["wp:featuredmedia"][0].source_url;
    return;
}

export function getFeaturedImageAlt(obj) {
    if (obj.hasOwnProperty("_embedded") && obj._embedded.hasOwnProperty("wp:featuredmedia"))
        return obj._embedded["wp:featuredmedia"][0].alt_text;
    return;
}

export function isBlockEditor() {
    return document.body.classList.contains("block-editor-page");
}
