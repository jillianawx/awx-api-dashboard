// Functions for Payment Intents
function getPaymentIntents() {
    const endpoint =  '/api/pa/payment_intents'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetPaymentIntents",
        "connectedAccountId": connectedAccountId,
        "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getPaymentIntent(paymentIntentId) {
    paymentIntentId = (paymentIntentId && paymentIntentId != '') ? paymentIntentId : getUrlParam('piId')
    if (!paymentIntentId || paymentIntentId == '') { throw new Error("No PaymentIntentId provided") }
    const endpoint =  '/api/pa/payment_intents'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetPaymentIntent",
        "paymentIntentId": paymentIntentId,
        "connectedAccountId": connectedAccountId
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createPaymentIntent() {
    const endpoint =  '/api/pa/payment_intents'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "CreatePaymentIntent",
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function confirmPaymentIntent(paymentIntentId) {
    paymentIntentId = (paymentIntentId && paymentIntentId != '') ? paymentIntentId : getUrlParam('piId')
    if (!paymentIntentId || paymentIntentId == '') { throw new Error("No PaymentIntentId provided") }
    const endpoint =  '/api/pa/payment_intents'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "ConfirmPaymentIntent",
        "paymentIntentId": paymentIntentId,
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function continue3DSPaymentIntent(paymentIntentId) {
    paymentIntentId = (paymentIntentId && paymentIntentId != '') ? paymentIntentId : getUrlParam('piId')
    if (!paymentIntentId || paymentIntentId == '') { throw new Error("No PaymentIntentId provided") }
    const endpoint =  '/api/pa/payment_intents'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "Continue3DSPaymentIntent",
        "paymentIntentId": paymentIntentId,
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function capturePaymentIntent(paymentIntentId) {
    paymentIntentId = (paymentIntentId && paymentIntentId != '') ? paymentIntentId : getUrlParam('piId')
    if (!paymentIntentId || paymentIntentId == '') { throw new Error("No PaymentIntentId provided") }
    const endpoint =  '/api/pa/payment_intents'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "CapturePaymentIntent",
        "paymentIntentId": paymentIntentId,
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function cancelPaymentIntent(paymentIntentId) {
    paymentIntentId = (paymentIntentId && paymentIntentId != '') ? paymentIntentId : getUrlParam('piId')
    if (!paymentIntentId || paymentIntentId == '') { throw new Error("No PaymentIntentId provided") }
    const endpoint =  '/api/pa/payment_intents'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "CancelPaymentIntent",
        "paymentIntentId": paymentIntentId,
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getPaymentAttempts() {
  const endpoint =  '/api/pa/payment_intents'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "GetPaymentAttempts",
      "connectedAccountId": connectedAccountId,
      "parameterQueryString": document.getElementById("jsonBodyInput").value
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getPaymentAttempt(paymentAttemptId) {
  if (!paymentAttemptId || paymentAttemptId == '') { throw new Error("No paymentAttemptId provided") }
  const endpoint =  '/api/pa/payment_intents'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "GetPaymentAttempt",
      "paymentAttemptId": paymentAttemptId,
      "connectedAccountId": connectedAccountId
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function createRefund(paymentIntentId, paymentAttemptId) {
  var paymentAttemptEmpty = (!paymentAttemptId || paymentAttemptId == '')
  var paymentIntentEmpty = (!paymentIntentId || paymentIntentId == '')
  if (paymentAttemptEmpty && paymentIntentEmpty) { throw new Error("Pleaes provide either Attempt or Intent ID") }
  const endpoint =  '/api/pa/payment_intents'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "CreateRefund",
      "paymentAttemptId": paymentAttemptId,
      "paymentIntentId": paymentIntentId,
      "connectedAccountId": connectedAccountId,
      "jsonBodyOverride": document.getElementById("jsonBodyInput").value
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getRefunds() {
  const endpoint =  '/api/pa/payment_intents'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "GetRefunds",
      "connectedAccountId": connectedAccountId,
      "parameterQueryString": document.getElementById("jsonBodyInput").value
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getRefund(refundId) {
  if (!refundId || refundId == '') { throw new Error("No refundId provided") }
  const endpoint =  '/api/pa/payment_intents'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "GetRefund",
      "refundId": refundId,
      "connectedAccountId": connectedAccountId,
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

// EVENT LISTENERS
function attachEventListenersPaymentIntents() {
  // Button to get all payment intents
  document.getElementById("loadPaymentIntents").addEventListener("click", () => {
      resetAPIStatus();
      try {
        getPaymentIntents().then(paymentIntents => {
          if (paymentIntents?.code) { throw paymentIntents }
          var innerHtml = '<div>All Payment Intents</div><br>'
          paymentIntents.items.forEach(paymentIntent => {
            innerHtml += getHtmlForIntent(paymentIntent)
          })
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

  // Button to create payment intent
  document.getElementById("createPaymentIntent").addEventListener("click", () => {
    resetAPIStatus();
    try {
      createPaymentIntent().then(paymentIntent => {
        if (paymentIntent?.code) { throw paymentIntent }
        var innerHtml = '<div>New Payment Intent</div><br>'
        innerHtml += getHtmlForIntent(paymentIntent)
        document.getElementById("contentContainer").innerHTML = innerHtml
        document.getElementById("piIdInput").value = paymentIntent.id
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  // Button to get payment intent
  document.getElementById("getPaymentIntent").addEventListener("click", () => {
    resetAPIStatus();
    var paymentIntentId = document.getElementById("piIdInput").value;
    try {
      getPaymentIntent(paymentIntentId).then(paymentIntent => {
        if (paymentIntent?.code) { throw paymentIntent }
        var innerHtml = '<div>Payment Intent</div><br>';
        innerHtml += getHtmlForIntent(paymentIntent);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })
  // Button to confirm payment intent
  document.getElementById("confirmPaymentIntent").addEventListener("click", () => {
    resetAPIStatus();
    var paymentIntentId = document.getElementById("piIdInput").value;
    try {
      confirmPaymentIntent(paymentIntentId).then(paymentIntent => {
        if (paymentIntent?.code) { throw paymentIntent }
        var innerHtml = '<div>Payment Intent</div><br>';
        innerHtml += getHtmlForIntent(paymentIntent);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })
  // Button to continue to confirm payment intent
  document.getElementById("continue3DSPaymentIntent").addEventListener("click", () => {
    resetAPIStatus();
    var paymentIntentId = document.getElementById("piIdInput").value;
    try {
      continue3DSPaymentIntent(paymentIntentId).then(paymentIntent => {
        if (paymentIntent?.code) { throw paymentIntent }
        var innerHtml = '<div>Payment Intent</div><br>';
        innerHtml += getHtmlForIntent(paymentIntent);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })
  // Button to cancel payment intent
  document.getElementById("cancelPaymentIntent").addEventListener("click", () => {
    resetAPIStatus();
    var paymentIntentId = document.getElementById("piIdInput").value;
    try {
      cancelPaymentIntent(paymentIntentId).then(paymentIntent => {
        if (paymentIntent?.code) { throw paymentIntent }
        var innerHtml = '<div>Payment Intent</div><br>';
        innerHtml += getHtmlForIntent(paymentIntent);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })
  // Button to capture payment intent
  document.getElementById("capturePaymentIntent").addEventListener("click", () => {
    resetAPIStatus();
    var paymentIntentId = document.getElementById("piIdInput").value;
    try {
      capturePaymentIntent(paymentIntentId).then(paymentIntent => {
        if (paymentIntent?.code) { throw paymentIntent }
        var innerHtml = '<div>Payment Intent</div><br>';
        innerHtml += getHtmlForIntent(paymentIntent);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getPaymentAttempts").addEventListener("click", () => {
    resetAPIStatus();
    try {
      getPaymentAttempts().then(paymentAttempts => {
        if (paymentAttempts?.code) { throw paymentAttempts }
        var innerHtml = '<div>All Payment Attempts</div><br>'
        paymentAttempts.items.forEach(paymentAttempt => {
          innerHtml += getHtmlForAttempt(paymentAttempt)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getPaymentAttempt").addEventListener("click", () => {
    resetAPIStatus();
    var paymentAttemptId = document.getElementById("attemptIdInput").value;
    try {
      getPaymentAttempt(paymentAttemptId).then(paymentAttempt => {
        if (paymentAttempt?.code) { throw paymentAttempt }
        var innerHtml = '<div>Payment Attempt</div><br>';
        innerHtml += getHtmlForAttempt(paymentAttempt);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("createRefund").addEventListener("click", () => {
    resetAPIStatus();
    var paymentAttemptId = document.getElementById("attemptIdInput").value;
    var paymentIntentId = document.getElementById("piIdInput").value;
    try {
      createRefund(paymentIntentId, paymentAttemptId).then(refund => {
        if (refund?.code) { throw refund }
        var innerHtml = '<div>Refund</div><br>';
        innerHtml += getHtmlForRefund(refund);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        document.getElementById("refundIdInput").value = refund.id;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getRefunds").addEventListener("click", () => {
    resetAPIStatus();
    try {
      getRefunds().then(refunds => {
        if (refunds?.code) { throw refunds }
        var innerHtml = '<div>Refunds</div><br>';
        refunds.items.forEach(refund => {
          innerHtml += getHtmlForRefund(refund);
        })
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getRefund").addEventListener("click", () => {
    resetAPIStatus();
    var refundId = document.getElementById("refundIdInput").value;
    try {
      getRefund(refundId).then(refund => {
        if (refund?.code) { throw refund }
        var innerHtml = '<div>Refund</div><br>';
        innerHtml += getHtmlForRefund(refund);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        document.getElementById("refundIdInput").value = refund.id;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })
}