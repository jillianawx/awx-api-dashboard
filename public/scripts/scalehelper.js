// Functions for Connected Accounts
function createConnectedAccount(isBusiness, isFullFlow) {
    var config = getDefaultConfig("POST");
    var randomInt = Math.floor(Math.random() * 1000);
    var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    }
    else if (isBusiness) {
        config.body = JSON.stringify({
            "account_details": {
                "business_details": {
                    "business_address": { "country_code": "SG" },
                    "registration_address": { "country_code": "SG" },
                    "business_name": "Connected Account " + randomInt,
                    "business_structure": "COMPANY",
                    "description_of_goods_or_services": "Goods",
                    "industry_category": "E-Commerce - Merchant",
                    "industry_category_code": "ICCV3_0000XX",
                    "operating_country": [ "US", "AU", "CN", "SG" ],
                    "url": "https://www.goodsgoodsgoods.com",
                    "account_usage": {
                        "estimated_monthly_revenue": { "amount": "10000.0", "currency": "SGD" },
                        "product_reference": [ "ACCEPT_ONLINE_PAYMENTS" ]
                    }
                },
                "business_person_details": [
                    {
                        "date_of_birth": "1988-01-01",
                        "email": "testemail@example.com",
                        "first_name": "John",
                        "last_name": "Smith",
                        "roles": [ "BENEFICIAL_OWNER" ],
                        "residential_address": {
                            "address_line1": "123 Market Street",
                            "country_code": "SG"
                        },
                        "nationality": "SG",
                        "identifications": {
                            "primary": {
                                "identification_type": "TAX_ID",
                                "tax_id": { "number": "123456789", "type": "SSN" }
                            }
                        }
                    }
                ]
            },
            "customer_agreements": {
                "agreed_to_data_usage": true,
                "agreed_to_terms_and_conditions": false,
                "opt_in_for_marketing": false
            },
            "nickname": "Connected Account " + randomInt,
            "primary_contact": { "email": "test" + randomInt + "@example.com" }
        })
    }
    else {
        config.body = JSON.stringify({
            "account_details": {
                "individual_details": {
                    "address": {
                        "address_line1": "123 Market Street",
                        "country_code": "HK"
                    },
                    "date_of_birth": "2000-01-01",
                    "first_name": "John",
                    "first_name_english": "John",
                    "last_name": "Doe",
                    "last_name_english": "Doe",
                    "nationality": "HK",
                    "primary_identification": {
                        "identification_type": "TAX_ID",
                        "tax_id": {
                            "number": "123456789",
                            "type": "SSN"
                        }
                    }
                },
                "legal_entity_type": "INDIVIDUAL"
            },
            "identifier": "Individual " + randomInt,
            "account_usage": {
                "card_usage": [ "GENERAL_EXPENSES" ],
                "collection_country_codes": [ "HK" ],
                "collection_from": [ "EMPLOYMENT_INCOME" ],
                "expected_monthly_transaction_volume": { "amount": "5000" },
                "payout_country_codes": [ "HK" ],
                "payout_to": [ "OWN_BANK_ACCOUNT" ],
                "product_reference": [ "CREATE_CARDS" ]
            },
            "customer_agreements": {
                "agreed_to_data_usage": true,
                "agreed_to_terms_and_conditions": true,
                "agreed_to_biometrics_consent": true
            },
            "primary_contact": {
                "email": "test" + randomInt + "@example.com",
                "mobile": randomInt
            }
        })
    }
    const endpoint = baseUrl + '/accounts/create';
    if (!isFullFlow) {
        return fetch(endpoint, config).then(data => {
            return data.json()
        })
    }
    else {
        return fetch(endpoint, config).then(data => {
            return data.json()
        }).then(json => {
            return agreeToTC(json.id).then(() => {
                return submitForActivation(json.id).then(()=> {
                    return updateStatusOfCA(json.id);
                })
            })
        })
    }
}

function agreeToTC(accountId) {
    accountId = (accountId && accountId != '') ? accountId : getUrlParam('caId')
    if (!accountId || accountId == '') { throw new Error("No AccountId provided") }
    var config = getDefaultConfig("POST")
    const endpoint = baseUrl + '/accounts/' + accountId + '/terms_and_conditions/agree';
    return fetch(endpoint, config).then(res => { return res.json() })
}

function submitForActivation(accountId) {
    accountId = (accountId && accountId != '') ? accountId : getUrlParam('caId')
    if (!accountId || accountId == '') { throw new Error("No AccountId provided") }
    var config = getDefaultConfig("POST")
    const endpoint = baseUrl + '/accounts/' + accountId + '/submit';
    return fetch(endpoint, config).then(res => { return res.json() })
}

function updateStatusOfCA(accountId, status) {
    accountId = (accountId && accountId != '') ? accountId : getUrlParam('caId')
    if (!accountId || accountId == '') { throw new Error("No AccountId provided") }
    const endpoint =  '/api/simulation/accounts/update_status'
    var config = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    }
    var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    } else {
        config.body = JSON.stringify({
            "accountId": accountId,
            "status": status
        })
    }
    return fetch(endpoint, config).then((res) => { return res.json() })
}

