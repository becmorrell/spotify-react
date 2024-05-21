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

### In action
Login:<br>

<img width="200" alt="Screenshot 2024-05-21 at 18 10 07" src="https://github.com/becmorrell/spotify-react/assets/77584099/68acbc8d-cc33-40b4-8ff5-b114f0ae0285">

See top listened artists:<br>

<img width="300" alt="Screenshot 2024-05-21 at 18 10 21" src="https://github.com/becmorrell/spotify-react/assets/77584099/c47b0c7e-ec13-4db6-a130-40fc4f484973">

Add festival lineup:<br>

<img width="300" alt="Screenshot 2024-05-21 at 18 11 59" src="https://github.com/becmorrell/spotify-react/assets/77584099/bf03b16b-9d38-4a89-aec8-e51e70f72ae8">

Now start listening to these guys before Glastonbury!<br>

<img width="300" alt="Screenshot 2024-05-21 at 18 12 16" src="https://github.com/becmorrell/spotify-react/assets/77584099/b815bba4-eb09-4c88-a74b-e054565e74ec">
