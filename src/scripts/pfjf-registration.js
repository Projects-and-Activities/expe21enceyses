function doPost(e) {
  try {
    var spreadSheet = SpreadsheetApp.openById('1_PZhGW7s8r4VaoxAlhZVLvRPu5e9vI6zOn9Yw4ITCzQ');
    var regSheet = spreadSheet.getSheets()[2];

    var formData = JSON.parse(e.postData.contents);

    var selectedOption = "Internship";

    var emailBody = `
      <p>Thank you for confirming your participation in <strong>P20JECT YSES: PF/JF</strong>! We’re excited to have you on board as we connect aspiring software engineers—and participants from all backgrounds—with internship and job opportunities. This event is a fantastic chance to network, gain practical experience, and explore career paths that can kick-start your professional journey.</p>

      <p>Because there will be <strong>on-site interviews</strong> at the event, <strong>please come in formal attire (e.g., corporate or business wear)</strong>. Stay tuned for future announcements and reminders regarding event details, schedules, and other important updates via email.</p>

      <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:prog@yses.org">prog@yses.org</a>. We’re here to support you throughout the PF/JF process!</p>

      <p>Let’s shape the future together!</p>

      <p><strong>See you soon,</strong><br></p>
      `


    if (formData.option != "internship"){
      selectedOption = "Job Opportunity"
    }

    regSheet.appendRow([formData.fName, formData.lName, formData.email, selectedOption]);

    var bannerUrl = "https://drive.google.com/uc?export=view&id=1itBkBE-OYjkxJWLQ1kjUAseuGc2shVbA"


    const emailSignature = `
      

      <div style="font-family: 'Times New Roman', serif; color: rgb(65, 65, 65); max-width: 500px;">
        <div style="border-bottom: 1px solid rgb(65,65,65); padding-bottom: 4px;">
          <span style="color: rgb(64,158,255); font-size: 12px; font-weight: bold;">Jed Alain & Cazhia Reese Llava</span><br>
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

    MailApp.sendEmail({
      to: formData.email,
      name: "P20JECT YSES Programs Committee",
      subject: 'Confirmation: Participation in P20JECT YSES: PF/JF',
      htmlBody: `
      
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${bannerUrl}" alt="Event Banner" width="100%" style="max-width: 600px; border-radius: 10px;">
      </div>
      
      <p>Good day, Mr. // Ms. // Mx. ${formData.fName} ${formData.lName}!</p>

      ${emailBody}
      
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
