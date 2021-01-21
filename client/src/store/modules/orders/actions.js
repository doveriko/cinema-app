export default {
    saveOrder(context, data) {
        const orderData = {
            userId: data.userId,
            sessionId: data.sessionId
        }
    context.commit('saveOrder', orderData)
    }
}