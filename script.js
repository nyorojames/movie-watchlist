document.getElementById("watchlist-btn").addEventListener("click", () => {
  window.location.href = "watchlist.html";
});

const movieSearch = document.getElementById("movie-search");
const searchBtn = document.getElementById("search-btn");
const moviesContainer = document.getElementById("movies-container");
//www.omdbapi.com/?i=tt3896198&apikey=9097bc13

searchBtn.addEventListener("click", () => {
  fetch(`http://www.omdbapi.com/?t=${movieSearch.value}&apikey=9097bc13`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.Response === "True") {
        displayMovie(data);
      } else {
        moviesContainer.innerHTML = `<p class="error">Unable to find what you’re looking <br> for. Please try another search.</br></p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
      moviesContainer.innerHTML = `<p class="error">Something went wrong. Please try again later.</p>`;
    });
});

function displayMovie(movie) {
  moviesContainer.innerHTML = `
    <div class="movies">
    <img src="${movie.Poster}" alt="Poster of ${movie.Title}">
    <div class="movie-desc">
    <div class="title">
        <h2>${movie.Title}</h2>
        <p> ${movie.Year}</p>
        <img src="images/icon rate.png">
        <p> ${movie.imdbRating}</p>
    </div>
    <div class="time">
        <p> ${movie.Runtime}</p>
        <p> ${movie.Genre}</p>
        <p class="add">+</p>
        <button id="watchlist-add">Watchlist</button>
    </div>
    <p class="desc"> ${movie.Plot}</p>
    </div>
    </div>
     `;

  const watchlistAddBtn = document.getElementById("watchlist-add");
  watchlistAddBtn.addEventListener("click", () => addToWatchlist(movie));
}

function addToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (
    !watchlist.some((watchlistMovie) => watchlistMovie.imdbID === movie.imdbID)
  ) {
    watchlist.unshift(movie);
  }

  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  window.location.href = "watchlist.html";
}
