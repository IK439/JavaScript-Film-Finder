// Note - Create account on TMDB and generate API key to populate tmdbKey
const tmdbKey = "";
const tmdbBaseUrl = "https://api.themoviedb.org/3";

// Button to start movie selection
const playBtn = document.getElementById("playBtn");

// Store liked and disliked movies in arrays
const likedMovies = [];
const dislikedMovies = [];

// Fetch list of movie genres from TMDB
const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch, { cache: "no-cache" });

    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;

      return genres;
    }
  } catch (error) {
    console.error(error);
  }
};

// Fetch movies from a random page for more variety
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const randomPage = Math.floor(Math.random() * 10) + 1; // Random page between 1-10
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch, { cache: "no-cache" });

    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;

      return movies;
    }
  } catch (error) {
    console.error(error);
  }
};

// Fetch detailed info about a specific movie
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch, { cache: "no-cache" });

    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error) {
    console.error(error);
  }
};

// Fetch top 5 cast members for a movie
const getMovieCast = async (movieId) => {
  const castEndpoint = `/movie/${movieId}/credits`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${castEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      // Return array of first 5 cast member names
      return jsonResponse.cast.slice(0, 5).map(actor => actor.name);
    }
  } catch (error) {
    console.error(error);
  }
};

// Display a random movie with cast and other details
const showRandomMovie = async () => {
  const movieInfoDiv = document.getElementById("movieInfo");

  // Clear current movie if one is displayed
  if (movieInfoDiv.childNodes.length > 0) {
    clearCurrentMovie();
  }

  const movies = await getMovies(); // Get array of movies
  const randomMovie = getRandomMovie(movies); // Pick one random movie
  const info = await getMovieInfo(randomMovie); // Fetch full movie info
  const cast = await getMovieCast(randomMovie.id); // Fetch top cast members

  displayMovie(info, cast); // Show movie on the page
};

// Populate the genre dropdown once genres are fetched
getGenres().then(populateGenreDropdown);

// Attach click event to the play button
playBtn.onclick = showRandomMovie;