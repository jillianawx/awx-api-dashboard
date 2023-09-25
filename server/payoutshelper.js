// Importing helper methods
const helper = require("./helper")
const baseUrl = 'https://api-demo.airwallex.com/api/v1'

function transitionPaymentStatus(payoutStatus, payoutPaymentId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    config.body = JSON.stringify({
        "next_status": payoutStatus
    })
    const endpoint = baseUrl + '/simulation/payments/' + payoutPaymentId + '/transition'
    return fetch(endpoint, config).then(response => { return response.json() })
}

module.exports = { transitionPaymentStatus }