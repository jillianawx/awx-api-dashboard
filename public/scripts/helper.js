const baseUrl = 'https://api-demo.airwallex.com/api/v1'
var tokenExpiry = null;
var bearerToken = returnBearerToken();

// Shortcut for getting connectedAccountId
// Make sure relevant pages have the input caIdInput
var connectedAccountId = connectedAccountId()
function connectedAccountId() {
    var input = document.getElementById("caIdInput")?.value
    if (input && input != '') { return input }
    return getUrlParam("caId");
}

// Helper variables for getting payment intentId and clientSecret
// Only for payment-demo pages
var intentId = getUrlParam('piId');
var clientSecret = getUrlParam('clientSecret');
var intentCurrency = "USD"

// Helper functions for getting/setting url params - this is used for quick reference to connected account
function clearUrlParam(paramName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.delete(paramName);
    window.location.search = urlParams.toString();
}
function getUrlParam(paramName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has(paramName)) { return urlParams.get(paramName); }
    return null;
}
function setUrlParam(paramName, value) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set(paramName, value);
    window.location.search = urlParams.toString();
}

// Helper functions for all API calls
function returnBearerToken() {
    if (bearerToken == null || tokenExpiry == null || Date.parse(tokenExpiry) < Date.now() + 60 * 1000) {
        getBearerToken().then(data => {
            bearerToken = data.token;
            tokenExpiry = data.expires_at;
        })
    }
    return bearerToken;
}
async function getBearerToken() {
    const config = {
        method: "GET"
    }
    const endpoint =  "/api/authentication/login"
    const json = await fetch(endpoint, config).then(data => data.json())
    return json;
}
function getDefaultConfig(method) {
    var config = {
        headers: {
            "Authorization" : "Bearer " + bearerToken,
            "Content-Type": "application/json"
        },
        method: method
    }
    return config;
}
function getDefaultConfigOBO(method, accountId) {
    if (!accountId || accountId == 'string') {
        accountId = getUrlParam('caId');
    }
    if (!accountId || accountId == 'string') { return getDefaultConfig(method) }
    var config = {
        headers: {
            "Authorization" : "Bearer " + bearerToken,
            "Content-Type": "application/json",
            "x-on-behalf-of": accountId
        },
        method: method
    }
    return config;
}

// Browser/UI methods
function resetAPIStatus() {
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('error').innerHTML = '';
    document.getElementById("contentContainer").innerHTML = '';
}
function success() {
    document.getElementById('success').style.display = 'block'
}
function failure(error) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('error').innerHTML = error.code ? JSON.stringify(error, null, 4) : error;
}
function getHtmlForJSON(jsonBody){
    return '<div class="card"> \
    <div class="card__details">\
      <pre><code>' + JSON.stringify(jsonBody, undefined, 4) + '</code></pre>' +
    '</div>\
  </div><br>'
}