// @ts-nocheck

/*
  IMPORTANT NOTE:
  This script is specifically designed for Google Apps Script environment.
  It handles HTTP GET and POST requests to manage PF/JF registrations.
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
    var regSheet = spreadSheet.getSheets()[2];

    var formData = JSON.parse(e.postData.contents);

    var selectedOption = "Internship";

    var emailBody = `
      <p>
       Thank you for signing up as a participant for <strong>EXPE21ENCE YSES: PF/JF!</strong> Your registration has been received.
      </p>

      <p>
        We're excited to have you on board as we connect aspiring software engineers—and participants from all backgrounds—with internship and job opportunities. This event is a fantastic chance to network, gain practical experience, and explore career paths that can kick-start your professional journey.
      </p>

      <p> 
        Because there will be <strong>on-site interviews</strong> at the event, <strong>please come in formal attire</strong> (e.g., corporate or business wear). Stay tuned for future announcements and reminders regarding event details, schedules, and other important updates via email.
      </p>

      <p>
        If you have any questions or need assistance, feel free to contact us at <a href="mailto:prog@yses.org">prog@yses.org</a>. We're here to support you throughout the PF/JF process!
      </p>

      <p>
        Let's shape the future together!
      </p>

      <p>Yours in experience,<br>The Young Software Engineers' Society, UPLB</p>
      `


    if (formData.purposeOfRegistration != "internship"){
      selectedOption = "Job Opportunity"
    }

    regSheet.appendRow([formData.firstName, formData.lastName, formData.email, selectedOption]);

    MailApp.sendEmail({
      to: formData.email,
      name: "EXPE21ENCE YSES Programs Committee",
      subject: 'You’re Registered! EXPE21ENCE YSES: Practicum Fair / Job Fair',
      htmlBody: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${BANNER_URL}" alt="Event Banner" width="100%" style="max-width: 600px; border-radius: 10px;">
        </div>
        
        <p>Hello, Mr. // Ms. // Mx. ${formData.firstName} ${formData.lastName}, </p>

        ${emailBody}
        
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${FOOTER_URL}" alt="Event Banner" width="100%" style="max-width: 600px; border-radius: 10px;">
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
