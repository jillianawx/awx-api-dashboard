// Functions for Beneficiaries
function getBeneficiaries() {
  var endpoint = baseUrl + "/beneficiaries"
  var parameterQueryString = document.getElementById("jsonBodyInput").value
  if (parameterQueryString && parameterQueryString != '') {
    endpoint += parameterQueryString
  }
  var config = getDefaultConfigOBO("GET", connectedAccountId)
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getBeneficiary(beneficiaryId) {
  beneficiaryId = (beneficiaryId && beneficiaryId != '') ? beneficiaryId : getUrlParam('beneId')
  if (!beneficiaryId || beneficiaryId == '') { throw new Error("No BeneficiaryId provided") }
  const endpoint = baseUrl + "/beneficiaries/" + beneficiaryId
  var config = getDefaultConfigOBO("GET", connectedAccountId)
  return fetch(endpoint, config).then(res => { return res.json() })
}

function createBeneficiary() {
  var randomInt = Math.floor(Math.random() * 1000);
  const endpoint = baseUrl + '/beneficiaries/create'
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
  if (jsonBodyOverride && jsonBodyOverride != '') {
      config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
  } else {
    config.body = JSON.stringify({
      "beneficiary": {
        "address": {
            "city": "Berkeley",
            "country_code": "US",
            "postcode": "25000",
            "state": "California",
            "street_address": "123 Street"
        },
        "bank_details": {
            "account_currency": "USD",
            "account_name": "John Smith",
            "account_number": "123456789",
            "bank_country_code": "US",
            "bank_name": "ABC Bank",
            "swift_code": "CHASUS33"
        },
        "company_name": "Company " + randomInt,
        "entity_type": "COMPANY"
      },
      "payment_methods": [ "SWIFT" ]
    })
  }
  return fetch(endpoint, config).then(res => { return res.json() })
}

function deleteBeneficiary(beneficiaryId) {
  beneficiaryId = (beneficiaryId && beneficiaryId != '') ? beneficiaryId : getUrlParam('beneId')
  if (!beneficiaryId || beneficiaryId == '') { throw new Error("No BeneficiaryId provided") }
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  const endpoint = baseUrl + '/beneficiaries/delete/' + beneficiaryId
  return fetch(endpoint, config).then(res => { return res.json() })
}

function updateBeneficiary(beneficiaryId) {
  beneficiaryId = (beneficiaryId && beneficiaryId != '') ? beneficiaryId : getUrlParam('beneId')
  if (!beneficiaryId || beneficiaryId == '') { throw new Error("No BeneficiaryId provided") }
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  const endpoint = baseUrl + '/beneficiaries/update/' + beneficiaryId
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
  if (!jsonBodyOverride || jsonBodyOverride == '') { throw new Error("No JSON body provided") }
  config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
  return fetch(endpoint, config).then(res => { return res.json() })
}

function validateBeneficiary() {
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  const endpoint = baseUrl + '/beneficiaries/validate/'
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
  if (!jsonBodyOverride || jsonBodyOverride == '') { throw new Error("No JSON body provided") }
  config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getBeneficiaryAPISchema() {
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  const endpoint = baseUrl + '/beneficiary_api_schemas/generate/'
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
  if (!jsonBodyOverride || jsonBodyOverride == '') { throw new Error("No JSON body provided") }
  config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
  return fetch(endpoint, config).then(res => { return res.json() })
}

function getBeneficiaryFormSchema() {
  var config = getDefaultConfigOBO("POST", connectedAccountId)
  const endpoint = baseUrl + '/beneficiary_form_schemas/generate/'
  var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
  if (!jsonBodyOverride || jsonBodyOverride == '') { throw new Error("No JSON body provided") }
  config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
  return fetch(endpoint, config).then(res => { return res.json() })
}

// EVENT LISTENERS
function attachEventListenersBeneficiaries() {
    document.getElementById("getBeneficiaries").addEventListener("click", () => {
      resetAPIStatus();
      try {
          getBeneficiaries().then(beneficiaries => {
          if (beneficiaries?.code) { throw beneficiaries }
          var innerHtml = '<div>All Beneficiaries</div><br>'
          beneficiaries.items.forEach(beneficiary => {
            innerHtml += getHtmlForBeneficiary(beneficiary)
          })
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("getBeneficiary").addEventListener("click", () => {
      resetAPIStatus();
      try {
        var beneficiaryId = document.getElementById("beneIdInput").value;
        getBeneficiary(beneficiaryId).then(beneficiary => {
          if (beneficiary?.code) { throw beneficiary }
          var innerHtml = '<div>Beneficiary</div><br>'
          innerHtml += getHtmlForBeneficiary(beneficiary)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("createBeneficiary").addEventListener("click", () => {
      resetAPIStatus();
      try {
        createBeneficiary().then(beneficiary => {
          if (beneficiary?.code) { throw beneficiary }
          var innerHtml = '<div>Beneficiary</div><br>'
          innerHtml += getHtmlForBeneficiary(beneficiary)
          document.getElementById("contentContainer").innerHTML = innerHtml
          document.getElementById("beneIdInput").value = beneficiary.id
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("deleteBeneficiary").addEventListener("click", () => {
      resetAPIStatus();
      try {
          var beneficiaryId = document.getElementById("beneIdInput").value;
          deleteBeneficiary(beneficiaryId).then(result => {
          if (result?.code) { throw result }
          var innerHtml = '<div>Delete Beneficiary</div>'
          innerHtml += getHtmlForJSON(result)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("updateBeneficiary").addEventListener("click", () => {
      resetAPIStatus();
      try {
          var beneficiaryId = document.getElementById("beneIdInput").value;
          updateBeneficiary(beneficiaryId).then(beneficiary => {
          if (beneficiary?.code) { throw beneficiary }
          var innerHtml = '<div>Beneficiary</div><br>'
          innerHtml += getHtmlForBeneficiary(beneficiary)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("validateBeneficiary").addEventListener("click", () => {
      resetAPIStatus();
      try {
          validateBeneficiary().then(result => {
          if (result?.code) { throw result }
          var innerHtml = '<div>Validate Beneficiary</div><br>'
          innerHtml += getHtmlForJSON(result)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("getBeneficiaryFormSchema").addEventListener("click", () => {
      resetAPIStatus();
      try {
          getBeneficiaryFormSchema().then(result => {
          if (result?.code) { throw result }
          var innerHtml = '<div>Beneficiary Schema</div><br>'
          innerHtml += getHtmlForJSON(result)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })

    document.getElementById("getBeneficiaryAPISchema").addEventListener("click", () => {
      resetAPIStatus();
      try {
          getBeneficiaryAPISchema().then(result => {
          if (result?.code) { throw result }
          var innerHtml = '<div>Beneficiary Schema</div><br>'
          innerHtml += getHtmlForJSON(result)
          document.getElementById("contentContainer").innerHTML = innerHtml
          success()
        }).catch((error) => failure(error))
      } catch (error) { failure(error) }
    })
}