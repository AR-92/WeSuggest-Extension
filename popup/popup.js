storeSettings.on("settings", ({ general, timeDate ,background}) => {
    var set = {
        general: general,
        timeDate: timeDate,
        background: background,
    }
    console.log("event ran ",set);
    document.getElementById("on-off-switch9").checked = set.general.dark_mode;
    document.getElementById("on-off-switch1").checked = set.general.search;
    document.getElementById("on-off-switch2").checked = set.general.suggestion;
    document.getElementById("on-off-switch3").checked = set.timeDate.show;
    document.getElementById("on-off-switch4").checked = set.general.bookmarks;
    document.getElementById("on-off-switch5").checked = set.general.topSites;

    document.getElementById("on-off-switch7").checked = set.general.contact_Info;
    document.getElementById("on-off-switch8").checked = set.background.show;

    document.getElementById("suggestion_range").value = general.suggestion_count;
    document.getElementById("topsites_range").value = general.topSites_count;
    document.getElementById("bookmarks_range").value = general.bookmarks_count;
    document.getElementById("col_range").value = general.col_count;

    set.general.search ? document.getElementById("con_search").style.display="block" : document.getElementById("con_search").style.display="none";
    set.general.bookmarks ? document.getElementById("con_bookmarks").style.display="block" : document.getElementById("con_bookmarks").style.display="none";
    set.general.topSites ? document.getElementById("con_topsites").style.display="block" : document.getElementById("con_topsites").style.display="none";
});
        storeSettings.on("sender", ({ general, timeDate,background }) => {
            var set = {
                general: general,
                timeDate: timeDate,
                background: background,
            }
            chrome.runtime.sendMessage({ type: 'settings',obj:set }, (response) => {});
            return set;
        });
storeSettings.emit("settings", ({}) => ({}));
storeSettings.emit("sender", ({}) => ({}));

function h(value,type){
    storeSettings.emit("sender", ({ general, timeDate,background}) => {
        if(type==="gen"){
            var t = value
            general = {...general, ...t }
            return { general }
        }
        if(type==="tim"){
            var t = value
            timeDate = {...timeDate, ...t }
            return { timeDate }
        }
        if(type==="bac"){
            var t = value
            background = {...background, ...t }
            return { background }
        }
    });
}
document.getElementById("on-off-switch9").addEventListener('click', (x) => {
    h({ dark_mode: x.target.checked},"gen");
});
document.getElementById("on-off-switch1").addEventListener('click', (x) => {
    h({ search: x.target.checked},"gen");
    x.target.checked ? document.getElementById("con_search").style.display="block" : document.getElementById("con_search").style.display="none";
});
document.getElementById("on-off-switch2").addEventListener('click', (x) => {
    h({ suggestion: x.target.checked},"gen")
});
document.getElementById("on-off-switch3").addEventListener('click', (x) => {
    h({ show: x.target.checked},"tim")
});
document.getElementById("on-off-switch4").addEventListener('click', (x) => {
    h({ bookmarks: x.target.checked},"gen")
    x.target.checked ? document.getElementById("con_bookmarks").style.display="block" : document.getElementById("con_bookmarks").style.display="none";
});
document.getElementById("on-off-switch5").addEventListener('click', (x) => {
    h({ topSites: x.target.checked},"gen")
    x.target.checked ? document.getElementById("con_topsites").style.display="block" : document.getElementById("con_topsites").style.display="none";
});

document.getElementById("on-off-switch7").addEventListener('click', (x) => {
    h({ contact_Info: x.target.checked},"gen")
});
document.getElementById("on-off-switch8").addEventListener('click', (x) => {
    h({ show: x.target.checked},"bac")
});

document.getElementById("suggestion_range").addEventListener('change', (x) => {
    h({ suggestion_count: x.target.value},"gen")
});
document.getElementById("topsites_range").addEventListener('change', (x) => {
    h({ topSites_count: x.target.value},"gen")
});
document.getElementById("bookmarks_range").addEventListener('change', (x) => {
    h({ bookmarks_count: x.target.value},"gen")
});
document.getElementById("col_range").addEventListener('change', (x) => {
    h({ col_count: x.target.value},"gen")
});

document.getElementById("defaul_btn").addEventListener('click', () => {
    storeSettings.restoreDefault();
    storeSettings.emit("settings", ({}) => ({}));
    storeSettings.emit("sender", ({}) => ({}));
});