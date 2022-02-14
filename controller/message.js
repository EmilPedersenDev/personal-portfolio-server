const { google } = require('googleapis');
const validator = require('../middleware/validations/validator.js');
const { personalInformation } = require('../middleware/validations/rules.js');

module.exports = async (app) => {
  app.post('/message', personalInformation(), validator, async (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
      res.status(403).json({
        message: 'Did not provide required contact fields.',
      });
    }

    try {
      const sheetKeysFile = __dirname + '/../keys.json';

      const auth = new google.auth.GoogleAuth({
        keyFile: sheetKeysFile,
        scopes: process.env.GOOGLE_API_URL,
      });

      const authClientObject = await auth.getClient();

      const googleSheetsInstance = google.sheets({
        version: 'v4',
        auth: authClientObject,
      });

      const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

      await googleSheetsInstance.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: process.env.GOOGLE_SHEETS_NAME,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[name, message]],
        },
      });
    } catch (e) {
      res.status(403).send(e);
    }

    res.sendStatus(200);
  });
};
