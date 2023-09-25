function getLinkedAccounts() {
    var endpoint = baseUrl + "/linked_accounts"
    var parameterQueryString = document.getElementById("jsonBodyInput").value
    if (parameterQueryString && parameterQueryString != '') {
      endpoint += parameterQueryString
    }
    var config = getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function generateLAAuth() {
  var authType = document.querySelector('input[name="authType"]:checked')?.value;
  if (!authType || authType == '') { throw new Error("No AuthType selected.") }
  const endpoint = baseUrl + '/linked_accounts/auth'
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
  if (jsonBodyOverride && jsonBodyOverride != '') {
      config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
  } else {
    config.body = JSON.stringify({
      "plaid": {
        "client_name": "Airwallex",
        "country_code": "US",
        "language": "en"
      },
      "truelayer": {
        "country_code": "GB",
        "provider_id": "ob-monzo",
        "redirect_url": "https://www.airwallex.com"
      },
      "type": authType
    })
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function createLinkedAccount() {
    const endpoint = baseUrl + '/linked_accounts/create'
    var config = getDefaultConfigOBO("POST", connectedAccountId)
    var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
      config.body = JSON.stringify({
        "preferred_verification_type": "MICRO_DEPOSIT",
        "type": "SG_BANK",
        "sg_bank": {
          "account_name": "Jillian",
          "account_number": "89098199205" + Math.floor(Math.random() * 1000),
          "currency": "SGD",
          "entity_type": "BUSINESS",
          "swift_code": "DBSSSGSG"
        },
        "request_id": crypto.randomUUID()
      })
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getLinkedAccount(linkedAccountId) {
    if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
    const endpoint =  '/api/linked_accounts'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetLinkedAccount",
        "linkedAccountId": linkedAccountId,
        "connectedAccountId": connectedAccountId
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function verifyLAMicroDeposit(linkedAccountId) {
    if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
    const endpoint = '/api/linked_accounts/'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "VerifyLAMicroDeposit",
        "linkedAccountId": linkedAccountId,
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getDDMandate(linkedAccountId) {
  if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
  const endpoint =  '/api/linked_accounts'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "GetDDMandate",
      "linkedAccountId": linkedAccountId,
      "connectedAccountId": connectedAccountId
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function updateDDMandate(linkedAccountId) {
  if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
  const endpoint =  '/api/linked_accounts'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "UpdateDDMandate",
      "linkedAccountId": linkedAccountId,
      "connectedAccountId": connectedAccountId,
      "jsonBodyOverride": document.getElementById("jsonBodyInput").value
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function suspendLinkedAccount(linkedAccountId) {
  if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
  const endpoint =  '/api/linked_accounts'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "SuspendLinkedAccount",
      "linkedAccountId": linkedAccountId,
      "connectedAccountId": connectedAccountId,
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function checkLABalance(linkedAccountId) {
  if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
  const endpoint =  '/api/linked_accounts'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "CheckLABalance",
      "linkedAccountId": linkedAccountId,
      "connectedAccountId": connectedAccountId,
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function confirmLinkedAccount(linkedAccountId) {
  if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
  const endpoint =  '/api/linked_accounts'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "ConfirmLinkedAccount",
      "linkedAccountId": linkedAccountId,
      "connectedAccountId": connectedAccountId,
      "jsonBodyOverride": document.getElementById("jsonBodyInput").value
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function refreshLAAuth(linkedAccountId) {
  if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
  var authType = document.querySelector('input[name="authType"]:checked')?.value;
  if (!authType || authType == '') { throw new Error("No AuthType selected.") }
  const endpoint = '/api/linked_accounts/'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "RefreshLAAuth",
      "linkedAccountId": linkedAccountId,
      "connectedAccountId": connectedAccountId,
      "authType": authType,
      "jsonBodyOverride": document.getElementById("jsonBodyInput").value
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function completeLAAuth(linkedAccountId) {
  if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
  var authType = document.querySelector('input[name="authType"]:checked')?.value;
  if (!authType || authType == '') { throw new Error("No AuthType selected.") }
  const endpoint = '/api/linked_accounts/'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "RefreshLAAuth",
      "linkedAccountId": linkedAccountId,
      "connectedAccountId": connectedAccountId,
      "authType": authType
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function attachEventListenersLinkedAccounts() {
  document.getElementById("getLinkedAccounts").addEventListener("click", () => {
      resetAPIStatus();
      try {
      getLinkedAccounts().then(linkedAccounts => {
          if (linkedAccounts?.code) { throw linkedAccounts }
          var innerHtml = '<div>All Linked Accounts</div><br>'
          linkedAccounts.items.forEach(linkedAccounts => {
              innerHtml += getHtmlForLinkedAccount(linkedAccounts)
          })
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
      }).catch((error) => failure(error))
      } catch (error) { failure(error) }
  })

  document.getElementById("generateLAAuth").addEventListener("click", () => {
    resetAPIStatus();
    try {
    generateLAAuth().then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Auth</div><br>'
          innerHtml += getHtmlForJSON(result)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("createLinkedAccount").addEventListener("click", () => {
    resetAPIStatus();
    try {
    createLinkedAccount().then(linkedAccount => {
        if (linkedAccount?.code) { throw linkedAccount }
        var innerHtml = '<div>New Linked Account</div><br>'
          innerHtml += getHtmlForLinkedAccount(linkedAccount)
        document.getElementById("contentContainer").innerHTML = innerHtml
        document.getElementById("linkedAccIdInput").value = linkedAccount.id
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getLinkedAccount").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
    getLinkedAccount(linkedAccountId).then(linkedAccount => {
        if (linkedAccount?.code) { throw linkedAccount }
        var innerHtml = '<div>Linked Account</div><br>'
          innerHtml += getHtmlForLinkedAccount(linkedAccount)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("verifyLAMicroDeposit").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
    verifyLAMicroDeposit(linkedAccountId).then(linkedAccount => {
        if (linkedAccount?.code) { throw linkedAccount }
        var innerHtml = '<div>Linked Account</div><br>'
          innerHtml += getHtmlForLinkedAccount(linkedAccount)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getDDMandate").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
    getDDMandate(linkedAccountId).then(mandate => {
        if (mandate?.code) { throw mandate }
        var innerHtml = '<div>Linked Account Mandate</div><br>'
          innerHtml += getHtmlForMandate(mandate)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("updateDDMandate").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
    updateDDMandate(linkedAccountId).then(mandate => {
        if (mandate?.code) { throw mandate }
        var innerHtml = '<div>Linked Account Mandate</div><br>'
          innerHtml += getHtmlForMandate(mandate)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("suspendLinkedAccount").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
      suspendLinkedAccount(linkedAccountId).then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Result</div><br>'
          innerHtml += getHtmlForJSON(result)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("checkLABalance").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
    checkLABalance(linkedAccountId).then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Result</div><br>'
          innerHtml += getHtmlForJSON(result)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("confirmLinkedAccount").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
    confirmLinkedAccount(linkedAccountId).then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Result</div><br>'
          innerHtml += getHtmlForJSON(result)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("refreshLAAuth").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
      refreshLAAuth(linkedAccountId).then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Auth</div><br>'
          innerHtml += getHtmlForJSON(result)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("completeLAAuth").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
      completeLAAuth(linkedAccountId).then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Auth</div><br>'
          innerHtml += getHtmlForJSON(result)
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })
}