function getGlobalAccounts() {
    var endpoint = baseUrl + "/global_accounts"
    var parameterQueryString = document.getElementById("jsonBodyInput").value
    if (parameterQueryString && parameterQueryString != '') {
      endpoint += parameterQueryString
    }
    var config = getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createGlobalAccount() {
    const endpoint = baseUrl + '/global_accounts/create'
    var config = getDefaultConfigOBO("POST", connectedAccountId)
    var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
      config.body = JSON.stringify({
        "country_code": "US",
        "currency": "USD",
        "nick_name": "US Global Account",
        "payment_methods": [
          "LOCAL",
          "SWIFT"
        ],
        "request_id": crypto.randomUUID()
      })
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getGlobalAccount(globalAccountId) {
    if (!globalAccountId || globalAccountId == '') { throw new Error("No globalAccountId provided") }
    const endpoint = baseUrl + "/global_accounts/" + globalAccountId
    var config = getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function closeGlobalAccount(globalAccountId) {
    if (!globalAccountId || globalAccountId == '') { throw new Error("No globalAccountId provided") }
    const endpoint = baseUrl + "/global_accounts/" + globalAccountId + "/close"
    var config = getDefaultConfigOBO("POST", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function updateGlobalAccount(globalAccountId) {
    if (!globalAccountId || globalAccountId == '') { throw new Error("No globalAccountId provided") }
    var config = getDefaultConfigOBO("POST", connectedAccountId)
    var endpoint = baseUrl + '/global_accounts/' + globalAccountId + "/transactions"
    var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
    if (jsonBodyOverride || jsonBodyOverride != ''){
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "deposit_conversion_currency": "SGD",
            "nick_name": "US Global Account Updated"
        })
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getGATransactions(globalAccountId) {
    if (!globalAccountId || globalAccountId == '') { throw new Error("No globalAccountId provided") }
    const endpoint = baseUrl + "/global_accounts/" + globalAccountId + "/transactions"
    var config = getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function generateGAStatement(globalAccountId) {
    var statementType = document.querySelector('input[name="statementType"]:checked')?.value;
    if (!statementType || statementType == '') { throw new Error("No statement type chosen") }
    if (!globalAccountId || globalAccountId == '') { throw new Error("No globalAccountId provided") }
    const endpoint =  '/api/global_accounts'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GenerateGAStatement",
        "globalAccountId": globalAccountId,
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value,
        "statementType": statementType
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createDeposit(globalAccountId) {
    if (!globalAccountId || globalAccountId == '') { throw new Error("No globalAccountId provided") }
    const endpoint =  '/api/global_accounts'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "CreateDeposit",
        "globalAccountId": globalAccountId,
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getMandates(globalAccountId) {
  if (!globalAccountId || globalAccountId == '') { throw new Error("No globalAccountId provided") }
  var endpoint = baseUrl + "/global_accounts/" + globalAccountId +"/mandates"
  var parameterQueryString = document.getElementById("jsonBodyInput").value
  if (parameterQueryString && parameterQueryString != '') {
    endpoint += parameterQueryString
  }
  var config = getDefaultConfigOBO("GET", connectedAccountId)
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getMandate(globalAccountId, mandateId) {
  if (!globalAccountId || globalAccountId == '') { throw new Error("No globalAccountId provided") }
  if (!mandateId || mandateId == '') { throw new Error("No mandateId provided") }
  var endpoint = baseUrl + "/global_accounts/" + globalAccountId +"/mandates/" + mandateId
  var config = getDefaultConfigOBO("GET", connectedAccountId)
  return fetch(endpoint, config).then(res => { return res.json() })
}

function cancelMandate(globalAccountId, mandateId) {
  if (!globalAccountId || globalAccountId == '') { throw new Error("No globalAccountId provided") }
  if (!mandateId || mandateId == '') { throw new Error("No mandateId provided") }
  var endpoint = baseUrl + "/global_accounts/" + globalAccountId +"/mandates/" + mandateId + "/cancel"
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getDirectDebits() {
  const endpoint =  '/api/global_accounts'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetDirectDebits",
        "connectedAccountId": connectedAccountId,
        "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getDirectDebit(debitId) {
  if (!debitId || debitId == '') { throw new Error("No debitId provided") }
  const endpoint =  '/api/global_accounts'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetDirectDebit",
        "connectedAccountId": connectedAccountId,
        "debitId": debitId
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function cancelDirectDebit(debitId) {
  if (!debitId || debitId == '') { throw new Error("No debitId provided") }
  const endpoint =  '/api/global_accounts'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "CancelDirectDebit",
        "connectedAccountId": connectedAccountId,
        "debitId": debitId
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function attachEventListeners() {
  document.getElementById("getGlobalAccounts").addEventListener("click", () => {
    resetAPIStatus();
    try {
      getGlobalAccounts().then(globalAccounts => {
        if (globalAccounts?.code) { throw globalAccounts }
        var innerHtml = '<div>All Global Accounts</div><br>'
        globalAccounts.items.forEach(globalAccount => {
            innerHtml += getHtmlForGlobalAccount(globalAccount)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("createGlobalAccount").addEventListener("click", () => {
    resetAPIStatus();
    try {
      createGlobalAccount().then(globalAccount => {
        if (globalAccount?.code) { throw globalAccount }
        var innerHtml = '<div>New Global Account</div><br>'
        innerHtml += getHtmlForGlobalAccount(globalAccount)
        document.getElementById("contentContainer").innerHTML = innerHtml
        document.getElementById("globalAccIdInput").value = globalAccount.id
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getGlobalAccount").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var glocalAccountId = document.getElementById("globalAccIdInput").value;
      getGlobalAccount(glocalAccountId).then(globalAccount => {
        if (globalAccount?.code) { throw globalAccount }
        var innerHtml = '<div>Global Account</div><br>'
        innerHtml += getHtmlForGlobalAccount(globalAccount)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("closeGlobalAccount").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var glocalAccountId = document.getElementById("globalAccIdInput").value;
      closeGlobalAccount(glocalAccountId).then(globalAccount => {
        if (globalAccount?.code) { throw globalAccount }
        var innerHtml = '<div>Global Account</div><br>'
        innerHtml += getHtmlForGlobalAccount(globalAccount)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("updateGlobalAccount").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var glocalAccountId = document.getElementById("globalAccIdInput").value;
      updateGlobalAccount(glocalAccountId).then(globalAccount => {
        if (globalAccount?.code) { throw globalAccount }
        var innerHtml = '<div>Global Account</div><br>'
        innerHtml += getHtmlForGlobalAccount(globalAccount)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getGATransactions").addEventListener("click", () => {
    resetAPIStatus();
    try {
        var glocalAccountId = document.getElementById("globalAccIdInput").value;
        getGATransactions(glocalAccountId).then(transactions => {
        if (transactions?.code) { throw transactions }
        var innerHtml = '<div>All Global Account Transactions</div><br>'
        transactions.items.forEach(transaction => {
            innerHtml += getHtmlForGATransaction(transaction)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("generateGAStatement").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var glocalAccountId = document.getElementById("globalAccIdInput").value;
      generateGAStatement(glocalAccountId).then(response => {
        if (response?.code) { throw response }
        var innerHtml = '<div>Global Account Statement</div><br>'
        innerHtml += getHtmlForJSON(response)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("createDeposit").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var glocalAccountId = document.getElementById("globalAccIdInput").value;
      createDeposit(glocalAccountId).then(deposit => {
        if (deposit?.code) { throw deposit }
        var innerHtml = '<div>New Global Account Deposit</div><br>'
        innerHtml += getHtmlForDeposit(deposit)
        document.getElementById("contentContainer").innerHTML = innerHtml
        document.getElementById("globalAccDepositIdInput").value = deposit.id
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getMandates").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var glocalAccountId = document.getElementById("globalAccIdInput").value;
      getMandates(glocalAccountId).then(mandates => {
        if (mandates?.code) { throw mandates }
        var innerHtml = '<div>All Mandates</div><br>'
        mandates.items.forEach(mandate => {
            innerHtml += getHtmlForGlobalAccount(mandate)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getMandate").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var glocalAccountId = document.getElementById("globalAccIdInput").value;
      var mandateId = document.getElementById("mandateIdInput").value;
      getMandate(glocalAccountId, mandateId).then(mandate => {
        if (mandate?.code) { throw mandate }
        var innerHtml = '<div>Mandate</div><br>'
        innerHtml += getHtmlForGlobalAccount(mandate)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("cancelMandate").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var glocalAccountId = document.getElementById("globalAccIdInput").value;
      var mandateId = document.getElementById("mandateIdInput").value;
      cancelMandate(glocalAccountId, mandateId).then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Cancel Mandate</div><br>'
        innerHtml += getHtmlForJSON(result)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getDirectDebits").addEventListener("click", () => {
    resetAPIStatus();
    try {
      getDirectDebits().then(directDebits => {
        if (directDebits?.code) { throw directDebits }
        var innerHtml = '<div>All Direct Debits</div><br>'
        directDebits.items.forEach(directDebit => {
            innerHtml += getHtmlForDirectDebit(directDebit)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getDirectDebit").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var debitId = document.getElementById("debitIdInput").value;
      getDirectDebit(debitId).then(directDebits => {
        if (directDebits?.code) { throw directDebits }
        var innerHtml = '<div>Direct Debit</div><br>'
        innerHtml += getHtmlForDirectDebit(directDebit)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("cancelDirectDebit").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var debitId = document.getElementById("debitIdInput").value;
      cancelDirectDebit(debitId).then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Cancel Direct Debit</div><br>'
        innerHtml += getHtmlForJSON(result)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })
}