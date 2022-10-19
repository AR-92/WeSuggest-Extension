class googler {
    constructor() {
        this.winh = window.screen.height;
        this.winw = window.screen.width;
        this.gap = 10;
        this.stringLeng = 10;
        this.style = `
        width: -webkit-fill-available; 
        background-color: white;
        padding: 15px;
        border-radius: 20px;
        text-align: center;
        `;
        this.input = `
        display: block;
        margin-bottom: 10px;
        border-radius:20px;
        margin-top: 10px;
        width: 87%;
        height: calc(1em);
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        outline: 0;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        `;
        this.html = `
        <div id="googler" class="card" style="${this.style}">
        <img src="../img/glogocolor.png" style="width: 180px;">
        <input type="text" style="${this.input}" placeholder="  Search Here :)" id="search" autocomplete="off">
        </div>
        `;
        this.html = `
        <div id="container" class="scrollbar cols">
        ${this.html}
        <div id="suggesstions">
        <div  id="sug"></div>
        </div>
        <div id="timedateBlock"></div>
        <div id="con_topsites"></div>
        <div id="con_bookmarks"></div>
        <div id="con_instaFollow"></div>
        </div>
        `;
        this.suggesstionsArray = [];

    }
    getTimeDate(id) {
        document.getElementById(id).innerHTML = ``;
        var gettimedate = moment().format("MMMM Do YYYY, h:mm:ss a");
        var getday = moment().format("dddd");
        var html = `
      <div style=" width: min-content;
      padding: 15px;font-weight: 600;text-align: center;" class="box card ">
      <div style="word-wrap: break-word;font-size: 40px;">
      ${getday}
      </div>
      <div style="word-wrap: break-word;color:green;    font-size: 13px;">
      ${gettimedate}
      </div>
      </div>
      </div>
      `;
        document.getElementById(id).insertAdjacentHTML("beforeend", html);
    }
    gettopsites() {
        var topsite = new topsites();
        let store = storeSettings.getStore("settings");
        let count = store.general.topSites_count;
        if (topsite.sites.length > count) topsite.sites.splice(count);
        var html = ``;
        if (topsite.sites.length > 0) {
            html += `<div class="box" style="    width: -webkit-fill-available;
      text-align: center;"><div class="card" style="    background-color: bisque;
      padding: 10px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 20px;">Top Sites</div></div>`;
        }
        for (var i = 0; i < topsite.sites.length; i++) {
            var tt = topsite.sites[i].url
                .replace("http://", "")
                .replace("https://", "")
                .replace("www.", "www.")
                .replace(".com", ".com")
                .split(/[/?#]/)[0];
            html += `
      <a style="margin: 1px;max-width:200px;  text-overflow: ellipsis;
      background-color: bisque;
      padding: 15px;text-align: center;" class="box card listitem" href="${
        topsite.sites[i].url
      }">
      <img draggable="false" src="chrome://favicon/https://${encodeURIComponent(
        tt
      )}">
      <div style="word-wrap: break-word;">
      ${topsite.sites[i].title.slice(0, this.stringLeng)}
      </div>
      <div style="word-wrap: break-word;color:green;">
      ${topsite.sites[i].domain.slice(0, this.stringLeng)}
      </div>
      </a>`;
        }
        document.getElementById("con_topsites").innerHTML = ``;
        document
            .getElementById("con_topsites")
            .insertAdjacentHTML("beforeend", html);
    }
    getbookmarks() {
        var bookmarks = new cBookmarks();
        let store = storeSettings.getStore("settings");
        let count = store.general.bookmarks_count;
        if (bookmarks.arry.length > count) bookmarks.arry.splice(count);

        var html = ``;
        if (bookmarks.arry.length > 0) {
            html += `<div class="box " style="    width: -webkit-fill-available;
      text-align: center;"><div class="card" style="    background-color: honeydew; margin-top: 20px;
      width: -webkit-fill-available;
      /* width: 100%; */
      padding: 10px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 20px;">Bookmarks</div></div>`;
        }
        for (var i = 0; i < bookmarks.arry.length; i++) {
            var tt = bookmarks.arry[i].url
                .replace("http://", "")
                .replace("https://", "")
                .split(/[/?#]/)[0];
            html += `<a style="margin: 1px;  text-overflow: ellipsis;background-color: honeydew;
      padding: 15px;text-align: center;max-width:200px" class="box card listitem" href="${bookmarks.arry[i].url}">
      <img draggable="false" src="chrome://favicon/https://${encodeURIComponent(tt)}">
      <div style="word-wrap: break-word;">
      ${bookmarks.arry[i].title.slice(0, this.stringLeng)}
      </div>
      <div style="word-wrap: break-word;color:green;">
      ${bookmarks.arry[i].domain.slice(0, this.stringLeng)}
      </div>
      </a>`;
        }
        document.getElementById("con_bookmarks").innerHTML = ``;

        document
            .getElementById("con_bookmarks")
            .insertAdjacentHTML("beforeend", html);
    }
    async getSuggestion(value) {
        let y = new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log(value.toLowerCase())
                // var url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${value}`;
                var url = `https://www.google.com/complete/search?client=opera&q=${value.toLowerCase()}`;

                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        resolve(data);
                    });
            }, 10);
        });
        return await y;
    }
    makelist(data) {
        var html = ``;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                html += `<li class="card box" style="
    position: relative;
    display: block;
    padding: .6rem 1.25rem;
    font-size: 17px;
    "><a class="listitem" href="https://www.google.com/search?q=${data[i]}">${data[i]}</a></li>`;
            }
        }
        return html;
    }
    updateSugess() {
        let store = storeSettings.getStore("settings");
        let count = store.general.suggestion_count;
        let arry = this.suggesstionsArray.slice();
        if (this.suggesstionsArray.length > count) arry.splice(count);
        var rrrrrr = this.makelist(arry);
        document.getElementById("sug").innerHTML = rrrrrr;
    }
    async chainer(value) {
        this.suggesstionsArray = [];

        var ccccc = value;
        var firstlist = [];
        for (var i = 0; i < 10; i++) {
            if (ccccc) {
                var tttt = await this.getSuggestion(ccccc);
                if (i === 0) firstlist = tttt;
                ccccc = firstlist[1][i];
                tttt[1].forEach((element) => {
                    this.suggesstionsArray.push(element);
        this.updateSugess()

                });
            }
        }
        // this.updateSugess()


    }
    debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }
    init() {
        document.getElementById("application").innerHTML = ``;
        document
            .getElementsByTagName("body")[0]
            .insertAdjacentHTML("beforeend", this.html);
        document.getElementById("application");
        var effi = this.debounce(() => {
            var search = document.getElementById("search").value;
            if (search.length >= 1) {
                this.chainer(encodeURIComponent(search));
            } else {
                document.getElementById("sug").innerHTML = "";
                document.getElementById("sug").classList.remove("card");
                this.suggesstionsArray = [];

            }
        }, 250);
        document.addEventListener("keyup", (event) => {
            event.preventDefault();
            if (event.keyCode === 13) {
                var search = document.getElementById("search").value;
                window.location.href = "https://www.google.com/search?q=" + search;
            }
        });
        document.addEventListener("keyup", effi);
        document.getElementById("search").addEventListener('focus', (event) => {
            event.target.placeholder=""

            console.log("i am foucus")
        });
        document.getElementById("search").addEventListener('blur', (event) => {
            event.target.placeholder="Search Here :)"
            console.log("i am blur", event)
        });
    }
}