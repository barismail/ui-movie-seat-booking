// JS UI Movie Seat Booking
const movieSelect = document.getElementById('movie-select');
const count = document.getElementById('count');
const total = document.getElementById('total');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSeatContainer = document.querySelector('.movie-seat-container');

let ticketPrice = +movieSelect.value;

populateUI();

// save selected movie index and price
function setDataMovie(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const selectedSeatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeatsIndex', JSON.stringify(selectedSeatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeatsIndex'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    if (selectedMovie !== null) {
        movieSelect.selectedIndex = selectedMovie;
    }
}


// movie select event
movieSelect.addEventListener('change', (event) => {
    ticketPrice = +event.target.value;
    setDataMovie(event.target.selectedIndex, ticketPrice);
    updateSelectedCount();
});

// seat click event
movieSeatContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

// initial count and total setup
updateSelectedCount();