function getBalances() {
    const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetBalances",
        "connectedAccountId": connectedAccountId
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getBalanceHistory() {
    const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetBalanceHistory",
        "connectedAccountId": connectedAccountId,
        "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getDeposits() {
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetDeposits",
        "connectedAccountId": connectedAccountId,
        "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getDeposit(depositId) {
  if (!depositId || depositId == '') { throw new Error("No depositId provided") }
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetDeposit",
        "depositId": depositId,
        "connectedAccountId": connectedAccountId,
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getTransactions() {
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetTransactions",
        "connectedAccountId": connectedAccountId,
        "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getTransaction(transactionId) {
  if (!transactionId || transactionId == '') { throw new Error("No depositId provided") }
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetTransaction",
        "transactionId": transactionId,
        "connectedAccountId": connectedAccountId,
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function createLetter(transactionId, letterType) {
  if (!transactionId || transactionId == '') { throw new Error("No transactionId provided") }
  if (!letterType || letterType == '') { throw new Error("No letterType provided") }
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "CreateLetter",
        "transactionId": transactionId,
        "letterType": letterType,
        "connectedAccountId": connectedAccountId,
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getSettlements() {
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetSettlements",
        "connectedAccountId": connectedAccountId,
        "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getSettlement(settlementId) {
  if (!settlementId || settlementId == '') { throw new Error("No settlementId provided") }
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetSettlement",
        "settlementId": settlementId,
        "connectedAccountId": connectedAccountId,
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getSettlementReport(settlementId) {
  if (!settlementId || settlementId == '') { throw new Error("No settlementId provided") }
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetSettlementReport",
        "settlementId": settlementId,
        "connectedAccountId": connectedAccountId,
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getReports() {
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetReports",
        "connectedAccountId": connectedAccountId,
        "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getReport(reportId) {
  if (!reportId || reportId == '') { throw new Error("No reportId provided") }
  const endpoint =  '/api/wallet'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "GetReport",
      "reportId": reportId,
      "connectedAccountId": connectedAccountId,
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function createReport(reportType) {
  if (!reportType || reportType == '') { throw new Error("No Report Type selected") }
  const endpoint =  '/api/wallet'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "CreateReport",
      "reportType": reportType,
      "connectedAccountId": connectedAccountId,
      "jsonBodyOverride": document.getElementById("jsonBodyInput").value
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getReportContent(reportId) {
  if (!reportId || reportId == '') { throw new Error("No reportId provided") }
  const endpoint =  '/api/wallet'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetReportContent",
        "reportId": reportId,
        "connectedAccountId": connectedAccountId,
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getCapability() {
  var endpoint = baseUrl + "/account_capabilities/transfer_cny_local"
  var config = getDefaultConfigOBO("GET", connectedAccountId)
  return fetch(endpoint, config).then(res => { return res.json() })
}

function enableCapability() {
  var endpoint = baseUrl + "/account_capabilities/transfer_cny_local/enable"
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
    if (jsonBodyOverride || jsonBodyOverride != ''){
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
          "business_declarant_info": {
            "bank_detail": {
              "account_number": "4682037906128888",
              "bank_name": "JP Morgan",
              "cnaps_code": "104100000004",
              "mobile_number": "13531632875"
            },
            "contact_email": "contact@airwallex.com",
            "economic_category_code": "171",
            "is_special_economic_zone": false,
            "special_economic_zone_business_type": "12"
          },
          "entity_type": "BUSINESS",
          "id": "transfer_cny_local"
        })
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function attachEventListeners() {
  document.getElementById("getCurrentBalances").addEventListener("click", () => {
      resetAPIStatus();
      try {
      getBalances().then(balances => {
          if (balances?.code) { throw balances }
          var innerHtml = '<div>All Balances</div><br>'
          balances.forEach(balance => {
              if (balance.total_amount > 0) { innerHtml += getHtmlForJSON(balance) }
          })
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
      }).catch((error) => failure(error))
      } catch (error) { failure(error) }
  })

  document.getElementById("getBalanceHistory").addEventListener("click", () => {
      resetAPIStatus();
      try {
      getBalanceHistory().then(balances => {
          if (balances?.code) { throw balances }
          var innerHtml = '<div>All Balance History</div><br>'
          balances.items.forEach(balance => {
              innerHtml += getHtmlForBalanceHistory(balance)
          })
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
      }).catch((error) => failure(error))
      } catch (error) { failure(error) }
  })

  document.getElementById("getDeposits").addEventListener("click", () => {
    resetAPIStatus();
    try {
        getDeposits().then(deposits => {
        if (deposits?.code) { throw deposits }
        var innerHtml = '<div>All Deposits</div><br>'
        deposits.forEach(deposit => {
            innerHtml += getHtmlForDeposit(deposit)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getDeposit").addEventListener("click", () => {
    resetAPIStatus();
    try {
        var depositId = document.getElementById("depositIdInput").value;
        getDeposit(depositId).then(deposit => {
        if (deposit?.code) { throw deposit }
        var innerHtml = '<div>Deposit</div><br>'
          innerHtml += getHtmlForDeposit(deposit)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getTransactions").addEventListener("click", () => {
    resetAPIStatus();
    try {
        getTransactions().then(transactions => {
        if (transactions?.code) { throw transactions }
        var innerHtml = '<div>All Transactions</div><br>'
        transactions.items.forEach(transaction => {
            innerHtml += getHtmlForTransaction(transaction)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
})

  document.getElementById("getTransaction").addEventListener("click", () => {
    resetAPIStatus();
    try {
        var transactionId = document.getElementById("transactionIdInput").value;
        getTransaction(transactionId).then(transaction => {
        if (transaction?.code) { throw transaction }
        var innerHtml = '<div>Transaction</div><br>'
          innerHtml += getHtmlForTransaction(transaction)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("createLetter").addEventListener("click", () => {
    resetAPIStatus();
    try {
        var letterType = document.querySelector('input[name="letterType"]:checked')?.value;
        var transactionId = document.getElementById("transactionIdInput").value;
        createLetter(transactionId, letterType).then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Letter</div><br>'
            innerHtml += getHtmlForJSON(result)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getSettlements").addEventListener("click", () => {
    resetAPIStatus();
    try {
        getSettlements().then(settlements => {
        if (settlements?.code) { throw settlements }
        var innerHtml = '<div>All Settlements</div><br>'
        settlements.items.forEach(settlement => {
            innerHtml += getHtmlForSettlement(settlement)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getSettlement").addEventListener("click", () => {
    resetAPIStatus();
    try {
        var settlementId = document.getElementById("settlementIdInput").value;
        getSettlement(settlementId).then(settlement => {
        if (settlement?.code) { throw settlement }
        var innerHtml = '<div>Settlement</div><br>'
          innerHtml += getHtmlForSettlement(settlement)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getSettlementReport").addEventListener("click", () => {
    resetAPIStatus();
    try {
        var settlementId = document.getElementById("settlementIdInput").value;
        getSettlementReport(settlementId).then(settlement => {
        if (settlement?.code) { throw settlement }
        var innerHtml = '<div>Settlement Report</div><br>'
        innerHtml += getHtmlForSettlementReport(settlement)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getReports").addEventListener("click", () => {
    resetAPIStatus();
    try {
        getReports().then(reports => {
        if (reports?.code) { throw reports }
        var innerHtml = '<div>All Reports</div><br>'
        reports.items.forEach(report => {
            innerHtml += getHtmlForReport(report)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getReport").addEventListener("click", () => {
    resetAPIStatus();
    try {
        var reportId = document.getElementById("reportIdInput").value;
        getReport(reportId).then(report => {
        if (report?.code) { throw report }
        var innerHtml = '<div>Report</div><br>'
            innerHtml += getHtmlForReport(report)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("createReport").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var reportType = document.querySelector('input[name="reportType"]:checked')?.value;
    createReport(reportType).then(report => {
        if (report?.code) { throw report }
        var innerHtml = '<div>Created Report</div><br>'
        innerHtml += getHtmlForReport(report)
        document.getElementById("contentContainer").innerHTML = innerHtml
        document.getElementById("reportIdInput").value = report.id;
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getReportContent").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var reportId = document.getElementById("reportIdInput").value;
      getReportContent(reportId).then(response => {
        if (response?.code) { throw response }
        var innerHtml = '<div>Report Content</div><br>'
        innerHtml += getHtmlForJSON(response)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getCapability").addEventListener("click", () => {
    resetAPIStatus();
    try {
      getCapability().then(response => {
        if (response?.code) { throw response }
        var innerHtml = '<div>Capability</div><br>'
        innerHtml += getHtmlForJSON(response)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("enableCapability").addEventListener("click", () => {
    resetAPIStatus();
    try {
      enableCapability().then(response => {
        if (response?.code) { throw response }
        var innerHtml = '<div>Capability</div><br>'
        innerHtml += getHtmlForJSON(response)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })
}