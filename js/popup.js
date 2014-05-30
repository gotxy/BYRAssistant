
function restore_options() {
    chrome.storage.sync.get({
        enableAutoPaging: true,
        enableBlacklist: true
    }, function(items) {
        $('#auto-paging').attr('checked', items.enableAutoPaging);
        $('#blacklist').attr('checked', items.enableBlacklist);
    });
}

function save_options() {
    var apEnabled = $('#auto-paging').is(':checked');
    var blEnabled = $('#blacklist').is(':checked');

    chrome.storage.sync.set({
        enableAutoPaging: apEnabled,
        enableBlacklist: blEnabled
    }, function() {
        window.close();
    });
}

$(document).on('DOMContentLoaded', restore_options);
$('#save').click(save_options);
$('#open-option').click(function () {
    chrome.tabs.create({url: "../html/options.html"});
});