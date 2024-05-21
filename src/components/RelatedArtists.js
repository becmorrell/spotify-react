
export default function RelatedArtists({lineupArtists}){
    return (
        <>
        <div className="flex flex-col">
            <h2 className="pt-10 pb-8">Make sure you see these artists:</h2>
            <div className="grid md:grid-cols-4 gap-y-10 gap-x-3 flex-wrap pb-8">
                {lineupArtists && lineupArtists?.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-col items-center gap-y-2">
                            <img src={item?.images[0].url} height={250} width={250}/>
                            <h3>
                                <a href={item?.external_urls.spotify} target="_blank">{item?.name}</a>
                            </h3>
                            <span className="text-lg">Because you liked: <a href={item.parent.external_urls.spotify} target="_blank">
                                {item?.parent.name}</a>
                            </span>
                        </div> 
                    )


                })}
                   
            </div>
            

        </div>
        </>
    )
}