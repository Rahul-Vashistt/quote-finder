import { useEffect, useState } from "react";
import logo from "./assets/quote-finder-logo.png"
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import QuoteDisplay from "./components/QuoteDisplay";
import QuoteActions from "./components/QuoteActions";
import FavoritesDrawer from "./components/FavoritesDrawer";


const style = {
    categoryNormalStyle: "text-sm sm:text-base md:text-lg text-zinc-700 hover:text-black border-b border-transparent rounded px-3 py-1 hover:scale-[1.04] hover:border-zinc-600 active:scale-95 active:border-transparent transition-all duration-200 cursor-pointer hover:border-b",
    categoryActiveStyle: "text-sm sm:text-base md:text-lg text-black border-b rounded px-3 py-1 scale-[1.04] border-zinc-600 active:scale-95 active:border-transparent transition-all duration-200 cursor-pointer",

    favStyle: "text-sm sm:text-base md:text-lg text-red-700 border-b border-transparent rounded px-3 py-1 hover:scale-[1.04] hover:border-red-600 active:scale-95 active:border-transparent transition-all duration-200 cursor-pointer hover:border-b",
    notFavStyle: "text-sm sm:text-base md:text-lg text-zinc-700 hover:text-black border-b border-transparent rounded px-3 py-1 hover:scale-[1.04] hover:border-zinc-600 active:scale-95 active:border-transparent transition-all duration-200 cursor-pointer hover:border-b"
}

export default function App() {
    
    const [ data, setData ] = useState(() => {
        try{
            const stored = localStorage.getItem("quotes")
            return stored ? JSON.parse(stored) : ""
        } catch {
            return ""
        }
    });

    const [ favorites, setFavorites ] = useState(() => {
        try {
            const stored = localStorage.getItem("favorites");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ category, setCategory ] = useState(null);
    const [ categories, setCategories ] = useState([]);

    const excludedCategories = ["Athletics"]
    const mainCategories = ["All", "Motivational", "Success", "Life", "Wisdom", "Love", "Famous-Quotes"];
    const moreCategories = [...new Set(categories)].filter(item => !mainCategories.includes(item) && !excludedCategories.includes(item));

    const [ showMore, setShowMore ] = useState(false);
    const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
    const [ showFavorites, setShowFavorites ] = useState(false);

    const isFavorite = favorites.some(
        item => item._id === data._id
    );
    
    const nextQuote = async(selectedCategory) => {
        setLoading(true);
        console.log("Fetching:", selectedCategory);
        const apiCategory = selectedCategory === "All" ? "" : selectedCategory;

        try {
            const url = apiCategory
                        ? `https://api.quotable.io/random?tags=${apiCategory}`
                        : "https://api.quotable.io/random"

            const res = await fetch(url);
            const result = await res.json();

            console.log(result.tags);

            setData(result);

        } catch (err) {
            setError(`Error fetching next quote (${String(err)})`);
                
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorites = (quote) => {
        setFavorites(prev => {
            const exists = prev.some(item => item._id === quote._id);

            return exists 
                ? prev.filter(item => item._id !== quote._id)
                : [...prev, quote];
        });
    };

    const removeFavorite = (quote) => {
        setFavorites(favoriteQuotes => favoriteQuotes.filter(favoriteQuote => favoriteQuote._id !== quote._id))
    }

    const handleCategoryClick = (categoryItem = "All") => {
        console.log("Clicked:", categoryItem);

        setCategory(categoryItem);
        localStorage.setItem("category", JSON.stringify(categoryItem));
        nextQuote(categoryItem);
    }

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await fetch("https://api.quotable.io/tags");
                const data = await res.json();

                const categoriesArr = data.map(tag => tag.name);

                setCategories(categoriesArr)
            } catch (err) {
                console.log(`Error fetching tags: ${err}`)
            }
        };

        fetchTags();
    }, [])

    useEffect(() => {
        const handleSpacebar = (e) => {
            if(e.code === "Space") {
                e.preventDefault();
                nextQuote(category);
            }
        }  

        window.addEventListener("keydown", handleSpacebar)
        return () => window.removeEventListener("keydown", handleSpacebar)
    }, [category])

    useEffect(() => {
        const savedQuote = localStorage.getItem("quotes");
        const savedCategory = localStorage.getItem("category");

        if (savedCategory) {
            setCategory(JSON.parse(savedCategory));
        }

        if (savedQuote) {
            setData(JSON.parse(savedQuote));
            setLoading(false);
        } else {
            handleCategoryClick();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "quotes", 
            JSON.stringify(data))
    }, [data])

    useEffect(() => {
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    useEffect(() => {
        if (showFavorites) {
            setMobileMenuOpen(false);
        }
    }, [showFavorites]);

    return (
        <>
            <main className="min-h-screen flex flex-col ">
                <ToastContainer />
                <Header 
                    logo={logo}
                    style={style}
                    category={category}
                    mainCategories={mainCategories}
                    moreCategories={moreCategories}
                    handleCategoryClick={handleCategoryClick}
                    showMore={showMore}
                    setShowMore={setShowMore}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />

                <QuoteDisplay
                    error={error}
                    loading={loading}
                    data={data}
                />

                <QuoteActions 
                    data={data}
                    toggleFavorites={toggleFavorites}
                    isFavorite={isFavorite}
                    style={style}
                    nextQuote={nextQuote}
                    category={category}
                />
            </main>

            {showFavorites && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
                    onClick={() => setShowFavorites(false)}
                />
            )}

            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-20"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <FavoritesDrawer 
                className="fixed right-0 top-0 z-50"
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
                favorites={favorites}
                onSelectQuote={setData}
                removeFavorite={removeFavorite}
                setFavorites={setFavorites}
            />
        </>
    )
}