function getConnectedAccount(accountId) {
    accountId = (accountId && accountId != '') ? accountId : getUrlParam('caId')
    if (!accountId || accountId == '') { throw new Error("No AccountId provided") }
    var config = getDefaultConfig("GET")
    const endpoint = baseUrl + '/accounts/' + accountId
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getConnectedAccounts() {
    var config = getDefaultConfig("GET")
    var endpoint = baseUrl + "/accounts"
    var parameterQueryString = document.getElementById("jsonBodyInput").value
    if (parameterQueryString && parameterQueryString != '') {
        endpoint += parameterQueryString
    }
    return fetch(endpoint, config).then(res => { return res.json() })
}

function createPlatformReport(reportType) {
    if (!reportType || reportType == '') { throw new Error("No Report Type selected") }
    var config = getDefaultConfig("POST")
    config.body = JSON.stringify({
        "file_format": "CSV",
        "from_created_at": '2023-01-01',
        "to_created_at": new Date().toISOString().split('T')[0],
        "type": reportType
    })
    var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
    if (jsonBodyOverride && jsonBodyOverride != '') {
        config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    }
    const endpoint = baseUrl + "/platform_reports/create"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getPlatformReport(reportId) {
    if (!reportId || reportId == '') { throw new Error("No Report ID provided") }
    var config = getDefaultConfig("GET")
    const endpoint = baseUrl + "/platform_reports/" + reportId
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getAccountDetails() {
    var config = getDefaultConfig("GET")
    const endpoint = baseUrl + "/account"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function getAccountWalletInformation() {
    var config = getDefaultConfig("GET")
    const endpoint = baseUrl + "/account/wallet_info"
    return fetch(endpoint, config).then(res => { return res.json() })
}

function updateConnectedAccount(accountId) {
    accountId = (accountId && accountId != '') ? accountId : getUrlParam('caId')
    if (!accountId || accountId == '') { throw new Error("No AccountId provided") }
    var jsonBodyOverride = document.getElementById("jsonBodyInput").value;
    if (!jsonBodyOverride || jsonBodyOverride == '') { throw new Error("No JSON body provided") }
    const endpoint = baseUrl + '/accounts/' + accountId + "/update"
    var config = getDefaultConfig("POST")
    config.body = JSON.stringify(JSON.parse(jsonBodyOverride))
    return fetch(endpoint, config).then(res => { return res.json() })
}

// EVENT LISTENERS TO ATTACH
function attachEventListeners() {
    document.getElementById("createPlatformReport").addEventListener("click", () => {
        resetAPIStatus();
        try {
        var reportType = document.querySelector('input[name="reportType"]:checked')?.value;
        createPlatformReport(reportType).then(result => {
            if (result?.code) { throw result }
            var innerHtml = '<div>Created Platform Report</div><br>'
            innerHtml += getHtmlForJSON(result)
            document.getElementById("contentContainer").innerHTML = innerHtml
            document.getElementById("reportIdInput").value = result;
            success()
        }).catch((error) => failure(error))
        } catch (error) { failure(error) }
    })

    document.getElementById("getPlatformReport").addEventListener("click", () => {
        resetAPIStatus();
        try {
        var reportId = document.getElementById("reportIdInput").value
        getPlatformReport(reportId).then(report => {
            if (report?.code) { throw result }
            var innerHtml = '<div>Platform Report</div><br>';
            var buttons = '';
            if (report.status == 'COMPLETED') {
            buttons += '<br><a class="button" href="' + report.download_url + '" target="_blank">Download</a><br><br>'
            }
            innerHtml+= '<div class="card"> \
                <div class="card__details">\
                    <span class="tag">' + report.status + '</span> ' + 
                    '<span class="tag">' + report.type + '</span> ' +
                    '<div class="name">' + report.file_name + ' (' + report.file_format + ') <i>(ID: ' + report.id + ')</i></div>\
                    <p>' + JSON.stringify(report, undefined, 4) + '</p>' +
                    buttons +
                '</div>\
                </div><br>'
            document.getElementById("contentContainer").innerHTML = innerHtml
            success()
        }).catch((error) => failure(error))
        } catch (error) { failure(error) }
    })

    document.getElementById("getAccountDetails").addEventListener("click", () => {
        resetAPIStatus();
        try {
        getAccountDetails().then(result => {
            if (result?.code) { throw result }
            var nextActionTag = ''
            if (result.status == "ACTION_REQUIRED") {
            nextActionTag = '<span class="tag">' + result.next_action?.type + '</span>'
            }
            var innerHtml = '<div>Account Details</div><br>'
            innerHtml+= '<div class="card"> \
                <div class="card__details">\
                    <span class="tag">' + result.status + '</span> ' + 
                    '<span class="tag">' + result.view_type + '</span> ' + nextActionTag + 
                    '<div class="name">' + result.nickname + ' <i>(ID: ' + result.id + ')</i></div>\
                    <pre><code>' + JSON.stringify(result, undefined, 4) + '</code></pre>' +
                '</div>\
                </div><br>'
            document.getElementById("contentContainer").innerHTML = innerHtml
            success()
        }).catch((error) => failure(error))
        } catch (error) { failure(error) }
    })

    document.getElementById("getAccountWalletInformation").addEventListener("click", () => {
        resetAPIStatus();
        try {
        getAccountWalletInformation().then(result => {
            if (result?.code) { throw result }
            var innerHtml = '<div>Account Wallet Information</div><br>\
            <p>Name: ' + result.account_name + '<br>Number: ' + result.account_number +'</p>'
            document.getElementById("contentContainer").innerHTML = innerHtml
            success()
        }).catch((error) => failure(error))
        } catch (error) { failure(error) }
    })

    // Button to get all connected accounts
    document.getElementById("loadConnectedAccounts").addEventListener("click", () => {
        resetAPIStatus();
        try {
        getConnectedAccounts().then(accounts => {
            if (accounts?.code) { throw accounts }
            var innerHtml = '<div>All Connected Accounts</div><br>'
            accounts.items.forEach(account => {
                innerHtml += getHtmlForAccount(account)
            })
            document.getElementById("contentContainer").innerHTML = innerHtml
            success()
        }).catch((error) => failure(error))
        } catch (error) { failure(error) }
    })

    // Button to create new connected account
    document.getElementsByName("createConnectedAccount").forEach((element) => {
        element.addEventListener("click", (event) => {
        resetAPIStatus();
        try {
            var buttons = document.getElementsByName('entityType')
            if (!buttons[0].checked && !buttons[1].checked) { throw new Error("Select at least one entity type") }
            var isFullFlow = event.target.id == 'fullProcess'
            createConnectedAccount(buttons[0].checked, isFullFlow).then(account => {
            if (account?.code) { throw account }
            var innerHtml = '<div>New Connected Account</div><br>'
            innerHtml += getHtmlForAccount(account)
            document.getElementById("contentContainer").innerHTML = innerHtml
            document.getElementById("caIdInput").value = account.id
            success()
            }).catch(error => failure(error))
        } catch (error) { failure(error) }
        })
    })
    // Button to get connected account
    document.getElementById("getConnectedAccount").addEventListener("click", () => {
        resetAPIStatus();
        var connectedAccountId = document.getElementById("caIdInput").value;
        try {
        getConnectedAccount(connectedAccountId).then(account => {
            if (account?.code) { throw account }
            var innerHtml = '<div>Connected Account</div><br>';
            innerHtml += getHtmlForAccount(account);
            document.getElementById("contentContainer").innerHTML = innerHtml;
            success()
        }).catch(error => failure(error))
        } catch (error) { failure(error) }
    })
    // Button for connected account to agree to T&Cs
    document.getElementById("agreeConnectedAccountTC").addEventListener("click", () => {
        resetAPIStatus();
        var connectedAccountId = document.getElementById("caIdInput").value;
        try {
        agreeToTC(connectedAccountId).then(account => {
            if (account?.code) { throw account }
            var innerHtml = '<div>Connected Account</div><br>';
            innerHtml += getHtmlForAccount(account);
            document.getElementById("contentContainer").innerHTML = innerHtml;
            success()
        }).catch(error => failure(error))
        } catch (error) { failure(error) }
    })
    // Button to submit new connected account
    document.getElementById("submitConnectedAccount").addEventListener("click", () => {
        resetAPIStatus();
        var connectedAccountId = document.getElementById("caIdInput").value;
        try {
        submitForActivation(connectedAccountId).then(account => {
            if (account?.code) { throw account }
            var innerHtml = '<div>Connected Account</div><br>';
            innerHtml += getHtmlForAccount(account);
            document.getElementById("contentContainer").innerHTML = innerHtml;
            success()
        }).catch(error => failure(error))
        } catch (error) { failure(error) }
    })
    // Button to update status of connected account
    document.getElementsByName("updateStatusConnectedAccount").forEach((element) => {
        element.addEventListener("click", (event) => {
        resetAPIStatus();
        var connectedAccountId = document.getElementById("caIdInput").value;
        try {
            updateStatusOfCA(connectedAccountId, event.target.id).then(result => {
                if (result?.code) { throw result }
                else {
                    getConnectedAccount(connectedAccountId).then(account => {
                        var innerHtml = '<div>Connected Account</div><br>';
                        innerHtml += getHtmlForAccount(account);
                        document.getElementById("contentContainer").innerHTML = innerHtml;
                        success()
                    })
                }
            }).catch(error => failure(error))
        } catch (error) { failure(error) }
        })
    })

    document.getElementById("updateConnectedAccount").addEventListener("click", () => {
        resetAPIStatus();
        var connectedAccountId = document.getElementById("caIdInput").value;
        try {
            updateConnectedAccount(connectedAccountId).then(account => {
            if (account?.code) { throw account }
            var innerHtml = '<div>Connected Account</div><br>';
            innerHtml += getHtmlForAccount(account);
            document.getElementById("contentContainer").innerHTML = innerHtml;
            success()
        }).catch(error => failure(error))
        } catch (error) { failure(error) }
    })
}