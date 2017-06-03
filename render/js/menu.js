$(document).ready( function() {
  $('.pmd-tabs').pmdTab();
});

const electron = require('electron')

$(".mdl-checkbox").on("change", function() {
  if ($(this).hasClass("is-checked")) {
    electron.ipcRenderer.send('hint', {text: $(this).attr('id') + ' enabled', type: 'success'})
    electron.ipcRenderer.send('toggle', {command: $(this).attr('id'), value: true})
    $(this).children().first().attr("checked", true);
  } else {
    electron.ipcRenderer.send('hint', {text: $(this).attr('id') + ' disabled', type: 'error'})
    electron.ipcRenderer.send('toggle', {command: $(this).attr('id'), value: false})
    $(this).children().first().removeAttr("checked");
  }
})