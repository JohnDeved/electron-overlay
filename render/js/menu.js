const electron = require('electron')

$(".mdl-checkbox").on("change", function() {
  if ($(this).hasClass("is-checked")) {
    electron.ipcRenderer.send('hint', {text: $(this).attr('id') + ' enabled', type: 'success'})
    $(this).children().first().attr("checked", true);
  } else {
    electron.ipcRenderer.send('hint', {text: $(this).attr('id') + ' disabled', type: 'error'})
    return $(this).children().first().removeAttr("checked");
  }
})