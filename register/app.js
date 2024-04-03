const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());


const registeredCompanies = {};

app.post('/test/register', (req, res) => {
  const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

  if (accessCode !== 'bntKpm') {
    return res.status(403).json({ error: 'Invalid access code' });
  }


  if (registeredCompanies[rollNo]) {
    return res.status(400).json({ error: 'Company already registered' });
  }

  const clientID = generateUUID();
  const clientSecret = generateRandomString();

  registeredCompanies[rollNo] = {
    companyName,
    clientID,
    clientSecret,
    ownerName,
    ownerEmail,
    rollNo,
  };

  res.json({
    companyName,
    clientID,
    clientSecret,
    ownerName,
    ownerEmail,
    rollNo,
  });
});

app.post('/test/auth', (req, res) => {

  const { companyName, clientID, clientSecret, ownerName, ownerEmail, rollno } = req.body;

  if (!registeredCompanies[rollno]) {
    return res.status(404).json({ error: 'Company not registered' });
  }

  const registeredCompany = registeredCompanies[rollno];
  if (registeredCompany.companyName !== companyName || registeredCompany.clientID !== clientID || registeredCompany.clientSecret !== clientSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const authToken = generateRandomString();

  res.json({
    authToken,
  });
});

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});