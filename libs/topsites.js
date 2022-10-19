
class topsites{
    constructor(){
        this.sites=[];
        this.init();
    }
    init(){
        this.chromeGetsites()
        this.sites=this.getlocally();
    }
    reduceDomain(value){
        var t=value
        for(var i=0;i<value.length;i++){
            t[i].domain = value[i].url.replace('http://','').replace('https://','').replace('www.','').replace('.com','').split(/[/?#]/)[0];
        }
        return t
    }
    saveLocally(sitesArray){
        localStorage.setItem("topsites", JSON.stringify(sitesArray));
    }
    getlocally(){
        if (localStorage.getItem("topsites")) {
            return JSON.parse(localStorage.getItem("topsites"));
        } else {
            return []
        }
    }
    chromeGetsites(){
        chrome.runtime.sendMessage({type: 'getrecent'}, (response) => {
            if (response) {
            this.saveLocally(this.reduceDomain(response) );
            this.sites=this.getlocally();
            }
        });
    }
}