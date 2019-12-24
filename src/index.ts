import SpotifyWebApi from 'spotify-web-api-node';

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: '08cda8b7e2bc475ca5520c9d1bd142a9',
  clientSecret: '0ce200816d2540e0a81097c9822e74e9',
  // redirectUri: 'http://www.example.com/callback',
});

async function authorize(): Promise<void> {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    console.log(`The access token expires in ${data.body.expires_in}`);
    console.log(`The access token is ${data.body.access_token}`);

    // Save the access token so that it's used in future calls
    await spotifyApi.setAccessToken(data.body.access_token);
  } catch (e) {
    console.log('Something went wrong when retrieving an access token\n', e.message);
  }
}


async function getPlaylists(): Promise<void> {
  await authorize();

  try {
    console.log(spotifyApi);
    const { body: { items: playlists } } = await spotifyApi.getUserPlaylists('1125557117');

    console.log(playlists);
  } catch (e) {
    console.error(e);
  }
}

getPlaylists();
