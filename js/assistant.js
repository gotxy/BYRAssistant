/*
*  author gotone
*  version 0.1
*/

chrome.storage.sync.get({
    enableAutoPaging: true,
    enableBlacklist: true,
    blacklist: {}
}, function (items) {
    if (items.enableAutoPaging) {
        enableAutoPaging();
    }
    if (items.enableBlacklist) {
        enableBlacklist(items.blacklist);
    }
});

var isLoading = false;

function enableBlacklist(blacklist) {
    if (typeof blacklist == 'object') {
        filter(blacklist);
    } 
}

function filter(blacklist) {
    $('#body .b-content table tbody tr').each(function (idx, ele) {
        var authorCol = $('.title_12', this)[0];
        var author = $('a', authorCol).text();
        if (blacklist[author]) {
            $(this).remove();
        }
    });
}

function enableAutoPaging() {
    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            if (!isLoading) {
                autoload();
                $(window).scrollTop($(window).scrollTop()-1);
            }
        }
    });
}

function autoload() {
    var curUrl = location.href;
    var path = getPath(curUrl);

    switch (path) {
        case '#!board':
            loadArticles();
            return;
        case '#!article':
            loadPosts();
            return;
        default:
            console.log('no action @ ' + curUrl);
    }
}

function getPath(url) {
    var keyPaths = ['#!board', '#!article'];
    for (var i in keyPaths) {
        var path = keyPaths[i];
        if (url && url.indexOf(path) >= 0) {
            return path;
        }
    }
    return '';
}

function loadArticles() {
    var url = getUrlOfNextPage();

    if (!url) {
        return;
    }

    isLoading = true;

    $.get(url, function (data) {
        isLoading = false;

        var div = $('<div>').html(data);
        var prevPage = $('#body .b-content tbody')[0];
        var newPage = $('.b-content tbody', div)[0];
        $(prevPage).html($(prevPage).html() + $(newPage).html());

        var bottom = $('#body .t-pre-bottom')[0];
        var newBottom = $('.t-pre-bottom', div)[0];
        $(bottom).html($(newBottom).html());        
    });
}

function loadPosts() {
    var url = getUrlOfNextPage();
    if (url) {
        isLoading = true;
        addLoadingDiv();

        $.get(url, function (data) {
            isLoading = false;
            removeLoadingDiv();

            var div = $('<div>').html(data);
            var prevPage = $('#body div[class="b-content corner"]')[0];
            var newPage = $('.b-content.corner', div)[0];
            $(prevPage).html($(prevPage).html() + $(newPage).html());
            
            var head = $('#body div[class="t-pre"]')[0];
            var newHead = $('.t-pre', div)[0];

            $(head).html($(newHead).html());

            var bottom = $('#body div[class="t-pre-bottom"]')[0];
            var newBottom = $('.t-pre-bottom', div)[0];
            $(bottom).html($(newBottom).html());
        });
    }
}

function getUrlOfNextPage() {
    var nextPageUrl = '';

    var curPageLi = $('.t-pre-bottom ol .page-select')[0];
    var nextPageLi = curPageLi.nextSibling;
    if (nextPageLi) {
        nextPageUrl = nextPageLi.firstChild.href;
    }

    return nextPageUrl;
}

function addLoadingDiv() {
    var div = $('<div>');
    $(div).attr('id', 'loading-div').attr('class', 'a-wrap corner');
    $(div).html('<p style="text-align:center; color:#FFFFFF; background:#FF8C00">loading...</p>');

    var prevPage = $('#body .b-content.corner')[0];
    $(prevPage).append(div);
}

function removeLoadingDiv() {
    $('#loading-div').remove();
}