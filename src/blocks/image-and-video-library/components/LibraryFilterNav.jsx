const LibraryFilterNav = ({ filters, className, filterMediaBy }) => {
    return (
        <ul className={`${className}__filter nav nav-pills`}>
            {filters.map((filter, i) => {
                return (
                    <li className="nav-item" id={`library-nav-0${i}`}>
                        <button
                            className={`nav-link ${i === 0 && "active"}`}
                            data-toggle="pill"
                            onClick={() => filterMediaBy(filter.foldersIds)}
                        >
                            {filter.name}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default LibraryFilterNav;
