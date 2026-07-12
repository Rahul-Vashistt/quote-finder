import { Menu, X } from "lucide-react";

export default function MobileHeader({ logo, mobileMenuOpen, setMobileMenuOpen, category, mainCategories, moreCategories, showMore, setShowMore, handleCategoryClick }) {
    return (
        <div className="flex lg:hidden items-center justify-between px-4">
            <img
                src={logo}
                alt="Quote Finder Logo"
                className="w-48 translate-y-2 hover:scale-[1.05] transition duration-200 -translate-x-8"
            />

            <div className="flex flex-col relative z-30">
                <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="absolute right-full"
                >
                    {mobileMenuOpen ? <X className="w-5 h-5 z-20"/> : <Menu className="w-5 h-5" />}
                </button>

                {
                    mobileMenuOpen
                    && (
                        <ul className="fixed top-22 right-0 sm:w-1/3 
                                        bg-zinc-700 shadow-xl z-20 p-4 
                                        rounded-l text-zinc-300 ">
                            {mainCategories.map(categoryItem => (
                                <li
                                    key={categoryItem}
                                >
                                    <button
                                        onClick={() => {
                                            handleCategoryClick(categoryItem);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={
                                            category === categoryItem 
                                            ? "w-full text-left px-4 py-3 rounded-lg bg-zinc-800 transition"
                                            : "w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-800 transition"
                                        }
                                    >
                                        {categoryItem}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-600 transition"
                                        onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? "More ▲" : "More ▼"}
                                </button>

                                {showMore && (
                                    <ul className="max-h-30 sm:max-h-69 overflow-y-auto bg-zinc-900 p-2 rounded">
                                        {moreCategories.map(categoryItem => (
                                            <li
                                                key={categoryItem} 
                                            >
                                                <button
                                                    onClick={() => {
                                                        handleCategoryClick(categoryItem);
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    className={
                                                        category === categoryItem 
                                                        ? "w-full text-sm text-left px-4 py-3 rounded-lg bg-zinc-700 transition"
                                                        : "w-full text-sm text-left px-4 py-3 rounded-lg hover:bg-zinc-600 transition"
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
                    )
                }
            </div>
        </div>
    )
}