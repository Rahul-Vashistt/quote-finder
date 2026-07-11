

export default function QuoteDisplay ({ error, loading, data }) {
    return (
        <section className="flex-1 flex flex-col justify-center items-center">
                {error
                ? <div className="translate-y-20 md:translate-y-40 ">
                    <h1 className="text-red-500 text-sm">{error}</h1>
                    </div>
                : !loading
                ? (
                    <div className="w-7/12 mb-16">
                        <blockquote 
                            className="font-garamond italic text-4xl">
                                "{data.content}"
                        </blockquote>
                        <cite 
                            className="block text-right mt-4 font-montserrat">
                                - {data.author}
                        </cite>
                    </div>
                    )
                : (
                    <div className="w-7/12 mb-16 animate-pulse">
                        <div className="h-10 bg-gray-300 rounded w-full mb-3"></div>
                        <div className="h-10 bg-gray-300 rounded w-5/6 mb-3"></div>
                        <div className="h-10 bg-gray-300 rounded w-4/6"></div>

                        <div className="flex justify-end mt-6">
                            <div className="h-6 bg-gray-300 rounded w-40"></div>
                        </div>
                    </div>
                    )
                } 
            </section>
    )
}