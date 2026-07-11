import { Copy, Heart, ChevronRight } from "lucide-react";
import copyToClipboard from "../utils/copyToClipboard";

export default function QuoteActions ({ data, toggleFavorites, isFavorite, style, nextQuote, category }) {
    return (
        <footer>
            <section className="flex justify-center gap-12 md:gap-25 mb-34">
                <button
                    title="Copy quote"
                    onClick={() => copyToClipboard(data.content)}
                    className=" px-3 py-1 rounded border-b border-transparent
                                hover:border-zinc-600 hover:text-zinc-600
                                hover:scale-[1.1] active:scale-95 active:border-transparent
                                transition-all duration-200 cursor-pointer "
                >
                    <Copy className="w-6 h-6" />
                </button>

                <button
                    title="Add to Favorite Quotes"
                    onClick={() => toggleFavorites(data)}
                    className={isFavorite
                        ? style.favStyle
                        : style.notFavStyle
                    }
                >
                    <Heart
                        className={`w-6 h-6 ${
                            isFavorite ? "fill-red-500 text-red-500" : ""
                        }`}
                    />
                </button>

                <button
                    title="Next quote"
                    onClick={() => nextQuote(category)}
                    className=" bg-black text-white px-3 py-1 hover:bg-black/10
                                rounded border-b border-transparent
                                hover:border-zinc-600 hover:text-zinc-600
                                hover:scale-[1.1] active:scale-95 active:border-transparent
                                transition-all duration-200 cursor-pointer"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </section>

            <div className="flex justify-center -translate-y-15 cursor-default">
                <p className="transition-all duration-200 hover:tracking-wide">
                    -Press <kbd className="bg-slate-700 text-white px-2 py-1 rounded">Spacebar</kbd> for next quote-
                </p>
            </div>
        </footer>
    )
}