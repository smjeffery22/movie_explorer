const APIKEY = process.env.REACT_APP_API_KEY;

// list of API requests from TMDB
const requests = {
  fetchPopular: `/movie/popular?api_key=${APIKEY}&language=en-US&page=1`,
}

export default requests;