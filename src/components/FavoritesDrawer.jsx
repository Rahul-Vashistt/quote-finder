import { ChevronRight, ChevronLeft, Trash2 } from "lucide-react"

export default function FavoritesDrawer({ showFavorites, setShowFavorites, favorites, onSelectQuote, removeFavorite, setFavorites }) {
    return (
        <>
            <div>
                <div
                    className={
                       `fixed top-0 left-0
                        h-screen w-76 sm:w-96
                        bg-zinc-900 text-white
                        border-r border-zinc-700
                        overflow-y-auto z-50 shadow-2xl
                        transition-transform
                        duration-200
                        ease-in-out

                        ${showFavorites ? "translate-x-0" : "-translate-x-full"}`
                    }
                >
                    {
                        favorites.length > 0 
                        ? (
                            <div>
                                <button 
                                    className="text-red-400 text-sm px-3 pt-3 hover:text-red-600 cursor-pointer transition duration-100" 
                                    onClick={() => setFavorites([])}
                                >
                                    Remove all favorites
                                </button>

                                <div>
                                    {favorites.map(favoriteQuote => (
                                        <div
                                            key={favoriteQuote._id}
                                            onClick={() => {
                                                onSelectQuote(favoriteQuote);
                                                setShowFavorites(false);
                                            }}
                                            className="mx-4 my-3 p-4 bg-zinc-800 hover:bg-zinc-700 
                                                    border border-zinc-700 rounded-xl transition 
                                                    cursor-pointer active:scale-98 active:bg-zinc-600"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-lg font-semibold">
                                                    {favoriteQuote.author}
                                                </h3>

                                                <Trash2
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFavorite(favoriteQuote);
                                                    }}
                                                    className="w-5 h-5 cursor-pointer text-red-400 hover:text-red-500 hover:scale-110
                                                            active:scale-95 transition-all duration-150"
                                                />
                                            </div>
                                            <p className="text-zinc-300">{favoriteQuote.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            
                          )
                        : (
                            <div className="h-full flex flex-col items-center justify-center px-8 text-center cursor-pointer">
                                <h3 className="text-2xl font-bold mb-2">
                                    No favorite quotes yet!
                                </h3>
                                <p className="text-zinc-300">
                                    Heart quotes to see them here.
                                </p>
                            </div>
                          )
                    }
                </div>
            </div>

            <div>
                <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    title={!showFavorites ? "See your favorite quotes" : "Close favorite quotes drawer"}
                    className={
                       `fixed top-1/2 -translate-y-1/2
                        bg-zinc-900 text-white hover:scale-110
                        p-2 rounded-r-xl cursor-default
                        transition-all duration-200 z-50
                        
                        ${showFavorites ? "left-76 sm:left-96" : "left-0"}`
                    }
                >
                    {
                        showFavorites
                        ? <ChevronLeft className="w-6 h-6" />
                        : <ChevronRight className="w-6 h-6" />
                    }
                </button>
            </div>
        </>
    )
}