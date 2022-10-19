var getRecent;
var getbookmarks;

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case 'getrecent':
            chrome.topSites.get((x) => {
                getRecent = x
              });
              response(getRecent);
            break;
            case 'getbookmarks':
              chrome.bookmarks.getTree((items) => {
                getbookmarks = items
              });
              response(getbookmarks);
              break;
    }
});
