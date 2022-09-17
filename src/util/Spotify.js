const clientID='030d9cbb0da24b029a26892937e0daa8'
const redirectURI='https://6325e10c9c51cc5fa6f77121--poetic-nougat-ca8096.netlify.app/'
let accessToken;
export const Spotify={
    getAccessToken(){
        //already have access,just return it
        if(accessToken)return accessToken;
        //no access token yet, assuming request already made, try to extract the access token from the response 
        let accessTokenMatch=window.location.href.match('access_token=([^&]*)')
        let expireTimeMatch= window.location.href.match('expires_in=([^&]*)')      
        if(accessTokenMatch&&expireTimeMatch){
            // token and expire time successfully matched. set the setTimeOut for eliminating token and return the token
            accessToken=accessTokenMatch[1];
            const expireTime=Number(expireTimeMatch[1])
            setTimeout(()=>{accessToken=''},expireTime*1000)
            window.history.pushState('Access Token',null,'/')
            return accessToken
        }
        else{
            //request not made yet or user denies access, set the web page to request page
            const authorizeURL=
`https://accounts.spotify.com/authorize?response_type=token&client_id=${clientID}&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location=authorizeURL;
        }
    },
    search(term){
        const searchRequest=`https://api.spotify.com/v1/search?type=track&q=${term}`
        const token=Spotify.getAccessToken()
        return fetch(searchRequest,{headers:{Authorization:`Bearer ${token}`}})
        .then(response=>response.json())
        .then(jsonResponse=>{
            if(jsonResponse){
                console.log(jsonResponse)
                return jsonResponse.tracks.items.map(track=>
                    ({
                        uri:track.uri,
                        name:track.name,
                        id:track.id,
                        album:track.album.name,
                        artist:track.artists[0].name,
                        preview_sound:track.preview_url,
                        preview_image:track.album.images[0].url
                    }))
            }
            else return []
        })
    },
    savePlaylist(listName,URLs){
        if(listName&&URLs){
            const accessToken=Spotify.getAccessToken();
            const headers={Authorization:`Bearer ${accessToken}`}
            let userID
            return fetch('https://api.spotify.com/v1/me',{headers:headers})
            .then(response=>response.json())
            .then(jsonResponse=>{
                userID=jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                {
                    headers:headers,
                    method:'POST',
                    body:JSON.stringify({name:listName})
                })
            })
            .then(response=>response.json())
            .then(jsonResponse=>{
                let playlistID=jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
                {
                    headers:headers,
                    method:'POST',
                    body:JSON.stringify({uris:URLs})
                })
            })
        }
    }
}
