const getClose = document.getElementById('wp-block-ldc-page-notice-block__close')
const getBlock = document.getElementsByClassName('wp-block-ldc-page-notice-block')
if(getClose) {
    getClose.addEventListener("click", () => {
        getBlock[0].classList.add('wp-block-ldc-page-notice-block__disabled')
     } );
}
