const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('http://20.244.56.144/test/auth', (req, res) => {
    const { companyName, ClientID, clientSecret, ownerName, ownerEmail, rollNo } = req.body;

    const token = {
        tokenType: "Bearer",
        accessToken: registeredCompany.AuthorizationToken
    };

    res.status(200).json(token);
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});