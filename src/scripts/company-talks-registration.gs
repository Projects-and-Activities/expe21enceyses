// @ts-nocheck

/*
  IMPORTANT NOTE:
  This script is specifically designed for Google Apps Script environment.
  It handles HTTP GET and POST requests to manage company talks registrations.
  This script uploaded in the repository is for version control and documentation purposes only.
  To modify this script, access the Google Apps Script and make changes there directly. 
  Any changes made here will not affect the live environment.
  But always update this file to keep it in sync with the live version after making changes in the Google Apps Script.
*/

const SPREADSHEET_ID = "1HMNivR_CH2Sswrim-6onp1qp7BxMIzWkgb1Iz_ytq0s"
const BANNER_URL = "https://drive.google.com/uc?export=view&id=1yi4HiRNAwh1bkEUcFC7D2GxB4n_qfR2c"
const FOOTER_URL = "https://drive.google.com/uc?export=view&id=1r2iC2JoVid1ttVj0E-hKVAh96WA3r84N"

function doPost(e) {
  try {
    var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var regSheet = spreadSheet.getSheets()[3];

    var formData = JSON.parse(e.postData.contents);

    var emailBody = `
      <p>
       You’re all set for <strong>EXPE21ENCE YSES: Company Talks!</strong> Your registration has been received.
      </p>

      <p>
        A detailed reminder email will be sent closer to the session date, including venue details, speaker information, and any materials to prepare. Please arrive at least 10-15 minutes before the session start time to secure your seat.
      </p>

      <p>
        If you can no longer attend, kindly inform us early so we can open your slot to another participant. For questions, message <a href="mailto:prog@yses.org">prog@yses.org</a>.
      </p>

      <p>
        See you at CTalks!
      </p>

      <p>Yours in experience,<br>The Young Software Engineers' Society, UPLB</p>
      `

    regSheet.appendRow([formData.firstName, formData.lastName, formData.email]);

    MailApp.sendEmail({
      to: formData.email,
      name: "EXPE21ENCE YSES Programs Committee",
      subject: 'You’re Registered! EXPE21ENCE YSES: Company Talks',
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${BANNER_URL}" alt="Event Banner" width="100%" style="border-radius: 10px;">
          </div>
          
          <p>Hi, Mr. / Ms. / Mx. ${formData.firstName} ${formData.lastName},</p>
          
          ${emailBody}
          
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${FOOTER_URL}" alt="Event Footer" width="100%" style="border-radius: 10px;">
          </div>
        </div>
      `
    });
    return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error processing form submission:", error);
    return ContentService.createTextOutput(JSON.stringify({status: 'fail', message: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

