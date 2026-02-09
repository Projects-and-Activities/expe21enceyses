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

function doGet() {
  try {
    var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var regSheet = spreadSheet.getSheets()[1];

    var cellAddress = "B1";
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
    var spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var regSheet = spreadSheet.getSheets()[1];

    var formData = JSON.parse(e.postData.contents);

    // file handling 1jMVDV63GYApAn_zoXCPSokagxgjVktmS
    var decodedRequirementsFile = Utilities.base64Decode(formData.requirements);
    var reqBlob = Utilities.newBlob(decodedRequirementsFile, formData.requirementsFileType, formData.teamName + "_Requirements");
    var savedRequirements = DriveApp.getFolderById('').createFile(reqBlob);
    var reqUrl = savedRequirements.getUrl(); 

    var decodedPaymentFile = Utilities.base64Decode(formData.payment);
    var paymentBlob = Utilities.newBlob(decodedPaymentFile, formData.paymentFileType, formData.teamName + "_ProofOfPayment");
    var savedPayment = DriveApp.getFolderById('').createFile(paymentBlob);
    var paymentUrl = savedPayment.getUrl();  

    var contactNumber = "'" + formData.contactNumber; 

    var membersData = formData.members
      .filter(member => member.firstName && member.lastName)
      .map(member => `${member.firstName} ${member.lastName} (${member.gradeLevel})`)
      .join("\n");

    regSheet.appendRow([
      formData.teamName, 
      formData.schoolName, 
      formData.teamCoach, 
      contactNumber, 
      formData.email, 
      membersData, 
      reqUrl, 
      paymentUrl
    ]);

    // TODO: Create if else for different brackets (Junior/Senior)
    MailApp.sendEmail({
      to: formData.email,
      name: "EXPE21ENCE YSES Programs Committee",
      subject: "You’re In! EXPE21ENCE YSES: The HackFest - Senior Registration Confirmed",
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${bannerUrl}" alt="Event Banner" width="100%" style="max-width: 600px; border-radius: 10px;">
          </div>

            <p>
              Hi ${formData.teamName},
            </p>

            <p>
              Thank you for registering for <strong>EXPE21ENCE YSES: The HackFest!</strong> Your team's application for the <strong>Senior HackFest bracket</strong> has been successfully received.
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