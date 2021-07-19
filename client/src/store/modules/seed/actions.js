import axios from 'axios';

export default {
  registerSeats(context) {
    let allSeats = context.getters.seedSeats;

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
    let allRooms = context.getters.seedRooms;

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
    let allMovies = context.getters.seedMovies;

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
    let allSessions = context.getters.seedSessions;

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
  registerOffsiteProducts(context) {
    let allProducts = context.getters.seedOffsiteProducts;

    for (let i = 0; i < allProducts.length; i++) {
      var name = allProducts[i].name
      var unitPrice = allProducts[i].unitPrice

      axios
        .post(process.env.VUE_APP_API_URL + "/offsiteproducts",
          { name, unitPrice }
        )
        .then((response) => {
          console.log("offsite products created", response.data);
        })
        .catch((err) => console.log(err));
    }
  },
}