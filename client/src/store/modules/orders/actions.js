export default {
    saveSession(context, data) {
        const session = {
            sessionId: data.sessionId
        }
    context.commit('saveSession', session)
    },
    saveUser(context, data) {
        const userId = {
            userId: data.userId
        }
    context.commit('saveUser', userId)
    }
}