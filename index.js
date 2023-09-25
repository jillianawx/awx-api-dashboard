const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');

// Importing helper methods
const helper = require("./server/helper")
const scalehelper = require("./server/scalehelper")
const pihelper = require("./server/paymentintentshelper")
const plinkshelper = require("./server/paymentlinkshelper")
const pohelper = require("./server/payoutshelper")
const fshelper = require("./server/fundssplitshelper")
const globalacchelper = require("./server/globalaccountshelper")
const linkedacchelper = require("./server/linkedaccountshelper")
const wallethelper = require("./server/wallethelper")

app.use(express.static(path.join(__dirname, 'public')));

// JS Methods that are affected by CORS need to be called from server instead.
app.get('/api/authentication/login', function(req, res) {
    helper.getBearerToken().then(jsonBody => {
        if (jsonBody.code) { throw new Error(JSON.stringify(jsonBody)) }
        res.status(200).json(jsonBody)
    })
})

app.post('/api/simulation/accounts/update_status', bodyParser.json(), function(req, res) {
    scalehelper.updateStatusOfCA(req.body.accountId, req.body.status)
    .then((result) => {
        if (result.code) { return res.status(500).json(result) }
        res.status(200).json(result) 
    })
    .catch((error) => res.status(500).json({ "error": "Unable to update status of connected account", "errorMessage": error }))
})
app.post('/api/simulation/payments/transition', bodyParser.json(), function(req, res) {
    pohelper.transitionPaymentStatus(req.body.status, req.body.payoutPaymentId, req.body.connectedAccountId)
    .then((result) => {
        if (result.code) { return res.status(500).json(result) }
        res.status(200).json(result) 
    })
    .catch((error) => res.status(500).json({ "error": "Unable to update status of connected account", "errorMessage": error }))
})

app.post('/api/pa/payment_intents', bodyParser.json(), function(req, res) {
    return pihelper.apiEndpointHandler(req, res)
})
app.post('/api/pa/payment_links', bodyParser.json(), function(req, res) {
    return plinkshelper.apiEndpointHandler(req, res)
})
app.post('/api/pa/funds_splits', bodyParser.json(), function(req, res) {
    return fshelper.apiEndpointHandler(req, res)
})
app.post('/api/global_accounts', bodyParser.json(), function(req, res) {
    return globalacchelper.apiEndpointHandler(req, res)
})
app.post('/api/linked_accounts', bodyParser.json(), function(req, res) {
    return linkedacchelper.apiEndpointHandler(req, res)
})
app.post('/api/wallet', bodyParser.json(), function(req, res) {
    return wallethelper.apiEndpointHandler(req, res)
})

// Route to pages
app.get('/', async(req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/*', async(req, res) => {
    var page = req.url
    // Hard coded logic. Bad design but 0w0 #techdebt
    // To load helperjs from html pages (public/script js)
    if (page.includes('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
        res.sendFile(path.join(__dirname, 'public/scripts', page));
    }
    else if (page.includes('demo')) {
        // To load the demo pages originally from airwallex-payment-demo
        // localhost:5000/payment-demo/index?piId=xxx
        page = page.split('?')[0]; // To remove url params
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname, 'public', page + '.html'))
    }
    else {
        // To load regular pages like localhost:5000/connectedaccounts (public)
        page = page.replace('?', '/') // To avoid url params
        page = page.split('/')[1];
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname, 'public', page + '.html'));
    }
})
app.listen(5000, () => {
    console.log("Server successfully running on port 5000")
})