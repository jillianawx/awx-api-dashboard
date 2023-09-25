const fs = require('fs');
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const helper = require("./helper")
const baseUrl = 'https://api-demo.airwallex.com/api/v1'

function getBalances(connectedAccountId) {
    var endpoint = baseUrl + "/balances/current"
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getBalanceHistory(connectedAccountId, parameterQueryString) {
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/balances/history" + parameterQueryStringToAdd
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getDeposits(connectedAccountId, parameterQueryString) {
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/deposits" + parameterQueryStringToAdd
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
  }
  
  function getDeposit(depositId, connectedAccountId) {
    var endpoint = baseUrl + "/deposits/" + depositId
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
  }

function getTransactions(connectedAccountId, parameterQueryString) {
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/financial_transactions" + parameterQueryStringToAdd
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
  }
  
  function getTransaction(transactionId, connectedAccountId) {
    var endpoint = baseUrl + "/financial_transactions/" + transactionId
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
  }
  
  function getSettlements(connectedAccountId, parameterQueryString) {
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/pa/financial/settlements" + parameterQueryStringToAdd
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
  }
  
  function getSettlement(settlementId, connectedAccountId) {
    var endpoint = baseUrl + "/pa/financial/settlements/" + settlementId
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
  }
  
  function getSettlementReport(settlementId, connectedAccountId) {
    var endpoint = baseUrl + "/pa/financial/settlements/" + settlementId + "/report"
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
  }

  function getReports(connectedAccountId, parameterQueryString) {
    var parameterQueryStringToAdd = ''
    if (parameterQueryString && parameterQueryString != '') {
        parameterQueryStringToAdd = parameterQueryString
    }
    var endpoint = baseUrl + "/finance/financial_reports" + parameterQueryStringToAdd
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
  }

  function getReport(reportId, connectedAccountId) {
    var endpoint = baseUrl + "/finance/financial_reports/" + reportId
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
  }

  function createReport(connectedAccountId, reportType, jsonBodyOverride) {
    var endpoint = baseUrl + "/finance/financial_reports/create"
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    var file_format = "CSV"
    if (reportType == 'ONLINE_PAYMENTS_TRANSACTION_REPORT') { file_format = "EXCEL" }
    if (reportType == 'ACCOUNT_STATEMENT_REPORT') { file_format = "PDF" }
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "currencies": [ "USD", "AUD", "SGD", "CNY", "HKD" ],
            "file_format": file_format,
            "from_created_at": "2023-01-01",
            "to_created_at": "2023-12-31",
            "type" : reportType
        })
    }
    return fetch(endpoint, config).then(res => { return res.json() })
  }

function getReportContent(reportId, connectedAccountId) {
    var endpoint = baseUrl + "/finance/financial_reports/" + reportId + "/content"
    var config = helper.getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(result => {
        if (result.ok) {
            var fileName = result.headers.get('Content-Disposition').split("=")[1].replaceAll('\"', '');
            const stream = fs.createWriteStream(fileName);
            finished(Readable.fromWeb(result.body).pipe(stream))
            return { "message": "File downloaded in Project root folder - " + fileName }
        }
        return { "code": result.status, "message": "Unable to generate statement", "error": result.statusText }
    })
}

function createLetter(transactionId, letterType, connectedAccountId) {
    var endpoint = baseUrl + "/confirmation_letters/create"
    var config = helper.getDefaultConfigOBO("POST", connectedAccountId)
    config.body = JSON.stringify({
        "format": letterType,
        "transaction_id": transactionId
    })
    return fetch(endpoint, config).then(result => {
        if (result.ok) {
            var fileName = result.headers.get('Content-Disposition').split("=")[1].replaceAll('\"', '');
            const stream = fs.createWriteStream(fileName);
            finished(Readable.fromWeb(result.body).pipe(stream))
            return { "message": "File downloaded in Project root folder - " + fileName }
        }
        return { "code": result.status, "message": "Unable to generate statement", "error": result.statusText }
    })
}

function apiEndpointHandler(req, res) {
    switch(req.body.function) {
        case 'GetBalances': {
            return getBalances(req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get balances", "errorMessage": error }))
        }
        case 'GetBalanceHistory': {
            return getBalanceHistory(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get balance history", "errorMessage": error }))
        }
        case 'GetDeposits': {
            return getDeposits(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get deposits", "errorMessage": error }))
        }
        case 'GetDeposit': {
            return getDeposit(req.body.depositId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get deposit", "errorMessage": error }))
        }
        case 'GetTransactions': {
            return getTransactions(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get transactions", "errorMessage": error }))
        }
        case 'GetTransaction': {
            return getTransaction(req.body.transactionId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get transaction", "errorMessage": error }))
        }
        case 'GetSettlements': {
            return getSettlements(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get settlements", "errorMessage": error }))
        }
        case 'GetSettlement': {
            return getSettlement(req.body.settlementId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get settlement", "errorMessage": error }))
        }
        case 'GetSettlementReport': {
            return getSettlementReport(req.body.settlementId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get settlement report", "errorMessage": error }))
        }
        case 'GetReports': {
            return getReports(req.body.connectedAccountId, req.body.parameterQueryString)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get reports", "errorMessage": error }))
        }
        case 'GetReport': {
            return getReport(req.body.reportId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get report", "errorMessage": error }))
        }
        case 'CreateReport': {
            return createReport(req.body.connectedAccountId, req.body.reportType, req.body.jsonBodyOverride)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create report", "errorMessage": error }))
        }
        case 'GetReportContent': {
            return getReportContent(req.body.reportId, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to get report", "errorMessage": error }))
        }
        case 'CreateLetter': {
            return createLetter(req.body.transactionId, req.body.letterType, req.body.connectedAccountId)
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json({ "error": "Unable to create letter", "errorMessage": error }))
        }
    }
}

module.exports = { apiEndpointHandler }