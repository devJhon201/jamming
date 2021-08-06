let accessToken = "";
let uri = "http://abortive-pin.surge.sh/";
const clientID = "85894da73ee64d4bb0b1e5c4f98d3f11";

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const urlToRedirect =
      "https://accounts.spotify.com/authorize?client_id=" +
      clientID +
      "&response_type=token&scope=playlist-modify-public&redirect_uri=" +
      uri;

    const urlData = window.location.href.match(
      /access_token=([^&]*)|expires_in=([^&]*)/g
    );
    if (urlData) {
      accessToken = urlData[0].slice(13);
      const expirationTime = Number(urlData[1].slice(11));
      window.setTimeout(() => (accessToken = ""), expirationTime * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location.href = urlToRedirect;
    }
  },

  async search(term) {
    const token = this.getAccessToken();
    const respuesta = await fetch(
      "https://api.spotify.com/v1/search?type=track&q=" + term,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jsonRespuesta = await respuesta.json();

    if (!jsonRespuesta.tracks.items.length) {
      return [];
    }
    const arrOfTracks = jsonRespuesta.tracks.items.map((elem) => {
      return {
        id: elem.id,
        name: elem.name,
        artist: elem.artists[0].name,
        album: elem.album.name,
        uri: elem.uri,
      };
    });

    return arrOfTracks;
  },

  async savePlaylist(playlistName, urisArr) {
    if (!playlistName || !urisArr) {
      return;
    }
    const token = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let userID;

    const fetchUserID = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    const responseJSON = await fetchUserID.json();
    userID = responseJSON.id;

    const fetchCreatePlaylist = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ name: playlistName }),
      }
    );
    const createPlaylistJSON = await fetchCreatePlaylist.json();

    const playlistID = createPlaylistJSON.id;

    await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: urisArr,
      }),
    });
  },
};
