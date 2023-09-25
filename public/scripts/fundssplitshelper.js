// Functions for Fund Splits
function getFundsSplits(paymentIntentId) {
  if (!paymentIntentId || paymentIntentId == '') { throw new Error("No paymentIntentId provided") }
  const endpoint =  '/api/pa/funds_splits'
  var config = {
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "function": "GetFundsSplits",
          "connectedAccountId": connectedAccountId,
          "paymentIntentId": paymentIntentId,
          "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getFundsSplit(fundsSplitId) {
  if (!fundsSplitId || fundsSplitId == '') { throw new Error("No FundsSplitId provided") }
  const endpoint =  '/api/pa/funds_splits'
  var config = {
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "function": "GetFundsSplit",
          "fundsSplitId": fundsSplitId,
          "connectedAccountId": connectedAccountId
      }),
      method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function createFundsSplit(paymentIntentId, destinationAccountId) {
  if (!paymentIntentId || paymentIntentId == '') { throw new Error("No PaymentIntentId provided") }
  if (!destinationAccountId || destinationAccountId == '') { throw new Error("No destinationAccountId provided") }
  const endpoint =  '/api/pa/funds_splits'
  var config = {
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "function": "CreateFundsSplit",
          "connectedAccountId": connectedAccountId,
          "paymentIntentId": paymentIntentId,
          "destinationAccountId": destinationAccountId,
          "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function releaseFundsSplit(fundsSplitId) {
    if (!fundsSplitId || fundsSplitId == '') { throw new Error("No FundsSplitId provided") }
    const endpoint =  '/api/pa/funds_splits'
    var config = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "function": "ReleaseFundsSplit",
            "fundsSplitId": fundsSplitId,
            "connectedAccountId": connectedAccountId
        }),
        method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createFundsSplitReversal(fundsSplitId) {
  if (!fundsSplitId || fundsSplitId == '') { throw new Error("No FundsSplitId provided") }
  const endpoint =  '/api/pa/funds_splits'
  var config = {
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "function": "CreateFundsSplitReversal",
          "fundsSplitId": fundsSplitId,
          "connectedAccountId": connectedAccountId
      }),
      method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getFundsSplitReversals(fundsSplitId) {
  if (!fundsSplitId || fundsSplitId == '') { throw new Error("No FundsSplitId provided") }
  const endpoint =  '/api/pa/funds_splits'
  var config = {
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "function": "GetFundsSplitReversals",
          "fundsSplitId": fundsSplitId,
          "connectedAccountId": connectedAccountId,
          "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getFundsSplitReversal(fundsSplitReversalId) {
  if (!fundsSplitReversalId || fundsSplitReversalId == '') { throw new Error("No FundsSplitReversalId provided") }
  const endpoint =  '/api/pa/funds_splits'
  var config = {
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "function": "GetFundsSplitReversal",
          "fundsSplitReversalId": fundsSplitReversalId,
          "connectedAccountId": connectedAccountId
      }),
      method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

// EVENT LISTENERS
function attachEventListeners() {
  document.getElementById("loadFundsSplits").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var paymentIntentId = (document.getElementById("piIdInput").value != "") ? 
        document.getElementById("piIdInput").value : getUrlParam("piId");
      getFundsSplits(paymentIntentId).then(fundsSplits => {
        if (fundsSplits?.code) { throw fundsSplits }
        var innerHtml = '<div>All Funds Splits</div><br>'
        fundsSplits.items.forEach(fundsSplit => {
          innerHtml += getHtmlForFundsSplit(fundsSplit)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("createFundsSplit").addEventListener("click", () => {
    resetAPIStatus();
    try {
        var paymentIntentId = (document.getElementById("piIdInput").value != "") ? 
        document.getElementById("piIdInput").value : getUrlParam("piId");
        var destinationAccountId = document.getElementById("destinationIdInput").value
        createFundsSplit(paymentIntentId, destinationAccountId).then(fundsSplit => {
        if (fundsSplit?.code) { throw fundsSplit }
        var innerHtml = '<div>New Funds Split</div><br>'
        innerHtml += getHtmlForFundsSplit(fundsSplit)
        document.getElementById("contentContainer").innerHTML = innerHtml
        document.getElementById("fsIdInput").value = fundsSplit.id
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getFundsSplit").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var fundsSplitId = document.getElementById("fsIdInput").value;
      getFundsSplit(fundsSplitId).then(fundsSplit => {
        if (fundsSplit?.code) { throw fundsSplit }
        var innerHtml = '<div>Funds Split</div><br>';
        innerHtml += getHtmlForFundsSplit(fundsSplit);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("releaseFundsSplit").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var fundsSplitId = document.getElementById("fsIdInput").value;
      releaseFundsSplit(fundsSplitId).then(fundsSplit => {
        if (fundsSplit?.code) { throw fundsSplit }
        var innerHtml = '<div>Funds Split</div><br>';
        innerHtml += getHtmlForFundsSplit(fundsSplit);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("createFundsSplitReversal").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var fundsSplitId = document.getElementById("fsIdInput").value;
      createFundsSplitReversal(fundsSplitId).then(fundsSplitReversal => {
        if (fundsSplitReversal?.code) { throw fundsSplitReversal }
        var innerHtml = '<div>Funds Split Reversal</div><br>';
        innerHtml += getHtmlForFundsSplitReversal(fundsSplitReversal);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        document.getElementById("fsrIdInput").value = fundsSplitReversal.id
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getFundsSplitReversals").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var fundsSplitId = document.getElementById("fsIdInput").value;
        getFundsSplitReversals(fundsSplitId).then(fundsSplitsReversals => {
          if (fundsSplitsReversals?.code) { throw fundsSplitsReversals }
          var innerHtml = '<div>All Funds Splits Reversals</div><br>'
          fundsSplitsReversals.forEach(fundsSplitsReversal => {
            innerHtml += getHtmlForFundsSplitReversal(fundsSplitsReversal)
          })
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getFundsSplitReversal").addEventListener("click", () => {
    resetAPIStatus();
    try {
      var fundsSplitReversalId = document.getElementById("fsrIdInput").value;
      getFundsSplitReversal(fundsSplitReversalId).then(fundsSplitsReversal => {
        if (fundsSplitsReversal?.code) { throw fundsSplitsReversal }
        var innerHtml = '<div>Funds Split Reversal</div><br>';
        innerHtml += getHtmlForFundsSplitReversal(fundsSplitsReversal);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })
}