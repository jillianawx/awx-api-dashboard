const helper = require("./helper")
const crypto = require("crypto")
const baseUrl = 'https://api-demo.airwallex.com/api/v1'

function getLinkedAccount(linkedAccountId, connectedAccountId) {
    const endpoint = baseUrl + "/linked_accounts/" + linkedAccountId
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function verifyLAMicroDeposit(linkedAccountId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "amounts": [ 0.09, 0.02 ]
          })
    }
    const endpoint = baseUrl + "/linked_accounts/" + linkedAccountId + "/verify_microdeposits"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getDDMandate(linkedAccountId, connectedAccountId) {
    const endpoint = baseUrl + "/linked_accounts/" + linkedAccountId + "/mandate"
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function updateDDMandate(linkedAccountId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "email": "tester@test.com",
            "preferred_reference": "AWX",
            "signatory": "Jillian",
            "type": "AU_BECS_DEBIT",
            "version": "1.1"
          })
    }
    const endpoint = baseUrl + "/linked_accounts/" + linkedAccountId + "/mandate"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function suspendLinkedAccount(linkedAccountId, connectedAccountId) {
    const endpoint = baseUrl + "/linked_accounts/" + linkedAccountId + "/suspend"
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function checkLABalance(linkedAccountId, connectedAccountId) {
    const endpoint = baseUrl + "/linked_accounts/" + linkedAccountId + "/balances"
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function confirmLinkedAccount(linkedAccountId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "account_identity": crypto.randomUUID()
          })
    }
    const endpoint = baseUrl + "/linked_accounts/" + linkedAccountId + "/confirm"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function refreshLAAuth(linkedAccountId, connectedAccountId, authType, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "plaid": {
                "client_name": "Airwallex",
                "country_code": "US",
                "language": "en",
              },
              "truelayer": {
                "country_code": "GB",
                "provider_id": "ob-monzo",
                "redirect_url": "https://www.airwallex.com"
              },
              "type": authType
          })
    }
    const endpoint = baseUrl + "/linked_accounts/" + linkedAccountId + "/auth"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function completeLAAuth(linkedAccountId, connectedAccountId, authType) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    config.body = JSON.stringify({
        "authType": authType
    })
    const endpoint = baseUrl + "/linked_accounts/" + linkedAccountId + "/complete_auth"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createDirectDebitDeposit(linkedAccountId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "amount": 124.27,
            "currency": "USD",
            "deposit_type": "DIRECT_DEBIT",
            "funding_source_id": linkedAccountId,
            "reference": "test ref",
            "request_id": crypto.randomUUID()
          })
    }
    const endpoint = baseUrl + "/deposits/create"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function updateDepositStatus(depositId, depositStatus, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    const endpoint = baseUrl + "/simulation/deposits/" + depositId + "/" + depositStatus
    return fetch(endpoint, config).then(res => { return res.json() })
}

function apiEndpointHandler(req, res) {
    switch(req.body.function) {
        case 'GetLinkedAccount': {
            return getLinkedAccount(req.body.linkedAccountId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get linked account", "errorMessage": error }))
        }
        case 'VerifyLAMicroDeposit': {
            return verifyLAMicroDeposit(req.body.linkedAccountId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to verify micro deposit", "errorMessage": error }))
        }
        case 'GetDDMandate': {
            return getDDMandate(req.body.linkedAccountId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get mandate", "errorMessage": error }))
        }
        case 'UpdateDDMandate': {
            return updateDDMandate(req.body.linkedAccountId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create mandate", "errorMessage": error }))
        }
        case 'SuspendLinkedAccount': {
            return suspendLinkedAccount(req.body.linkedAccountId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to suspend account", "errorMessage": error }))
        }
        case 'CheckLABalance': {
            return checkLABalance(req.body.linkedAccountId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to check balance", "errorMessage": error }))
        }
        case 'ConfirmLinkedAccount': {
            return confirmLinkedAccount(req.body.linkedAccountId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to confirm account", "errorMessage": error }))
        }
        case 'RefreshLAAuth': {
            return refreshLAAuth(req.body.linkedAccountId, req.body.connectedAccountId, req.body.authType, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to refresh auth", "errorMessage": error }))
        }
        case 'CompleteLAAuth': {
            return completeLAAuth(req.body.linkedAccountId, req.body.connectedAccountId, req.body.authType)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to complete auth", "errorMessage": error }))
        }
        case 'CreateDirectDebitDeposit': {
            return createDirectDebitDeposit(req.body.linkedAccountId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create new dd deposit", "errorMessage": error }))
        }
        case 'UpdateDepositStatus': {
            return updateDepositStatus(req.body.depositId,req.body.depositStatus, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to update deposit status", "errorMessage": error }))
        }
    }
}

module.exports = { apiEndpointHandler }