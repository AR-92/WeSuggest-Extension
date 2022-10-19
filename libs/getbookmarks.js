class cBookmarks {
    constructor() {
        this.bookmarks = [];
        this.arry=[];
        this.init();
        this.converttoArray();
    }
    init() {
        this.chromeGetbookmarks()
        this.bookmarks = this.getlocally();
    }
    saveLocally(Array) {
        localStorage.setItem("bookmarks", JSON.stringify(Array));
    }
    reduceDomain(value){
        return value.replace('http://','').replace('https://','').replace('www.','').replace('.com','').split(/[/?#]/)[0];
    }
    simpler(input){
        for(var i=0;i<input.length;i++){
            if(typeof input[i]==='object'){
                if(input[i].children){
                    this.simpler(input[i].children)
                }else{
                    input[i].domain=this.reduceDomain(input[i].url)
                    this.arry.push(input[i])  
                }

            }
        }
    }
    converttoArray(){
        var fullobj=this.bookmarks;
        this.simpler(fullobj);
    }
    getlocally() {
        if (localStorage.getItem("bookmarks")) {
            return JSON.parse(localStorage.getItem("bookmarks"));
        } else {
            return []
        }
    }
    chromeGetbookmarks() {
        chrome.runtime.sendMessage({ type: 'getbookmarks' }, (response) => {
            if (response) {
                this.saveLocally(response);
                this.bookmarks = this.getlocally();
            }
        });
    }
}