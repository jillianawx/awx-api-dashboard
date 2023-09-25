// Importing helper methods
const helper = require("./helper")
const baseUrl = 'https://api-demo.airwallex.com/api/v1'

// Functions for Connected Accounts
function updateStatusOfCA(accountId, status) {
    var config = helper.getDefaultConfig("POST")
    config.body = JSON.stringify({
        "force": true,
        "next_status": status
    })
    const endpoint = baseUrl + '/simulation/accounts/' + accountId + '/update_status'
    return fetch(endpoint, config).then(response => { return response.json() })
}

module.exports = { updateStatusOfCA }