# Poster Prioritise

This project was started to test out the spotify API and turned into discovering new artists for Glastonbury!

## How to use
- Login using your spotify account
- The page will show you your top listened artists
- Add your festival poster url and press "get my line up"
- Check out who you should be seeing at the festival based on similar artists to your top listened 


### Under the hood
- The spotify API endpoints used are:
  - /top/artists
  - artists/{artist.id}/related-artists
- Once a festival poster is added, a post request with the image is sent to googleVision to use text detection to get a lineup
- I split the returned data into "words" and use a sliding window technique to build potential artist names
- finally loop through these to check if there are any matches to your top listened or suggested/similar artists.



