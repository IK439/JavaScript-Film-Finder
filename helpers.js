// Populate the genre dropdown with all available genres from TMDB
const populateGenreDropdown = (genres) => {
  const select = document.getElementById("genres");

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

// Returns the currently selected genre from the dropdown
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById("genres").value;
  return selectedGenre;
};

// Show the like/dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById("likeOrDislikeBtns");
  btnDiv.removeAttribute("hidden"); // Make buttons visible
};

// Clear the current movie info from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  moviePosterDiv.innerHTML = "";
  movieTextDiv.innerHTML = "";
};

// Add the current movie to liked list and show next movie
const likeMovie = (movie) => {
  likedMovies.push(movie);
  renderMovieLists();
  clearCurrentMovie();
  showRandomMovie();
};

// Add the current movie to disliked list and show next movie
const dislikeMovie = (movie) => {
  dislikedMovies.push(movie);
  renderMovieLists();
  clearCurrentMovie();
  showRandomMovie();
};

// Render liked and disliked movies on the page
const renderMovieLists = () => {
  let listsDiv = document.getElementById("movieLists");

  // Create the container if it doesn't exist
  if (!listsDiv) {
    listsDiv = document.createElement("div");
    listsDiv.setAttribute("id", "movieLists");
    listsDiv.style.width = "65%";
    listsDiv.style.margin = "20px auto";
    listsDiv.style.fontFamily = "'Questrial', sans-serif";
    listsDiv.style.color = "#FEFBEA";
    document.body.appendChild(listsDiv);
  }

  // Populate liked and disliked movie lists
  listsDiv.innerHTML = `
        <h2 style="color:#249e57;">👍 Liked Movies</h2>
        <ul>${likedMovies
          .map((movie) => `<li>${movie.title}</li>`)
          .join("")}</ul>
        <h2 style="color:#c74a4a;">👎 Disliked Movies</h2>
        <ul>${dislikedMovies
          .map((movie) => `<li>${movie.title}</li>`)
          .join("")}</ul>
    `;
};

// Create an image element for the movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", moviePosterUrl);
  posterImg.setAttribute("id", "moviePoster");

  return posterImg;
};

// Create an H1 element for the movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "movieTitle");
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create a paragraph element for the movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("id", "movieOverview");
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

// Create a paragraph element for the movie release date
const createMovieReleaseDate = (releaseDate) => {
  const releaseDateParagraph = document.createElement("p");
  releaseDateParagraph.setAttribute("id", "movieReleaseDate");
  releaseDateParagraph.innerHTML = `Release Date: ${releaseDate}`;
  return releaseDateParagraph;
};

// Create a paragraph element for the movie cast
const createMovieCast = (cast) => {
  const castParagraph = document.createElement("p");
  castParagraph.setAttribute("id", "movieCast");
  castParagraph.innerHTML = `Cast: ${cast.join(", ")}`;
  return castParagraph;
};

// Return a random movie from an array of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

// Display the movie on the page with poster on top and text below
const displayMovie = (movieInfo, cast = []) => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");

  moviePosterDiv.innerHTML = "";
  movieTextDiv.innerHTML = "";

  // Create elements for poster, title, release date, cast, and overview
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const releaseDate = createMovieReleaseDate(movieInfo.release_date);
  const castInfo = createMovieCast(cast);
  const overviewText = createMovieOverview(movieInfo.overview);

  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(releaseDate);
  movieTextDiv.appendChild(castInfo);
  movieTextDiv.appendChild(overviewText);

  showBtns();
  likeBtn.onclick = () => likeMovie(movieInfo);
  dislikeBtn.onclick = () => dislikeMovie(movieInfo);
};