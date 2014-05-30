
function save_options() {
    var blacklist = $('#blacklist').val();
    var vals = {
        blacklist: {}
    };
    var ids = blacklist.split(',');
    for (var i in ids) {
        vals.blacklist[ids[i]] = 1;
    }
    chrome.storage.sync.set(vals, function() {

    });
}

function restore_options() {
    chrome.storage.sync.get({
        blacklist: {}
    }, function (items) {
        var val = '';
        for (var k in items.blacklist) {
            if (!val) {
                val = k;        
            } else {
                val += ',' + k;
            }
        }
        $('#blacklist').val(val);
    });
}

$(document).on('DOMContentLoaded', restore_options);
$('#save').click(save_options);