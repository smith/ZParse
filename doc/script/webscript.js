/**
 * @author raid
 */

var ScrollLinks = {
    currentHash: false,
    start: function(){
        this.scroll = new Fx.Scroll(window, {duration: 1000, onComplete: function(){ScrollLinks.end();}});
		this.allinks = document.getElementsByTagName('a');
        for (i=0; i<this.allinks.length; i++){
            var lnk = this.allinks[i];
            if ((lnk.href && lnk.href.indexOf('#') != -1) && ( (lnk.pathname == location.pathname) || ('/'+lnk.pathname == location.pathname) ) && (lnk.search == location.search)) {
                lnk.onclick = function(){
                    this.initialHref = this.href;
                    this.initialHash = this.hash;
                    this.href = "javascript:void(0)";
                    setTimeout(function(){this.href = this.initialHref;}.bind(this), 200);
                    ScrollLinks.click(this);
                }
            }
        }
    },

    click: function(link){
        this.currentHash = link.initialHash.substr(1);
        if (this.currentHash) {
            for (j=0; j<this.allinks.length; j++){
                if (this.allinks[j].name == this.currentHash){
                    this.scroll.toElement(this.allinks[j]);
                    break;
                }
            }
        }
    },

    end: function(){
        window.location.href = "#"+this.currentHash;
        this.currentHash = false;
    }
}

window.onload = function() {
	dp.SyntaxHighlighter.HighlightAll('code', true, false);
	ScrollLinks.start();
}