document.getElementById("watchlist-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const watchlistContainer = document.getElementById("watchlist-container");
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  function updateWatchlist() {
    if (watchlist.length === 0) {
      watchlistContainer.innerHTML = `
        <p class="placeholder-text txt">
          Your watchlist is looking a little empty...
        </p>
        <div class="placeholders">
          <p class="placeholder-text text">Let’s add some movies!</p>
        </div>
      `;
    } else {
      watchlistContainer.innerHTML = watchlist
        .map((movie) => createMovieHtml(movie))
        .join("");

      document.querySelectorAll(".remove-btn").forEach((button) => {
        button.removeEventListener("click", handleRemoveButtonClick);
        button.addEventListener("click", handleRemoveButtonClick);
      });
    }
  }

  function removeMovieFromWatchlist(imdbID) {
    watchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    updateWatchlist();
  }

  function handleRemoveButtonClick(event) {
    const imdbID = event.target.getAttribute("data-id");
    removeMovieFromWatchlist(imdbID);
  }

  updateWatchlist();
});

function createMovieHtml(movie) {
  return `
    <div class="movies" id="${movie.imdbID}">
      <img src="${movie.Poster}" alt="Poster of ${movie.Title}">
      <div class="movie-desc">
        <div class="title">
          <h2>${movie.Title}</h2>
          <p>${movie.Year}</p>
          <img src="images/icon rate.png" alt="Rating Icon">
          <p>${movie.imdbRating}</p>
        </div>
        <div class="time">
          <p>${movie.Runtime}</p>
          <p>${movie.Genre}</p>
          <p class="add">-</p>
          <button class="remove-btn" data-id="${movie.imdbID}">Remove</button>
        </div>
        <p class="desc">${movie.Plot}</p>
      </div>
    </div>
  `;
}
