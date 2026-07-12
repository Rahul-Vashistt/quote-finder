import formatValue from "../utils/formatValue";

export default function DesktopHeader({ logo, style, category, mainCategories, moreCategories, handleCategoryClick, showMore, setShowMore }) {
    return (
        <div className="hidden lg:block">
            <nav aria-label="Quote categories">
                <ul className="flex flex-wrap mt-8 gap-3 md:gap-10 lg:gap-20 justify-center" >
                    <li>
                        <img 
                            alt="Quote Finder Logo" 
                            src={logo} 
                            className="w-24 sm:w-32 md:w-44 lg:w-60 -translate-y-4 sm:-translate-y-7 
                                        md:-translate-y-11 lg:-translate-y-15 overflow-hidden
                                        hover:scale-[1.05] transition duration-200"
                        />
                    </li>

                    {mainCategories.map(categoryItem => (
                        <li key={categoryItem}>
                            <button
                                onClick={() => handleCategoryClick(categoryItem)}  
                                className={category === categoryItem
                                    ? style.categoryActiveStyle
                                    : style.categoryNormalStyle
                                }
                            >
                                    {formatValue(categoryItem)}
                            </button>
                        </li>
                    ))}

                    <li className="relative">
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className={showMore ? style.categoryActiveStyle : style.categoryNormalStyle}
                        >
                                {!showMore ? "More ▼" : "More ▲"}
                        </button>
                        
                        {showMore && (
                            <ul
                                className="absolute right-0 mt-2 sm:w-sm md:w-md lg:w-lg max-h-96 overflow-y-auto rounded-xl
                                            grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                                            border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl z-50"   
                            >
                                {moreCategories?.map(categoryItem => (
                                    <li 
                                        key={categoryItem}
                                    >
                                        <button
                                            onClick={() => {
                                                handleCategoryClick(categoryItem)
                                                setShowMore(false);
                                            }}
                                            className={
                                                category === categoryItem
                                                    ? "w-full text-left px-4 py-2 bg-gray-600/10 cursor-pointer"
                                                    : "w-full text-left px-4 py-2 hover:bg-gray-600/10 cursor-pointer"
                                            } 
                                        >
                                            {categoryItem}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    )
}