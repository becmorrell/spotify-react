export default function Login({loginHref}) {
    return (
        <>
            <a className="p-4 rounded-full bg-[#19b250] text-white max-w-max" 
             href={`${loginHref.REACT_APP_SPOTIFY_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${loginHref.REACT_APP_SPOTIFY_REDIRECT_URI}&response_type=${loginHref.REACT_APP_SPOTIFY_RESPONSE_TYPE}&scope=${loginHref.SCOPE}&show_dialog=true`}>
                Login with Spotify
            </a>
        </>
    )
}