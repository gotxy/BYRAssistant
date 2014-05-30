
function checkForTarget(tabId, changeInfo, tab) {
  if ((/^https?:\/\/(forum|bbs|bbs6)\.byr(\.edu)?\.cn\/.*$/.test(tab.url) || /^http:\/\/www\.newsmth\.net\/.*$/.test(tab.url)) 
	&& tab.status == "complete") {
    chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(checkForTarget);