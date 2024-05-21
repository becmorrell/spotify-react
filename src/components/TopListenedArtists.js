export default function TopListenedArtists({topArtists, selectedImage}){
    return (
        <>
            {selectedImage ? 
            <h2 className="pt-4">Your Top artists playing:</h2>
            :
            <h2 className="pt-4">Your Top Listened Artists:</h2>
            
            }
            <div className="grid md:grid-cols-3 gap-y-3 border-red flex-wrap">
                {topArtists && topArtists?.map((artist, index) => {
                    return (
                        <div className="flex items-center gap-x-3" key={index}>
                        <img className="rounded-full" src={artist.images[0].url} width={80} height={80} alt={artist.name}/>    
                        <a href={artist.external_urls.spotify} target="_blank" >{artist.name}</a>
                        </div>
                    )
                } 
                )}    
            </div>
        </>     
    )   
}