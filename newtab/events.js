var gooogler = new googler();
var instagramTager = new instaFollow({ username: '_rana.g' });
gooogler.init();
instagramTager.inserter();
storeSettings.on("settings", ({ general,timeDate,background }) => {
    gooogler.gettopsites();
    gooogler.getbookmarks();
    gooogler.getTimeDate("timedateBlock");
    gooogler.updateSugess();
    general.search ? document.getElementById("googler").style.display = "block" : document.getElementById("googler").style.display = "none";
    general.suggestion ? document.getElementById("suggesstions").style.display = "block" : document.getElementById("suggesstions").style.display = "none";
    general.bookmarks ? document.getElementById("con_bookmarks").style.display = "block" : document.getElementById("con_bookmarks").style.display = "none";
    general.topSites ? document.getElementById("con_topsites").style.display = "block" : document.getElementById("con_topsites").style.display = "none";
    general.contact_Info ? document.getElementById("con_instaFollow").style.display = "block" : document.getElementById("con_instaFollow").style.display = "none";
    timeDate.show ? document.getElementById("timedateBlock").style.display = "block" : document.getElementById("timedateBlock").style.display = "none";
    document.getElementById("container").style['column-count'] = general.col_count
    if(general.dark_mode) {
        document.documentElement.classList.remove("notinverter");
        document.documentElement.classList.add("inverter");
    } else{
        document.documentElement.classList.remove("inverter");
        document.documentElement.classList.add("notinverter");
    } 
    // setTimeout(() => {
        
    //     // background.show ? document.getElementById("defaultCanvas0").style.display = "block" : document.getElementById("defaultCanvas0").style.display = "none";
    // }, 1000);
});
storeSettings.emit("settings", ({}) => ({}));

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case 'settings':
            msg.obj.general.search ? document.getElementById("googler").style.display = "block" : document.getElementById("googler").style.display = "none";
            msg.obj.general.suggestion ? document.getElementById("suggesstions").style.display = "block" : document.getElementById("suggesstions").style.display = "none";
            msg.obj.general.bookmarks ? document.getElementById("con_bookmarks").style.display = "block" : document.getElementById("con_bookmarks").style.display = "none";
            msg.obj.general.topSites ? document.getElementById("con_topsites").style.display = "block" : document.getElementById("con_topsites").style.display = "none";
            msg.obj.general.contact_Info ? document.getElementById("con_instaFollow").style.display = "block" : document.getElementById("con_instaFollow").style.display = "none";
            msg.obj.timeDate.show ? document.getElementById("timedateBlock").style.display = "block" : document.getElementById("timedateBlock").style.display = "none";
            // msg.obj.background.show ? document.getElementById("defaultCanvas0").style.display = "block" : document.getElementById("defaultCanvas0").style.display = "none";

            document.getElementById("container").style['column-count'] = msg.obj.general.col_count
            storeSettings.emit("settings", ({}) => ({}));
            response("we have responded >>>>>");
            break;
        
    }

});

storeSettings.on("time", ({timeDate}) => {
    if(timeDate.show){
    // console.log("time ",timeDate)
        gooogler.getTimeDate("timedateBlock");
    }
})

setInterval(() => {
storeSettings.emit("time", () => ({}));
}, 2000);