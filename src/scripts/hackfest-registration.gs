// @ts-nocheck

/*
  IMPORTANT NOTE:
  This script is specifically designed for Google Apps Script environment.
  It handles HTTP GET and POST requests to manage hackfest registrations.
  This script uploaded in the repository is for version control and documentation purposes only.
  To modify this script, access the Google Apps Script and make changes there directly. 
  Any changes made here will not affect the live environment.
  But always update this file to keep it in sync with the live version after making changes in the Google Apps Script.
*/

const SPREADSHEET_ID = "1HMNivR_CH2Sswrim-6onp1qp7BxMIzWkgb1Iz_ytq0s"
const BANNER_URL = "https://drive.google.com/uc?export=view&id=1yi4HiRNAwh1bkEUcFC7D2GxB4n_qfR2c"
const FOOTER_URL = "https://drive.google.com/uc?export=view&id=1r2iC2JoVid1ttVj0E-hKVAh96WA3r84N"

const BRACKET_CONFIG = {
  'junior': {
    sheetIndex: 0,
    requirementsDriveFolder: '1ZIcjdpjESa81kea1Fb-CHwoXRApjoFFw',
    proofOfPaymentDriveFolder: '1baX0QzUepXUw7bgbmTD31niPQswNJvxy',
    emailSubject: "You're In! EXPE21ENCE YSES: The HackFest - Junior Registration Confirmed",
    categoryName: "Junior HackFest bracket"
  },
  'senior': {
    sheetIndex: 1,
    requirementsDriveFolder: '17lr3nZ5mHYgItHQb-YYPql8mj6x94N_v',
    proofOfPaymentDriveFolder: '1Re2bT9lMPXuv--fj2tnuVsMsxox07sVH',
    emailSubject: "You're In! EXPE21ENCE YSES: The HackFest - Senior Registration Confirmed", 
    categoryName: "Senior HackFest bracket"
  }
};

function doGet(e) {
  try {
    var formData = JSON.parse(e.postData.contents);
    let bracket = formData.bracket || 'senior';
    let bracketSheetIndex = 'junior' === bracket ? 0 : 1;

    var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var regSheet = spreadSheet.getSheets()[bracketSheetIndex];

    var cellAddress = "D1";
    var cellValue = regSheet.getRange(cellAddress).getValue();

    return ContentService.createTextOutput(JSON.stringify({ value: cellValue }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error("Error fetching cell value:", error);
    return ContentService.createTextOutput(JSON.stringify({ status: 'fail', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }

}

function doPost(e) {
  try {
    var formData = JSON.parse(e.postData.contents);
    var bracket = formData.bracket || 'senior'; 
    var config = BRACKET_CONFIG[bracket];

    if (!config) throw new Error('Invalid bracket specified');

    var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var regSheet = spreadSheet.getSheets()[config.sheetIndex];

    var decodedRequirementsFile = Utilities.base64Decode(formData.requirements);
    var reqBlob = Utilities.newBlob(decodedRequirementsFile, formData.requirementsFileType, formData.teamName + "_Requirements");
    var savedRequirements = DriveApp.getFolderById(config.requirementsDriveFolder).createFile(reqBlob);
    var reqUrl = savedRequirements.getUrl(); 

    var decodedPaymentFile = Utilities.base64Decode(formData.payment);
    var paymentBlob = Utilities.newBlob(decodedPaymentFile, formData.paymentFileType, formData.teamName + "_ProofOfPayment");
    var savedPayment = DriveApp.getFolderById(config.proofOfPaymentDriveFolder).createFile(paymentBlob);
    var paymentUrl = savedPayment.getUrl();  

    var contactNumber = "'" + formData.contactNumber; 

    let rowData = [
      formData.teamName,
      formData.email,
      contactNumber,
    ]

    if (bracket === 'junior') {
      let coachName = formData.coachFirstName + " " + formData.coachLastName;

      rowData.push(
        formData.schoolName, 
        coachName, 
        formData.coachFacebookLink
      );

      for (let i = 0; i < formData.members.length; i++) {
        let member = formData.members[i];
        let memberInfo = `${member.name}\n${member.email}\n${member.gradeLevel}\n${member.facebookLink}`;
        rowData.push(memberInfo);
      }

    } else { // Senior bracket
      for (let i = 0; i < formData.members.length; i++) {
        let member = formData.members[i];
        let memberInfo = `${member.name}\n${member.email}\n${member.schoolName}\n${member.universityLevel}\n${member.facebookLink}`;
        rowData.push(memberInfo);
      }
    }

    rowData.push(reqUrl, paymentUrl);
    regSheet.appendRow(rowData);

    MailApp.sendEmail({
      to: formData.email,
      name: "EXPE21ENCE YSES Programs Committee",
      subject: config.emailSubject,
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${BANNER_URL}" alt="Event Banner" width="100%" style="max-width: 600px; border-radius: 10px;">
          </div>

            <p>
              Hi ${formData.teamName},
            </p>

            <p>
              Thank you for registering for <strong>EXPE21ENCE YSES: The HackFest!</strong> Your team's application for the <strong>${bracket.charAt(0).toUpperCase() + bracket.slice(1)} HackFest bracket</strong> has been successfully received.
            </p>

            <p>
              Over the next few days, the Programs Committee will review your details and verify your requirements. Once confirmed, you will receive another email with all the important event details, submission guidelines, and schedules.
            </p>

            <p>In the meantime, you may already:</p>
              <ul>
                <li><p>Review the event mechanics and judging criteria in the program manual</p></li>
                <li><p>Start exploring problems in your community that you want to solve</p></li>
                <li><p>Coordinate with your teammates about availability during key event dates</p></li>
              </ul>

            <p> 
              If you have any questions or need assistance, contact us at <a href="mailto:prog@yses.org">prog@yses.org</a>. 
            </p>

            <p>
              See you at EXPE21ENCE YSES: The HackFest!
            </p>

            <p>Yours in experience,<br>The Young Software Engineers' Society, UPLB</p>
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