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

function doGet() {
  try {
    var spreadSheet = SpreadsheetApp.openById(''); // Spreadsheet ID here
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
    var spreadSheet = SpreadsheetApp.openById('');
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

    var bannerUrl = "" // Direct link to the banner image (sample: https://drive.google.com/uc?export=view&id=1itBkBE-OYjkxJWLQ1kjUAseuGc2shVbA)
    
    const emailSignature = `
      <div style="font-family: 'Times New Roman', serif; color: rgb(65, 65, 65); max-width: 500px;">
        <div style="border-bottom: 1px solid rgb(65,65,65); padding-bottom: 4px;">
          <span style="color: rgb(64,158,255); font-size: 12px; font-weight: bold;">Justin Dayne Bryant Peña & Yuuri Nonaka</span><br>
          <span style="font-size: 12px; font-style: italic;">Programs Committee Heads | </span>
          <a href="mailto:prog@yses.org" style="color: rgb(64,158,255); font-weight: bold;">prog@yses.org</a>
        </div>

        <!-- Flexbox for inline logo and details -->
        <div style="display: flex; align-items: center; margin-top: 10px;">
          <!-- Logo -->
          <a href="https://yses.org/" target="_blank" style="margin-right: 15px;">
            <img src="https://res.cloudinary.com/drd1sbwh8/image/upload/v1702742150/wrapped.png" width="105" alt="YSES Logo" style="vertical-align: middle; border: 0px;">
          </a>
          
          <!-- Text Details -->
          <div>
            <span style="color: rgb(64,158,255); font-size: 14px; font-weight: bold;">Young Software Engineers' Society</span>
            <p style="font-size: 12px; margin: 2px 0;">Bridging the gap between the academe and the industry since 2005 / @YSES2005</p>
            <a href="https://www.yses.org" target="_blank" style="color: rgb(64,158,255); font-weight: bold; text-decoration: none;">https://www.yses.org</a>
            <!-- Social Media Links (Inline Icons) -->
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 2px;">
              <a href="https://www.youtube.com/c/YoungSoftwareEngineersSociety" target="_blank">
                <img src="https://cdn.gifo.wisestamp.com/s/yt/409eff/48/4/border.png" width="24" alt="YouTube">
              </a>
              <a href="https://www.facebook.com/YSES2005" target="_blank">
                <img src="https://cdn.gifo.wisestamp.com/s/fb/409eff/48/4/border.png" width="24" alt="Facebook">
              </a>
              <a href="https://www.instagram.com/yses2005/" target="_blank">
                <img src="https://cdn.gifo.wisestamp.com/s/inst/409eff/48/4/border.png" width="24" alt="Instagram">
              </a>
              <a href="https://www.linkedin.com/company/yses" target="_blank">
                <img src="https://cdn.gifo.wisestamp.com/s/ld/409eff/48/4/border.png" width="24" alt="LinkedIn">
              </a>
              <a href="https://twitter.com/YSES2005" target="_blank">
                <img src="https://cdn.gifo.wisestamp.com/s/tw/409eff/48/4/border.png" width="24" alt="Twitter">
              </a>
            </div>
          </div>
        </div>
      </div>
    `;


    // TODO: Create if else for different brackets (Junior/Senior)
    MailApp.sendEmail({
      to: formData.email,
      name: "EXPE21ENCE YSES Programs Committee",
      subject: "Confirmation: Team Registration for EXPE21ENCE YSES: The HackFest",
      htmlBody: `
      
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

          <p>Best regards,<br>The EXPE21ENCE YSES Team</p>
        ${emailSignature}
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