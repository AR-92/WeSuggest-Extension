class instaFollow {
    constructor(opt) {
        this.username = opt.username;
        this.profile = undefined;
        this.init();
        this.isTag = false;
        this.isInfo = false;
        this.istoggleInfo = false;
        this.istoggleTag = false;
    }
    init() {
        this.getProfile(this.username).then((s) => {
            this.profile = s;
            this.storeLocally(s);
        });
        this.profile = this.getLocalData();
        // this.html();
        // this.insert();
     
    };
    inserter(){
        if( this.profile){

            this.insertTag();
            this.insertInfo();
            this.showTag();
        }
    }
    getProfile() {
        return new Promise((resolve, reject) => {
            try {
                fetch(`https://www.instagram.com/${this.username}/?__a=1`)
                    .then(response => response.json())
                    .then(data => {
                        resolve({
                            biography: data.graphql.user.biography,
                            external_url: data.graphql.user.external_url,
                            full_name: data.graphql.user.full_name,
                            profile_pic_url: data.graphql.user.profile_pic_url,
                            profile_pic_url_hd: data.graphql.user.profile_pic_url_hd,
                            username: data.graphql.user.username,
                            follow: data.graphql.user.edge_follow.count,
                            followed_by: data.graphql.user.edge_followed_by.count,
                            id: data.graphql.user.id,
                        });
                    })
            } catch {
                console.error("instaFollow: can't get instagram profile")
            }
        })
    };
    storeLocally(obj) {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("instaFollow", JSON.stringify(obj));
        } else {
            console.error("Sorry !  Browser Does Not Support Local Storage")
        }
    };
    getLocalData() {
        if (localStorage.getItem("instaFollow")) {
            return JSON.parse(localStorage.getItem("instaFollow"));
        } else {
            return undefined
        }
    };
    showTag() {
        this.tagImg.style.visibility = "visible"
        anime({
            targets: this.tagImg,
            right: 10,
            opacity: 0.3,
            easing: 'easeInOutQuad',
            complete: () => {
                this.istoggleTag = true;
            }
        });
    }
    hideTag() {
        anime({
            targets: this.tagImg,
            right: -1000,
            opacity: 0,
            easing: 'easeInOutQuad',
            complete: () => {
                this.tagImg.style.visibility = "hidden";
                this.istoggleTag = false;

            }
        });
    }

    showInfo() {
        this.tagAnchor.style.visibility = "visible"
        anime({
            targets: this.tagAnchor,
            right: 10,
            opacity: 1,
            easing: 'easeInOutQuad',
            complete: () => {
                this.istoggleInfo = true;
            }
        });
    }
    hideInfo() {
        anime({
            targets: this.tagAnchor,
            right: -1000,
            opacity: 0,
            easing: 'easeInOutQuad',
            complete: () => {
                this.tagAnchor.style.visibility = "hidden";
                this.istoggleInfo = false;

            }
        });
    }
    onlyInfo(){
        this.showInfo();
        this.hideTag();
    }
    onlyTag(){
        this.showTag();
        this.hideInfo();
    }
    disappersInfo(time) {
        setTimeout(() => {
            this.onlyTag();
        }, time);
    }
    toggleTag() {
        if (this.istoggleTag !== true) {
            this.showTag();
        } else {
            this.hideTag();

        }
    }
    toggleInfo() {
        if (this.istoggleInfo !== true) {
            this.showInfo();
        } else {
            this.hideInfo();

        }
    }
    auto() {
        this.tagImg.addEventListener("click", () => {
            this.disappersInfo(3000);
            this.onlyInfo();

        });
    }
    insert() {
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', this.html());
    }
    insertTag() {
        if (this.isTag !== true) {
            var html = `<img src="${this.profile.profile_pic_url}" id="tagImg" 
            style="z-index: 200;
            right:-1000;visibility:hidden;width:55px;border-radius:10px;position:fixed;bottom:10px;right:10px;padding:0px;color:white;border-radius:10px;font-size:11px;">`;
            document.getElementById('con_instaFollow').insertAdjacentHTML('beforeend', html);
            this.isTag = true;
            this.tagImg = document.getElementById("tagImg");
            this.auto();
        } else {
            console.log("tag is already inserted !");
        }
    }
    insertInfo() {
        if (this.isInfo !== true) {
            var infoStyle = "z-index: 200;right:-1000;visibility:hidden;position:fixed;bottom:10px;right:10px;background-color:black;padding:0px;color:white;padding-right: 20px;border-radius:10px;font-size:11px;";
            var bio = this.profile.biography.split('\n');
            var p = ' ';
            p += `<b>${this.profile.full_name}</b> ( @${this.profile.username} )<br>`;
            bio.forEach(element => {
                p += `
            ${element}
            `;
            });
            var html = `
        <a type="a" id="tagAnchor" target="_blank" href="https://www.instagram.com/${this.username}/" style="${infoStyle};">
        <img src="${this.profile.profile_pic_url}" style="width:55px;border-radius:10px;">
        <div id="tagInfo" style="max-width:400px;float:right;margin-left:10px;margin-top:3px;">${p}</div>
        </a>
        `;
            document.getElementById('con_instaFollow').insertAdjacentHTML('beforeend', html);
            this.isInfo = true;
            this.tagAnchor = document.getElementById("tagAnchor");
            this.tagInfo = document.getElementById("tagInfo");

        } else {
            console.log("info is already inserted !");
        }
    }
    html() {
        var style = "position:fixed;bottom:10px;right:10px;background-color:black;padding:0px;color:white;padding-right: 20px;border-radius:10px;font-size:11px;";
        var bio = this.profile.biography.split('\n');
        var p = ' ';
        p += `<b>${this.profile.full_name}</b> ( @${this.profile.username} )<br>`;
        bio.forEach(element => {
            p += `
            ${element}
            `;
        });
        return ` 
        <div>
        <img src="${this.profile.profile_pic_url}" id="tagImg" 
            style="width:55px;border-radius:10px;position:fixed;bottom:10px;right:10px;padding:0px;color:white;border-radius:10px;font-size:11px;">
        <a type="a" id="tagAnchor" target="_blank" href="https://www.instagram.com/${this.username}/" style="${style};"  class="animate__animated">
        <img src="${this.profile.profile_pic_url}" style="width:55px;border-radius:10px;">
        <div id="tagInfo" style="max-width:400px;float:right;margin-left:10px;margin-top:3px;">${p}</div>
        </a>
        </div>
        `;
    }
}