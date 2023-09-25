// Importing helper methods
const helper = require("./helper")
const baseUrl = 'https://api-demo.airwallex.com/api/v1'
const crypto = require("crypto")

function getFundsSplits(connectedAccountId, paymentIntentId, parameterQueryString) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    else if (paymentIntentId && paymentIntentId != String.empty) {
        parameterQueryStringToAdd = "?source_id=" + paymentIntentId
    }
    var endpoint = baseUrl + "/pa/funds_splits" + parameterQueryStringToAdd
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getFundsSplit(fundsSplitId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    const endpoint = baseUrl + "/pa/funds_splits/" + fundsSplitId
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createFundsSplit(connectedAccountId, paymentIntentId, destinationAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "amount": "10",
            "auto_release": false,
            "destination": destinationAccountId,
            "request_id": crypto.randomUUID(),
            "source_id": paymentIntentId,
            "source_type": "PAYMENT_INTENT"
        })
    }
    const endpoint = baseUrl + "/pa/funds_splits/create"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function releaseFundsSplit(fundsSplitId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    config.body = JSON.stringify({ "request_id": crypto.randomUUID() })
    const endpoint = baseUrl + "/pa/funds_splits/" + fundsSplitId + "/release"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createFundsSplitReversal(fundsSplitId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "amount": "1",
            "funds_split_id": fundsSplitId,
            "metadata": {
                "foo": "bar"
            },
            "request_id": crypto.randomUUID()
        })
    }
    const endpoint = baseUrl + "/pa/funds_split_reversals/create"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getFundsSplitReversals(fundsSplitId, connectedAccountId, parameterQueryString) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    else if (paymentIntentId && paymentIntentId != String.empty) {
        parameterQueryStringToAdd = "?funds_split_id=" + fundsSplitId
    }
    const endpoint = baseUrl + "/pa/funds_split_reversals" + parameterQueryStringToAdd
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getFundsSplitReversal(fundsSplitReversalId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    const endpoint = baseUrl + "/pa/funds_split_reversals/" + fundsSplitReversalId
    return fetch(endpoint, config).then(res => { return res.json() })
}

function apiEndpointHandler(req, res) {
    switch(req.body.function) {
        case 'GetFundsSplits': {
            return getFundsSplits(req.body.connectedAccountId, req.body.paymentIntentId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get funds splits", "errorMessage": error }))
        }
        case 'GetFundsSplit': {
            return getFundsSplit(req.body.fundsSplitId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get funds split", "errorMessage": error }))
        }
        case 'CreateFundsSplit': {
            return createFundsSplit(req.body.connectedAccountId, req.body.paymentIntentId, req.body.destinationAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create funds split", "errorMessage": error }))
        }
        case 'ReleaseFundsSplit': {
            return releaseFundsSplit(req.body.fundsSplitId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to release funds split", "errorMessage": error }))
        }
        case 'CreateFundsSplitReversal': {
            return createFundsSplitReversal(req.body.fundsSplitId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create funds split reversal", "errorMessage": error }))
        }
        case 'GetFundsSplitReversals': {
            return getFundsSplitReversals(req.body.fundsSplitId, req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get funds split reversals", "errorMessage": error }))
        }
        case 'GetFundsSplitReversal': {
            return getFundsSplitReversal(req.body.fundsSplitReversalId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get funds split reversal", "errorMessage": error }))
        }
    }
}

module.exports = { apiEndpointHandler }