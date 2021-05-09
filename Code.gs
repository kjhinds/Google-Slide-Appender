function appendSlideToPresentationsInID(id) {
  var masterSlide = SlidesApp.getActivePresentation().getSelection().getCurrentPage().asSlide();
   presFolder = DriveApp.getFolderById(id); 
  var targetPresentations = presFolder.getFilesByType('application/vnd.google-apps.presentation');
  while (targetPresentations.hasNext()) {
    var targetPresentationID = targetPresentations.next().getId();
    var targetPresentation = SlidesApp.openById(targetPresentationID);
    targetPresentation.appendSlide(masterSlide);
  }
  SlidesApp.getUi().alert('Slides updated!');
}

function onOpen() {
  addMenu();
}

function onInstall() {
  addMenu();
}

function addMenu() {
  SlidesApp.getUi().createAddonMenu()
    .addItem('Choose Folder with Target Slideshows', 'chooseFolder')
    .addToUi();
}

function chooseFolder() {
  var response = SlidesApp.getUi().alert('Make sure you have the slide you want added selected!', SlidesApp.getUi().ButtonSet.YES_NO);

  // Process the user's response.
  if (response == SlidesApp.getUi().Button.YES) {
    showPicker();
  }
}

/**
 * Displays an HTML-service dialog in Google Sheets that contains client-side
 * JavaScript code for the Google Picker API.
 */
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile('Picker.html')
      .setWidth(600)
      .setHeight(425)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SlidesApp.getUi().showModalDialog(html, 'Select Folder');
}

function getOAuthToken() {
  return ScriptApp.getOAuthToken();
}
