const { Fragment, useEffect } = wp.element;

const CategoriesNav = props => {
    const { categories, className } = props;

    const setActiveNavItem = e => {
        const activeItem = [...document.querySelectorAll(`.${className} .categories-nav__link.active`)];
        activeItem.map(item => {
            item.classList.remove("active");
        });

        const element = e.target;
        element.classList.add("active");
    };

    const setActiveNavItemMobile = e => {
        const activeItem = [...document.querySelectorAll(`.${className}__categories .dropdown-item`)];
        activeItem.map(item => {
            item.classList.remove("active");
        });

        const element = e.target;
        element.classList.add("active");

        const categoriesDropdown = document.getElementById(`${className}-categories-mobile`);
        categoriesDropdown.textContent = element.textContent;
    };

    const setMobileDropdownActive = className => {
        const categoriesMobileLinks = [...document.querySelectorAll(`.${className}__categories .dropdown-item`)];
        const activateItemByDefault = categoriesMobileLinks[0];
        if (activateItemByDefault !== undefined) activateItemByDefault.classList.add("active");
    };

    useEffect(() => {
        setMobileDropdownActive();
    }, []);

    return (
        <Fragment>
            <div className={`${className}__categories d-none d-md-block`}>
                <div className="categories-nav">
                    {categories.map((category, i) => {
                        return (
                            <a
                                key={i}
                                className={i === 0 ? "categories-nav__link active" : "categories-nav__link "}
                                data-toggle="tab"
                                href={`#${className}-category-0${i}`}
                                role="tab"
                                onClick={setActiveNavItem}
                            >
                                {category.title}
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className={`${className}__categories d-md-none`} role="tablist">
                <div className="dropdown">
                    <button
                        className={`${className}__categories-select dropdown-toggle`}
                        type="button"
                        id={`${className}-categories-mobile`}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {categories[0].title}
                    </button>

                    <div className="dropdown-menu" aria-labelledby={`${className}-categories-mobile`}>
                        {categories.map((category, i) => {
                            return (
                                <button
                                    id={`${className}-dropdown-category-0${i}-tab`}
                                    className="dropdown-item"
                                    type="button"
                                    data-toggle="tab"
                                    href={`#${className}-category-0${i}`}
                                    role="tab"
                                    onClick={setActiveNavItemMobile}
                                >
                                    {category.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CategoriesNav;
