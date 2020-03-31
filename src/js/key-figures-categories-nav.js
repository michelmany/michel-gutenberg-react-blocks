const removeActiveClass = catString => {
    const activeItem = [...document.querySelectorAll(`${catString}.active`)];

    activeItem.map(item => {
        item.classList.remove("active");
    });
};

//  Mobile Dropdown
export const keyFiguresCategoriesNavMobile = sectionClass => {
    const categoriesDropdown = document.getElementById(`${sectionClass}-categories-mobile`);
    const categoriesMobileString = `.${sectionClass}__categories .dropdown-item`;
    const categoriesMobileLinks = [...document.querySelectorAll(categoriesMobileString)];

    const activateItemByDefault = _.first(categoriesMobileLinks);
    if (activateItemByDefault !== undefined) activateItemByDefault.classList.add("active");

    categoriesMobileLinks.map(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            removeActiveClass(categoriesMobileString);
            categoriesDropdown.textContent = item.textContent;
        });
    });
};

//  Tablet and Desktop Tabs
export const keyFiguresCategoriesNav = sectionClass => {
    const categoriesDesktopLinks = [...document.querySelectorAll(`.${sectionClass}__categories .categories-nav__link`)];

    categoriesDesktopLinks.map(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            removeActiveClass(`.${sectionClass}__categories .categories-nav__link`);
        });
    });
};
