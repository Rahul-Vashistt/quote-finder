import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header ({ logo, style, category, mainCategories, moreCategories, handleCategoryClick, showMore, setShowMore, mobileMenuOpen, setMobileMenuOpen }) {
    return (
        <header>
            <MobileHeader 
                logo={logo}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                category={category}
                mainCategories={mainCategories}
                moreCategories={moreCategories}
                showMore={showMore}
                setShowMore={setShowMore}
                handleCategoryClick={handleCategoryClick}
            />
            
            <DesktopHeader 
                logo={logo}
                style={style}
                category={category}
                mainCategories={mainCategories}
                moreCategories={moreCategories}
                showMore={showMore}
                setShowMore={setShowMore}
                handleCategoryClick={handleCategoryClick}
            />
        </header>
    )
}