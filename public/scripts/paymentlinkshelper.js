function getPaymentLinks() {
    const endpoint = '/api/pa/payment_links'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetPaymentLinks",
        "connectedAccountId": connectedAccountId,
        "parameterQueryString": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getPaymentLink(paymentLinkId) {
    if (!paymentLinkId || paymentLinkId == '') { throw new Error("No paymentLinkId provided") }
    const endpoint = '/api/pa/payment_links'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "GetPaymentLink",
        "paymentLinkId": paymentLinkId,
        "connectedAccountId": connectedAccountId
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createPaymentLink() {
    const endpoint = '/api/pa/payment_links'
    var config = {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "function": "CreatePaymentLink",
        "connectedAccountId": connectedAccountId,
        "jsonBodyOverride": document.getElementById("jsonBodyInput").value
      }),
      method: "POST"
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function updatePaymentLink(paymentLinkId) {
  if (!paymentLinkId || paymentLinkId == '') { throw new Error("No paymentLinkId provided") }
  const endpoint = '/api/pa/payment_links'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "UpdatePaymentLink",
      "paymentLinkId": paymentLinkId,
      "connectedAccountId": connectedAccountId,
      "jsonBodyOverride": document.getElementById("jsonBodyInput").value
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function activatePaymentLink(paymentLinkId) {
  if (!paymentLinkId || paymentLinkId == '') { throw new Error("No paymentLinkId provided") }
  const endpoint = '/api/pa/payment_links'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "ActivatePaymentLink",
      "paymentLinkId": paymentLinkId,
      "connectedAccountId": connectedAccountId
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function deactivatePaymentLink(paymentLinkId) {
  if (!paymentLinkId || paymentLinkId == '') { throw new Error("No paymentLinkId provided") }
  const endpoint = '/api/pa/payment_links'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "DeactivatePaymentLink",
      "paymentLinkId": paymentLinkId,
      "connectedAccountId": connectedAccountId
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function sendPaymentLink(paymentLinkId) {
  if (!paymentLinkId || paymentLinkId == '') { throw new Error("No paymentLinkId provided") }
  const endpoint = '/api/pa/payment_links'
  var config = {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "function": "SendPaymentLink",
      "paymentLinkId": paymentLinkId,
      "connectedAccountId": connectedAccountId,
      "jsonBodyOverride": document.getElementById("jsonBodyInput").value
    }),
    method: "POST"
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function attachEventListenersPaymentLinks() {
  document.getElementById("getPaymentLinks").addEventListener("click", () => {
    resetAPIStatus();
    try {
      getPaymentLinks().then(paymentLinks => {
        if (paymentLinks?.code) { throw paymentLinks }
        var innerHtml = '<div>All Payment Links</div><br>'
        paymentLinks.items.forEach(paymentLink => {
          innerHtml += getHtmlForLink(paymentLink)
        })
        document.getElementById("contentContainer").innerHTML = innerHtml
        success()
      }).catch((error) => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("createPaymentLink").addEventListener("click", () => {
    resetAPIStatus();
    try {
      createPaymentLink().then(paymentLink => {
        if (paymentLink?.code) { throw paymentLink }
        var innerHtml = '<div>New Payment Link</div><br>'
        innerHtml += getHtmlForLink(paymentLink)
        document.getElementById("contentContainer").innerHTML = innerHtml
        document.getElementById("linkIdInput").value = paymentLink.id
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("updatePaymentLink").addEventListener("click", () => {
    resetAPIStatus();
    var paymentLinkId = document.getElementById("linkIdInput").value;
    try {
      updatePaymentLink(paymentLinkId).then(paymentLink => {
        if (paymentLink?.code) { throw paymentLink }
        var innerHtml = '<div>Payment Link</div><br>';
        innerHtml += getHtmlForLink(paymentLink);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("getPaymentLink").addEventListener("click", () => {
    resetAPIStatus();
    var paymentLinkId = document.getElementById("linkIdInput").value;
    try {
      getPaymentLink(paymentLinkId).then(paymentLink => {
        if (paymentLink?.code) { throw paymentLink }
        var innerHtml = '<div>Payment Link</div><br>';
        innerHtml += getHtmlForLink(paymentLink);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("sendPaymentLink").addEventListener("click", () => {
    resetAPIStatus();
    var paymentLinkId = document.getElementById("linkIdInput").value;
    try {
      sendPaymentLink(paymentLinkId).then(result => {
        if (result?.code) { throw result }
        var innerHtml = '<div>Send Payment Link</div><br>';
        innerHtml += getHtmlForJSON(result);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })

  document.getElementById("activatePaymentLink").addEventListener("click", () => {
    resetAPIStatus();
    var paymentLinkId = document.getElementById("linkIdInput").value;
    try {
      activatePaymentLink(paymentLinkId).then(paymentLink => {
        if (paymentLink?.code) { throw paymentLink }
        var innerHtml = '<div>Payment Link</div><br>';
        innerHtml += getHtmlForLink(paymentLink);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })
  
  document.getElementById("deactivatePaymentLink").addEventListener("click", () => {
    resetAPIStatus();
    var paymentLinkId = document.getElementById("linkIdInput").value;
    try {
      deactivatePaymentLink(paymentLinkId).then(paymentLink => {
        if (paymentLink?.code) { throw paymentLink }
        var innerHtml = '<div>Payment Link</div><br>';
        innerHtml += getHtmlForLink(paymentLink);
        document.getElementById("contentContainer").innerHTML = innerHtml;
        success()
      }).catch(error => failure(error))
    } catch (error) { failure(error) }
  })
    
}