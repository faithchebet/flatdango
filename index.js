document.addEventListener('DOMContentLoaded', function () {
    // Fetch data for all movies and display the movie menu
    fetchMovies();

    // Fetch details for the first movie and display 
    fetchMovieDetails(1);

    //  Buy Ticket
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('buy-ticket')) {
            buyTicket();
        }
    });

    // movie menu display details of the selected movie
    document.getElementById('films').addEventListener('click', function (event) {
        if (event.target.classList.contains('film-item')) {
            const movieId = event.target.dataset.movieId;
            fetchMovieDetails(movieId);
        }
    });
});

function fetchMovies() {
    // Fetch data for all movies 
    // Make a GET request 
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
            // display the movie menu
            const filmsList = document.getElementById('films');
            filmsList.innerHTML = data.map(movie => `<li class="film-item" data-movie-id="${movie.id}">${movie.title}</li>`).join('');
        });
}

function fetchMovieDetails(movieId) {
    // Fetch details for a specific movie by ID
    // Make a GET request 
    fetch(`http://localhost:3000/films/${movieId}`)
        .then(response => response.json())
        .then(data => {
            // Display movie details on the page
            const movieDetails = document.getElementById('movie-details');
            movieDetails.innerHTML = `
                <img src="${data.poster}" alt="${data.title} Poster">
                <h2>${data.title}</h2>
                <p>${data.description}</p>
                <p>Runtime: ${data.runtime} minutes</p>
                <p>Showtime: ${data.showtime}</p>
                <p>Available Tickets: ${data.capacity - data.tickets_sold}</p>
                <button class="buy-ticket" ${data.tickets_sold === data.capacity ? 'disabled' : ''}>Buy Ticket</button>
            `;
        });
}

function buyTicket() {
    
    const movieDetails = document.getElementById('movie-details');
    const availableTicketsElement = movieDetails.querySelector('.available-tickets');
    const buyTicketButton = movieDetails.querySelector('.buy-ticket');

    const availableTickets = parseInt(availableTicketsElement.textContent.split(': ')[1]);
    if (availableTickets > 0) {
        const updatedAvailableTickets = availableTickets - 1;
        availableTicketsElement.textContent = `Available Tickets: ${updatedAvailableTickets}`;

        
    }
}




