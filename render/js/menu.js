const electron = require('electron')

$(".mdl-checkbox").on("change", function() {
  if ($(this).hasClass("is-checked")) {
    electron.ipcRenderer.send('hint', $(this).attr('id') + ' enabled')
    $(this).children().first().attr("checked", true);
  } else {
    electron.ipcRenderer.send('hint', $(this).attr('id') + ' disabled')
    return $(this).children().first().removeAttr("checked");
  }
})