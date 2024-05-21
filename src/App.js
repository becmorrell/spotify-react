import { useEffect, useState } from 'react';
import './App.css';
import RelatedArtists from './components/RelatedArtists';
import Login from './components/Login';
import TopListenedArtists from './components/TopListenedArtists';
import ImageUploader from './components/ImageUploader';

function App() {
  const [token, setToken] = useState("")
  const [posterSearch, setPosterSearch] = useState('')
  const [relatedArtists, setRelatedArtists] = useState([])
  const [ userTopMusic, setUserTopMusic] = useState([])
  const [suggestedArtists, setSuggestedArtists] = useState([])
  const [lineupArtists, setLineupArtists] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  const functionsURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_FUNCTIONS_LOCAL : process.env.REACT_APP_FUNCTIONS_PROD
  const PublicURL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PUBLIC_URL_LOCAL : process.env.REACT_APP_PUBLIC_URL_PROD
    useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if(!token && hash){
      token = hash.substring(1).split('&').find(element => element.startsWith('access_token')).split('=')[1]

      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }

    setToken(token)
  }, [])

  //spotify authentication
  const loginObj = {
    REACT_APP_SPOTIFY_REDIRECT_URI:  PublicURL,
    REACT_APP_SPOTIFY_AUTH_ENDPOINT:  "https://accounts.spotify.com/authorize",
    REACT_APP_SPOTIFY_RESPONSE_TYPE: "token",
    SCOPE:  'user-read-private user-read-email user-top-read',
  }
  const BaseUrl = `https://api.spotify.com/v1`
  

  //logout 
  const logout = () => {
    setToken('')
    window.localStorage.removeItem('token')
  }


  useEffect(() => {
    const userMusic = async () => {
      try {
        const response = await fetch( BaseUrl + `/me/top/artists?time_range=medium_term&limit=30`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        setUserTopMusic(data.items)
      }
      catch(e) {
        console.log(e)
      }
    }
    if(token) {
    userMusic()
    }
  }, [token, BaseUrl])

  useEffect(() => {
    const fetchRelatedArtists = async () => {
    const arrOfSuggested = await Promise.all(userTopMusic?.map( async(artist) => {
      const response = await fetch(BaseUrl + `/artists/${artist.id}/related-artists`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      const newData = data?.artists.map((item) => {
        return {
          ...item,
          parent: artist
        }
      })
      return newData
    }))

    const allSuggested = arrOfSuggested.flat()

    //deduplicate the suggested list by id, and by parent
    const dedup = allSuggested.filter((item, index, self) => {
      return index === self.findIndex((a) => {
        return item.id === a.id
      }) 
      && !userTopMusic.find((topArtist) => topArtist.id === item.id)
    })

    setRelatedArtists(dedup)
   
  }
  if(token) {
    fetchRelatedArtists()
  }
  
  }, [userTopMusic, token, BaseUrl])


    function searchLineup(e) {
      e.preventDefault()
      const formData = new FormData(e.target)
      const query = formData.get('posterURL')
      setSelectedImage(query)
    }


  useEffect(() => {
    const recogniseText = async () => {
      if (selectedImage) {
        try {
          const response = await fetch(functionsURL, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify( 
              {
                imageURL: selectedImage
              }
            )
          })

          const data = await response.json()
          const posterData = data.text
          
          const words = posterData.split(/\s+|\//).filter((word) => word !== '')
          let matchedArtists = new Set([])
          let matchFaveArtists = new Set([])
          let windowSize = 1

          for (let i = 0; i < words.length; i++) {
            const startIndex = Math.max(0, i - windowSize)
            const endIndex = Math.min(words.length, i + windowSize)

            const slidingWords = words.slice(startIndex, endIndex)
            if(slidingWords.length < 2) {
              continue
            }

            const potentialArtist = slidingWords.join(' ')
            const matchingArtists = relatedArtists.filter(artist => artist.name.toLowerCase().includes(potentialArtist.toLowerCase())
            )

            //loop through top artists and match to lineup
            const matchFavourite = userTopMusic.filter(artist => artist.name.toLowerCase().includes(potentialArtist.toLowerCase()))

            if(matchFavourite){
              matchFavourite.forEach(artist => {
                if(artist !== undefined){
                  matchFaveArtists.add(artist)
                }
              })
            }

            if(matchingArtists){
              matchingArtists.forEach(artist => {
                if (artist !== undefined) {
                  matchedArtists.add(artist);
                }
              })
            }
          }

          for (let i = 0; i < words.length; i++){
            const exactMatchesFave =userTopMusic.filter(artist => artist.name === words[i])
            matchFaveArtists.add(...exactMatchesFave)
          }

          for (let i = 0; i < words.length; i++){
            const exactMatches =relatedArtists.filter(artist => artist.name === words[i])
            matchedArtists.add(...exactMatches)
          }
          const matchedArtistsArr = Array.from(matchedArtists)?.filter(artist => artist !== undefined);
          const matchedFaveArtistsArr = Array.from(matchFaveArtists)?.filter(artist => artist !== undefined);
          setSuggestedArtists(matchedArtistsArr)
          setLineupArtists(matchedFaveArtistsArr)
        }
        catch(e) {
          console.log(e)
        }
      }  
    }
    
    recogniseText()
    setPosterSearch('')

  }, [selectedImage, relatedArtists, userTopMusic])


  return (
    <div className="App grid grid-rows-[50px_1fr_50px] h-screen">
      <header className='App-header'>
      {token && <button onClick={logout}>Logout</button>}
      </header>
      <main className='px-4 py-4'>
      
      {!token ? 
      <div className='flex flex-col items-center gap-7 pt-14'>
        <h1>Poster Prioritiser</h1>
        <span>Upload a lineup poster and get personalised lineup 🕺🏻</span>
        <Login loginHref={loginObj} />
      </div>
        :
      <>
        <div className='w-full flex flex-col items-center'>
        <ImageUploader onAction={searchLineup} posterSearch={posterSearch} selectedImage={selectedImage}></ImageUploader>
        </div>
        {token && 
        <>
        <div className='flex flex-col gap-y-4'>
          
          <TopListenedArtists topArtists={selectedImage ? lineupArtists : userTopMusic} selectedImage={selectedImage}></TopListenedArtists>
          
        </div>
        {suggestedArtists.length > 0 && <RelatedArtists lineupArtists={suggestedArtists}></RelatedArtists>}
        </> 
        }
      </>
      }
      </main>
      <footer className='App-header w-full'>
        Created by Becca
      </footer>
    </div>
  );
}

export default App;
