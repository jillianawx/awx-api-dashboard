// Importing helper methods
const helper = require("./helper")
const baseUrl = 'https://api-demo.airwallex.com/api/v1'
const crypto = require("crypto")

// Functions for Payment Intents
function getPaymentIntents(connectedAccountId, parameterQueryString) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/pa/payment_intents" + parameterQueryStringToAdd
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getPaymentIntent(paymentIntentId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    const endpoint = baseUrl + "/pa/payment_intents/" + paymentIntentId
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createPaymentIntent(connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "request_id": crypto.randomUUID(),
            "amount": Math.floor(Math.random() * 1000),
            "currency": "USD",
            "merchant_order_id": "Merchant_Order_" + crypto.randomUUID(),
            "connected_account_id": (helper.scaleModel == '1.1' || helper.scaleModel == '1.2') ? null : connectedAccountId
        })
    }
    const endpoint = baseUrl + "/pa/payment_intents/create"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function confirmPaymentIntent(paymentIntentId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "request_id": crypto.randomUUID(),
            "return_url": "https://google.com",
            "payment_method": {
                "type": "card",
                "card": {
                    "billing": {
                        "address": {
                            "city": "Berkeley",
                            "country_code": "US",
                            "postcode": "25000",
                            "state": "CA",
                            "street": "123 Street"
                        },
                        "first_name": "John",
                        "last_name": "Smith"
                    },
                    "expiry_month": "12",
                    "expiry_year": "2030",
                    "cvc": "123",
                    "number": "4111111111111111"
                }
            },
            "payment_method_options": {
                "card": {
                    "auto_capture": false
                }
            }
        })
    }
    const endpoint = baseUrl + "/pa/payment_intents/" + paymentIntentId + "/confirm"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function continue3DSPaymentIntent(paymentIntentId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "request_id": crypto.randomUUID(),
            "three_ds": {
                "acs_response": "threeDSMethodData=eyJ0aH...",
                "device_data_collection_res": "Standard JWT",
                "ds_transaction_id": "Y2FyZGluYWxjb21tZXJjZWF1dGg=",
                "return_url": "https://www.example.com/3ds-result"
            },
            "type": "3ds_continue",
        })
    }
    const endpoint = baseUrl + "/pa/payment_intents/" + paymentIntentId + "/confirm_continue"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function capturePaymentIntent(paymentIntentId, connectedAccountId, jsonBodyOverride) {
    var amount = getPaymentIntent(paymentIntentId).amount
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "request_id": crypto.randomUUID(),
            "amount": amount
        })
    }
    const endpoint = baseUrl + "/pa/payment_intents/" + paymentIntentId + "/capture"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function cancelPaymentIntent(paymentIntentId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "cancellation_reason": "Account requested cancellation",
            "request_id": crypto.randomUUID()
        })
    }
    const endpoint = baseUrl + "/pa/payment_intents/" + paymentIntentId + "/cancel"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getPaymentAttempts(connectedAccountId, parameterQueryString) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/pa/payment_attempts" + parameterQueryStringToAdd
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getPaymentAttempt(paymentAttemptId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    const endpoint = baseUrl + "/pa/payment_attempts/" + paymentAttemptId
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createRefund(paymentIntentId, paymentAttemptId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "payment_attempt_id": (paymentAttemptId == '') ? null : paymentAttemptId,
            "payment_intent_id": (paymentIntentId == '') ? null : paymentIntentId,
            "reason": "Return good",
            "request_id": crypto.randomUUID()
        })
    }
    const endpoint = baseUrl + "/pa/refunds/create"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getRefunds(connectedAccountId, parameterQueryString) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/pa/refunds" + parameterQueryStringToAdd
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getRefund(refundId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    const endpoint = baseUrl + "/pa/refunds/" + refundId
    return fetch(endpoint, config).then(res => { return res.json() })
}

function apiEndpointHandler(req, res) {
    switch(req.body.function) {
        case 'GetPaymentIntents': {
            return getPaymentIntents(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get payment intents", "errorMessage": error }))
        }
        case 'GetPaymentIntent': {
            return getPaymentIntent(req.body.paymentIntentId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get payment intent", "errorMessage": error }))
        }
        case 'CreatePaymentIntent': {
            return createPaymentIntent(req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create payment intent", "errorMessage": error }))
        }
        case 'ConfirmPaymentIntent': {
            return confirmPaymentIntent(req.body.paymentIntentId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to confirm payment intent", "errorMessage": error }))
        }
        case 'Continue3DSPaymentIntent': {
            return continue3DSPaymentIntent(req.body.paymentIntentId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to confirm payment intent", "errorMessage": error }))
        }
        case 'CancelPaymentIntent': {
            return cancelPaymentIntent(req.body.paymentIntentId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to cancel payment intent", "errorMessage": error }))
        }
        case 'CapturePaymentIntent': {
            return capturePaymentIntent(req.body.paymentIntentId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to capture payment intent", "errorMessage": error }))
        }
        case 'GetPaymentAttempts': {
            return getPaymentAttempts(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get payment attempts", "errorMessage": error }))
        }
        case 'GetPaymentAttempt': {
            return getPaymentAttempt(req.body.paymentAttemptId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get payment attempt", "errorMessage": error }))
        }
        case 'CreateRefund': {
            return createRefund(req.body.paymentIntentId, req.body.paymentAttemptId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create refund", "errorMessage": error }))
        }
        case 'GetRefunds': {
            return getRefunds(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get refunds", "errorMessage": error }))
        }
        case 'GetRefund': {
            return getRefund(req.body.refundId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get refund", "errorMessage": error }))
        }
    }
}

module.exports = { apiEndpointHandler }