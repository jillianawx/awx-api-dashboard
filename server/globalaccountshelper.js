const fs = require('fs');
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const helper = require("./helper")
const baseUrl = 'https://api-demo.airwallex.com/api/v1'

function generateGAStatement(globalAccountId, connectedAccountId, statementType, jsonBodyOverride) {
    const endpoint = baseUrl + "/global_accounts/" + globalAccountId + "/generate_statement_letter"
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride || jsonBodyOverride != ''){
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "account_statement_type": statementType,
            "registration_info": {
                "agreement": true,
                "registered_address": {
                  "address": "15 William Street",
                  "city": "Melbourne",
                  "country": "Australia",
                  "postcode": "3000",
                  "state": "VIC"
                },
                "registered_email": "john.walker@gmail.com",
                "registered_name": "John Walker"
              }
        })
    }
    return fetch(endpoint, config).then(result => {
        if (result.ok) {
            var fileName = 'GAStatement-' + globalAccountId + '-' + statementType + '-' + new Date() + '.pdf'
            const stream = fs.createWriteStream(fileName);
            finished(Readable.fromWeb(result.body).pipe(stream))
            return { "message": "File downloaded in Project root folder - " + fileName }
        }
        // Error handling to be fixed - can't hand off error message from readable stream
        return { "code": result.status, "message": "Unable to generate statement", "error": result.statusText }
    })
}


function createDeposit(globalAccountId, connectedAccountId, jsonBodyOverride) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "amount": 1000,
            "global_account_id": globalAccountId,
            "payer_bankname": "JP Morgan Chase",
            "payer_country": "US",
            "payer_name": "John Smith",
            "reference": "Deposit for xyz",
            "statement_ref": "5487287788",
            "status": "PENDING"
          })
    }
    const endpoint = baseUrl + "/simulation/deposit/create"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getDirectDebits(connectedAccountId, parameterQueryString) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/direct_debits" + parameterQueryStringToAdd
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getDirectDebit(debitId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    var endpoint = baseUrl + "/direct_debits/" + debitId
    return fetch(endpoint, config).then(res => { return res.json() })
}

function cancelDirectDebit(debitId, connectedAccountId) {
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    var endpoint = baseUrl + "/direct_debits/" + debitId + "/cancel"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function apiEndpointHandler(req, res) {
    switch(req.body.function) {
        case 'GenerateGAStatement': {
            return generateGAStatement(req.body.globalAccountId, req.body.connectedAccountId, req.body.statementType, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to generate statement", "errorMessage": error }))
        }
        case 'CreateDeposit': {
            return createDeposit(req.body.globalAccountId, req.body.connectedAccountId, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create deposit", "errorMessage": error }))
        }
        case 'GetDirectDebits': {
            return getDirectDebits(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get direct debits", "errorMessage": error }))
        }
        case 'GetDirectDebit': {
            return getDirectDebit(req.body.debitId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get direct debit", "errorMessage": error }))
        }
        case 'CancelDirectDebit': {
            return cancelDirectDebit(req.body.debitId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to cancel direct debit", "errorMessage": error }))
        }
    }
}

module.exports = { apiEndpointHandler }