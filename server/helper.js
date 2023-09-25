const clientId = ''
const apiKey = ''
const scaleModel = ''

const baseUrl = 'https://api-demo.airwallex.com/api/v1'
var tokenExpiry = null;
var bearerToken = returnBearerToken();

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
function getBearerToken() {
    const config = {
        headers: {
            "x-client-id": clientId,
            "x-api-key": apiKey
        },
        method: "POST"
    }
    const endpoint = baseUrl + "/authentication/login"
    const json = fetch(endpoint, config).then(data => data.json())
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
    // For when x-on-behalf-of is not supported. ie no CA or model 2.x
    if (!accountId || accountId == String.empty ||
        scaleModel == '2.2' || scaleModel == '2.1') { 
            return getDefaultConfig(method) 
    }
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

module.exports = { scaleModel, getBearerToken, getDefaultConfig, getDefaultConfigOBO }