function getFundingLimits() {
    var endpoint = baseUrl + "/account_capabilities/funding_limits"
    var parameterQueryString = document.getElementById("jsonBodyInput").value
    if (parameterQueryString && parameterQueryString != '') {
      endpoint += parameterQueryString
    }
    var config = getDefaultConfigOBO("GET", connectedAccountId)
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createDirectDebitDeposit(linkedAccountId) {
  if (!linkedAccountId || linkedAccountId == '') { throw new Error("No linkedAccountId provided") }
  const endpoint =  '/api/linked_accounts'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "CreateDirectDebitDeposit",
        "linkedAccountId": linkedAccountId,
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function updateDepositStatus(depositId, depositStatus) {
  if (!depositId || depositId == '') { throw new Error("No depositId provided") }
  if (!depositStatus || depositStatus == '') { throw new Error("No depositStatus provided") }
  const endpoint =  '/api/linked_accounts'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "UpdateDepositStatus",
        "depositId": depositId,
        "depositStatus": depositStatus,
        "connectedAccountId": connectedAccountId
      }),
      method: "POST"
    }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function attachEventListenersDirectDebitDeposits() {
  document.getElementById("getFundingLimits").addEventListener("click", () => {
      resetAPIStatus();
      try {
        getFundingLimits().then(limits => {
          if (limits?.code) { throw limits }
          var innerHtml = '<div>All Limits</div><br>'
          limits.items.forEach(limit => {
              innerHtml += getHtmlForLimit(limit)
          })
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
      }).catch((error) => failure(error))
      } catch (error) { failure(error) }
  })

  document.getElementById("createDirectDebitDeposit").addEventListener("click", () => {
    resetAPIStatus();
    try {
    var linkedAccountId = document.getElementById("linkedAccIdInput").value;
      createDirectDebitDeposit(linkedAccountId).then(deposit => {
        if (deposit?.code) { throw deposit }
        var innerHtml = '<div>New Direct Debit Deposit</div><br>'
          innerHtml += getHtmlForDeposit(deposit)
        document.getElementById("contentContainer").innerHTML = innerHtml
        document.getElementById("ddebitIdInput").value = deposit.deposit_id
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("updateDepositStatus").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var depositId = document.getElementById("ddebitIdInput").value;
      var depositStatus = document.querySelector('input[name="depositStatus"]:checked')?.value;
      updateDepositStatus(depositId, depositStatus).then(deposit => {
        if (deposit?.code) { throw deposit }
        var innerHtml = '<div>New Direct Debit Deposit</div><br>'
          innerHtml += getHtmlForDeposit(deposit)
        document.getElementById("contentContainer").innerHTML = innerHtml
        document.getElementById("ddebitIdInput").value = deposit.deposit_id
        success()
    }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })
}