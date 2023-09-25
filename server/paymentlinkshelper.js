// Importing helper methods
const helper = require("./helper")
const baseUrl = 'https://api-demo.airwallex.com/api/v1'
const crypto = require("crypto")

function getPaymentLinks(connectedAccountId, parameterQueryString) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/pa/payment_links" + parameterQueryStringToAdd
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getPaymentLink(paymentLinkId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    const endpoint = baseUrl + "/pa/payment_links/" + paymentLinkId
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createPaymentLink(connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "title": "Order at " + new Date(),
            "reusable": true,
            "amount" : 100,
            "currency": "USD"
        })
    }
    const endpoint = baseUrl + "/pa/payment_links/create"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function updatePaymentLink(paymentLinkId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "description": "Description added for payment link"
        })
    }
    const endpoint = baseUrl + "/pa/payment_links/" + paymentLinkId + "/update"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function sendPaymentLink(paymentLinkId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "shopper_email": "test@test.com"
        })
    }
    const endpoint = baseUrl + "/pa/payment_links/" + paymentLinkId + "/notify_shopper"
    return fetch(endpoint, config).then(res => { return res })
}

function activatePaymentLink(paymentLinkId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    const endpoint = baseUrl + "/pa/payment_links/" + paymentLinkId + "/activate"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function deactivatePaymentLink(paymentLinkId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("POSt", connectedAccountId)
    const endpoint = baseUrl + "/pa/payment_links/" + paymentLinkId + "/deactivate"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function apiEndpointHandler(req, res) {
    switch(req.body.function) {
        case 'GetPaymentLinks': {
            return getPaymentLinks(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get payment links", "errorMessage": error }))
        }
        case 'GetPaymentLink': {
            return getPaymentLink(req.body.paymentLinkId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get payment link", "errorMessage": error }))
        }
        case 'CreatePaymentLink': {
            return createPaymentLink(req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create payment link", "errorMessage": error }))
        }
        case 'UpdatePaymentLink': {
            return updatePaymentLink(req.body.paymentLinkId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to update payment link", "errorMessage": error }))
        }
        case 'SendPaymentLink': {
            return sendPaymentLink(req.body.paymentLinkId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to send payment link", "errorMessage": error }))
        }
        case 'ActivatePaymentLink': {
            return activatePaymentLink(req.body.paymentLinkId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to activate payment link", "errorMessage": error }))
        }
        case 'DeactivatePaymentLink': {
            return deactivatePaymentLink(req.body.paymentLinkId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to deactivate payment link", "errorMessage": error }))
        }
    }
}

module.exports = { apiEndpointHandler }