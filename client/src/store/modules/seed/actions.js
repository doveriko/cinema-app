import axios from 'axios';

export default {
  registerSeats(context) {
    let allSeats = context.getters.allSeats;

    for (let i = 0; i < allSeats.length; i++) {
      var area = allSeats[i].area
      var number = allSeats[i].number
      var roomId = allSeats[i].roomId

      axios
        .post(process.env.VUE_APP_API_URL + "/seats",
          { area, number, roomId }
        )
        .then((response) => {
          console.log("seats created", response.data);
        })
        .catch((err) => console.log(err));
    }
  },
  registerRooms(context) {
    let allRooms = context.getters.allRooms;

    for (let i = 0; i < allRooms.length; i++) {
      var id = allRooms[i].id
      var name = allRooms[i].name
      var ticketUnitPrice = allRooms[i].ticketUnitPrice

      axios
        .post(process.env.VUE_APP_API_URL + "/rooms",
          { id, name, ticketUnitPrice }
        )
        .then((response) => {
          console.log("rooms created", response.data);
        })
        .catch((err) => console.log(err));
    }
  },
  registerMovies(context) {
    let allMovies = context.getters.allMovies;

    for (let i = 0; i < allMovies.length; i++) {
      var id = allMovies[i].id
      var title = allMovies[i].title
      var description = allMovies[i].description
      var imageUrl = allMovies[i].imageUrl

      axios
        .post(process.env.VUE_APP_API_URL + "/movies",
          { id, title, description, imageUrl }
        )
        .then((response) => {
          console.log("movies created", response.data);
        })
        .catch((err) => console.log(err));
    }
  },
  registerSessions(context) {
    let allSessions = context.getters.allSessions;

    for (let i = 0; i < allSessions.length; i++) {
      var time = allSessions[i].time
      var movieId = allSessions[i].movieId
      var roomId = allSessions[i].roomId

      axios
        .post(process.env.VUE_APP_API_URL + "/sessions",
          { time, movieId, roomId }
        )
        .then((response) => {
          console.log("sessions created", response.data);
        })
        .catch((err) => console.log(err));
    }
  },
  getOneMovie(context, data) {
    let movieId = data
    let allMovies = context.getters.allMovies
    let selectedMovie = allMovies.filter(movie => movie.id == movieId)
    context.commit('selectMovie', selectedMovie[0])
  },
}