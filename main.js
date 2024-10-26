let searchMovie = document.getElementById("searchMovie");
let movieResults = document.getElementById("movieResults");
let searchButton = document.getElementById("searchButton");

function getMovies() {
  movieResults.innerHTML = '';

  let query = searchMovie.value.trim();
  if (!query) {
    alert("Please enter a movie title");
    return;
  }

  let url = `https://www.omdbapi.com/?apikey=d55bcad0&s=${encodeURIComponent(query)}`;

  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        movieResults.innerHTML = `<p>No movies found for "${query}"</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      movieResults.innerHTML = `<p>There was an error retrieving the movies.</p>`;
    });
}

function displayMovies(movies) {
  movies.forEach(movie => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-item");

    movieDiv.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title} Cover" class="movie-poster">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button id="movieDescription" onclick="getMovieDescription('${movie.imdbID}')">View Description</button>
        `;
    movieResults.appendChild(movieDiv);
  });
}


function getMovieDescription(imdbID) {
  let url = `https://www.omdbapi.com/?apikey=d55bcad0&i=${imdbID}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        alert(`Description: ${data.Plot}`);
      } else {
        alert("Description not available.");
      }
    })
    .catch(error => {
      console.error("Error fetching description:", error);
    });
}

searchButton.addEventListener("click", getMovies);