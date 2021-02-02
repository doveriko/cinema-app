import axios from 'axios';

export default {
    saveSession(context, data) {
        let session = {
            sessionId: data.sessionId,
            sessionTime: data.sessionTime,
            movieTitle: data.movieTitle
        }
        context.commit('saveSession', session)
    },
    registerOrder(context, data) {
        let newOrder = {
            userId: data.userId,
            sessionId: data.sessionId
        }

        let { userId, sessionId } = newOrder;

        axios
        .post("http://localhost:3000" + `/users/${userId}/orders`,
          { userId, sessionId },
          { withCredentials: false }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

        context.commit('registerOrder', newOrder);
    }
}