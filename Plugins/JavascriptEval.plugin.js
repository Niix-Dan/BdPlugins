/**
 * @name JavascriptEval
 * @description Adds an Compiler that executes javascript codes directly in your discord
 * @version 0.0.1
*/


let t, b;
const config = {
    info: {
        name: "JavascriptEval",
        authors: [
            {
                name: "Dan™#4020"
            }
        ],
        version: "0.0.1",
        description: 'Adds an Compiler that executes javascript codes directly in your discord',
    }
};

module.exports = class {
    constructor() { this._config = config; this.uploading; }
    getName(){ return config.info.name }
    getDescription(){ return config.info.description }
    getAuthor(){ return config.info.authors[0].name }
    getVersion(){ return config.info.version }


    start() {
        this.clearButtons();
        this.registerButtons() 
    }
    load() { 
    }
    stop() {
        this.clearButtons();
    }
    onSwitch() {
        this.clearButtons();
        this.registerButtons();
    }

    clearButtons() {
        if(b) {
            b.remove(); 
            b = null;
        }
    }


    Click() {
        let span = document.querySelectorAll("span");
        let textArea;
        let text = [];

        for(let i = 0 ; i < span.length ; i++) {
            let obj = span[i];
            if(obj.getAttribute("data-slate-string")) {
                textArea = obj;
                text.push(textArea.textContent || textArea.value);
            }
        }
        text = text.join("\n");

        let evaled;

        try {
            evaled = eval(text);

            BdApi.alert("Eval", ""+evaled);
        } catch(err) {
            BdApi.showToast(err, {type: "error"});
        }
    }

    registerButtons() {
        const ChannelTextAreaButtons = BdApi.findModule(m => m.type && m.type.displayName === "ChannelTextAreaButtons")
        const ChannelTextAreaButton = BdApi.findModule(m => m.type?.displayName === "ChannelTextAreaButton");
        let d = `M25.323,1.948H1.949C0.871,1.948,0,2.816,0,3.894v19.481c0,1.074,0.871,1.946,1.949,1.946h23.374
        c1.071,0,1.946-0.872,1.946-1.946V3.894C27.269,2.816,26.395,1.948,25.323,1.948z M9.315,3.411c0.536,0,0.971,0.431,0.971,0.973
        c0,0.537-0.435,0.973-0.971,0.973c-0.538,0-0.978-0.436-0.978-0.973C8.337,3.842,8.777,3.411,9.315,3.411z M6.333,3.411
        c0.535,0,0.973,0.431,0.973,0.973c0,0.537-0.438,0.973-0.973,0.973c-0.541,0-0.977-0.436-0.977-0.973
        C5.356,3.842,5.792,3.411,6.333,3.411z M3.408,3.411c0.539,0,0.974,0.431,0.974,0.973c0,0.537-0.435,0.973-0.974,0.973
        c-0.536,0-0.972-0.436-0.972-0.973C2.436,3.842,2.872,3.411,3.408,3.411z M25.323,23.376H1.949V6.839h23.374V23.376z`

        try {
            BdApi.Patcher.after(config.info.name, ChannelTextAreaButtons, "type", (_, [props], ret) => {
                try {
                    let path = BdApi.React.createElement("path", { 
                        fill: "currentColor", 
                        "fill-rule": "evenodd", 
                        "clip-rule": "evenodd", 
                        d 
                    });
                    let svg = BdApi.React.createElement("svg", {width:24, height:24, viewBox:"0 0 28 28"}, path)
                    let button = BdApi.React.createElement("div", {style: {minWidth: "50px"}},svg);
                    let buttonContainer = BdApi.React.createElement(ChannelTextAreaButton, { onClick: this.Click }, button);

                    b = buttonContainer;
                    ret.props.children.push(buttonContainer)
                } catch(err) {
                    BdApi.showToast(err, {type: "error"});
                }
            })
        } catch(err) {
            BdApi.showToast(err, {type: "error"});
        }
    }
}