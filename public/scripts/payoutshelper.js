// Functions for Payouts
function getPayoutPayments() {
  var endpoint = baseUrl + "/payments"
  var parameterQueryString = document.getElementById("jsonBodyInput").value
  if (parameterQueryString && parameterQueryString != '') {
    endpoint += parameterQueryString
  }
  var config = getDefaultConfigOBO("GET", connectedAccountId)
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getPayoutPayment(payoutPaymentId) {
  payoutPaymentId = (payoutPaymentId && payoutPaymentId != '') ? payoutPaymentId : getUrlParam('poId')
  if (!payoutPaymentId || payoutPaymentId == '') { throw new Error("No PayoutPaymentId provided") }
  const endpoint = baseUrl + "/payments/" + payoutPaymentId
  var config = getDefaultConfigOBO("GET", connectedAccountId)
  return fetch(endpoint, config).then(res => { return res.json() })
}

function createPayoutPayment() {
  var randomInt = Math.floor(Math.random() * 1000);
  const endpoint = baseUrl + '/payments/create'
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
  if (jsonBodyOverride && jsonBodyOverride != '') {
      config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
  } else {
    config.body = JSON.stringify({
      "beneficiary": {
          "address": {
              "city": "Shanghai",
              "country_code": "CN",
              "postcode": "25000",
              "state": "Shanghai",
              "street_address": "123 Street"
          },
          "bank_details": {
              "account_currency": "CNY",
              "account_name": "John Smith",
              "account_number": "123456789",
              "bank_country_code": "CN",
              "bank_name": "ABC Bank",
              "swift_code": "ABOCCNBJ"
          },
          "company_name": "Company " + randomInt,
          "entity_type": "COMPANY"
      },
      "payment_amount": randomInt * 10,
      "payment_currency": "CNY",
      "payment_method": "SWIFT",
      "reason": "professional_business_services",
      "reference": "Test " + randomInt,
      "request_id": crypto.randomUUID(),
      "source_amount": null,
      "source_currency": "USD",
      "swift_charge_option": "SHARED",
      "payer_source":"SELF"
    })
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function retryPayoutPayment(payoutPaymentId) {
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
  if (jsonBodyOverride && jsonBodyOverride != '') {
      config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
  } else {
    config.body = JSON.stringify({
      "account_currency": "AUD",
      "account_name": "John Smith",
      "account_number": "12750852",
      "account_routing_type1": "bsb",
      "account_routing_value1": "083064",
      "bank_account_category": "Checking,Savings,Vista,Maestra",
      "bank_branch": "Melbourne",
      "bank_country_code": "AU",
      "bank_name": "National Australia Bank",
      "bank_street_address": "500 Bourke Street, Melbourne 3000, Australia",
      "binding_mobile_number": "654897612345",
      "fingerprint": "2e99758548972a8e8822ad47fa1017ff72f06f3ff6a016851f45c398732bc50c",
      "swift_code": "CTBAAU2S",
      "transaction_reference": "4140110135"
    })
  }
  const endpoint = baseUrl + '/payments/retry/' + payoutPaymentId
  return fetch(endpoint, config).then(res => { return res.json() })
}

function cancelPayoutPayment(payoutPaymentId) {
  payoutPaymentId = (payoutPaymentId && payoutPaymentId != '') ? payoutPaymentId : getUrlParam('poId')
  if (!payoutPaymentId || payoutPaymentId == '') { throw new Error("No PayoutPaymentId provided") }
  const endpoint = baseUrl + "/payments/cancel/" + payoutPaymentId
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  return fetch(endpoint, config).then(res => { return res.json() })
}

function transitionPayoutPayment(payoutStatus, payoutPaymentId) {
  payoutPaymentId = (payoutPaymentId && payoutPaymentId != '') ? payoutPaymentId : getUrlParam('poId')
  if (!payoutPaymentId || payoutPaymentId == '') { throw new Error("No PayoutPaymentId provided") }
  const endpoint =  '/api/simulation/payments/transition'
  var config = {
      headers: {
          "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        "payoutPaymentId": payoutPaymentId,
        "connectedAccountId": connectedAccountId,
        "status": payoutStatus
      })
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function validatePayoutPayment() {
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  const endpoint = baseUrl + '/payments/validate/'
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
  if (!jsonBodyOverride || jsonBodyOverride == '') { throw new Error("No JSON body provided") }
  config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
  return fetch(endpoint, config).then(res => { return res.json() })
}

// EVENT LISTENERS
function attachEventListenersPayouts() {
    document.getElementById("loadPayoutPayments").addEventListener("click", () => {
      resetAPIStatus();
      try {
        getPayoutPayments().then(payouts => {
          if (payouts?.code) { throw payouts }
          var innerHtml = '<div>All Payout Payments</div><br>'
          payouts.forEach(payout => {
            innerHtml += getHtmlForPayout(payout)
          })
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("getPayoutPayment").addEventListener("click", () => {
      resetAPIStatus();
      try {
        var payoutPaymentId = document.getElementById("poIdInput").value;
        getPayoutPayment(payoutPaymentId).then(payout => {
          if (payout?.code) { throw payout }
          var innerHtml = '<div>Payout Payment</div><br>'
          innerHtml += getHtmlForPayout(payout)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("createPayoutPayment").addEventListener("click", () => {
      resetAPIStatus();
      try {
        createPayoutPayment().then(payout => {
          if (payout?.code) { throw payout }
          var innerHtml = '<div>Payout Payment</div><br>'
          innerHtml += getHtmlForPayout(payout)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("retryPayoutPayment").addEventListener("click", () => {
      resetAPIStatus();
      try {
          var payoutPaymentId = document.getElementById("poIdInput").value;
          retryPayoutPayment(payoutPaymentId).then(payout => {
          if (payout?.code) { throw payout }
          var innerHtml = '<div>Payout Payment</div><br>'
          innerHtml += getHtmlForPayout(payout)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("cancelPayoutPayment").addEventListener("click", () => {
      resetAPIStatus();
      try {
        var payoutPaymentId = document.getElementById("poIdInput").value;
        cancelPayoutPayment(payoutPaymentId).then(response => {
          if (response?.code) { throw response }
          getPayoutPayment(payoutPaymentId, caId).then(payout => {
            var innerHtml = '<div>Payout Payment</div><br>'
            innerHtml += getHtmlForPayout(payout)
            document.getElementById("contentContainer").innerHTML = innerHtml
            success()
          })
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("transitionPayoutPayment").addEventListener("click", () => {
      resetAPIStatus();
      try {
        var payoutStatus = document.querySelector('input[name="payoutStatus"]:checked')?.value;
        var payoutPaymentId = document.getElementById("poIdInput").value;
        transitionPayoutPayment(payoutStatus, payoutPaymentId).then(payout => {
          if (payout?.code) { throw payout }
          var innerHtml = '<div>Payout Payment</div><br>'
          innerHtml += getHtmlForPayout(payout)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("validatePayoutPayment").addEventListener("click", () => {
      resetAPIStatus();
      try {
          validatePayoutPayment().then(result => {
          if (result?.code) { throw result }
          var innerHtml = '<div>Validate Payment</div><br>'
          innerHtml += getHtmlForJSON(result)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })
}