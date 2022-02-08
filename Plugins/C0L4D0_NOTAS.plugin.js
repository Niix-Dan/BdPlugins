/**
    * @name C0L4D0
    * @description Adiciona um bloco de notas linkado com site de compatilhamento de notas.
    * @version 0.0.1
    */

const request = require("request");

let t, b, uploading = false;
const config = {
    info: {
        name: "C0L4D0",
        authors: [
            {
                name: "Dan™#4020"
            }
        ],
        version: "0.0.1",
        description: "Adiciona um bloco de notas linkado com site de compatilhamento de notas.",
    }
};

module.exports = class {
    constructor() { this._config = config; }
    getName(){ return config.info.name }
    getDescription(){ return config.info.description }
    getAuthor(){ return config.info.authors[0].name }
    getVersion(){ return config.info.version }

    start() { 
        this.clearButtons();
        this.registerNotesBTN() 
    }
    load() { 
    }
    stop() {
        this.clearButtons();
    }

    onSwitch() {
        this.clearButtons();
        this.registerNotesBTN();
    }

    clearButtons() {
        if(b) {
            b.remove()
            b = null;
        }
    }

    saveToCOLADO() {
        if(uploading) return;
        uploading = true;

        function isEmptyOrSpaces(str) {
            return str === null || str.match(/^ *$/) !== null;
        }
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


        if(!textArea || !text || isEmptyOrSpaces(text) || text.trim() === "") {
            return BdApi.alert("Erro ao fazer o upload da mensagem!", "\n\n**Você não pode enviar uma nota em branco!**");
        }

        request('https://c0l4d0.ml/api/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        }, async (err, req, body) => {
            uploading = false;
            if(err) return BdApi.alert("Erro ao fazer o upload da mensagem!", "> **Um erro aconteceu ao tentar enviar essa mensagem aos servidores do C0L4D0!**");
            body = JSON.parse(body);

            console.log(body);

            BdApi.alert("Texto enviado com sucesso!", "**O seu texto foi enviado ao C0L4D0 com sucesso!**\n\n**C0L4D0: ~https://c0l4d0.ml/"+body.id+"**")
        })
    }

    registerNotesBTN() {
        const ChannelTextAreaButtons = BdApi.findModule(m => m.type && m.type.displayName === "ChannelTextAreaButtons")
        const ChannelTextAreaButton = BdApi.findModule(m => m.type?.displayName === "ChannelTextAreaButton");
        let d = `M449.362,32.681h-18.519c-4.513,0-8.17,3.657-8.17,8.17s3.657,8.17,8.17,8.17h10.349V495.66
            c-50.588,0-319.875,0-370.383-0.001V49.021h34.86v8.17c0,13.515,10.996,24.511,24.511,24.511
            c13.515,0,24.511-10.996,24.511-24.511v-8.17h34.86v8.17c0,13.515,10.996,24.511,24.511,24.511
            c13.515,0,24.511-10.996,24.511-24.511v-8.17h34.86v8.17c0,13.515,10.996,24.511,24.511,24.511s24.511-10.996,24.511-24.511v-8.17
            h34.86v8.17c0,13.515,10.996,24.511,24.511,24.511s24.511-10.996,24.511-24.511V24.511C406.332,10.996,395.336,0,381.821,0
            s-24.511,10.996-24.511,24.511v8.17h-34.86v-8.17C322.451,10.996,311.455,0,297.94,0S273.43,10.996,273.43,24.511v8.17h-34.86
            v-8.17C238.57,10.996,227.574,0,214.06,0c-13.515,0-24.511,10.996-24.511,24.511v8.17h-34.86v-8.17
            C154.689,10.996,143.693,0,130.179,0c-13.515,0-24.511,10.996-24.511,24.511v8.17h-43.03c-4.513,0-8.17,3.657-8.17,8.17v462.978
            c0,2.167,0.861,4.244,2.392,5.778c2.393,2.392,3.724,2.392,10.121,2.392L449.362,512c4.513,0,8.17-3.657,8.17-8.17V40.851
            C457.532,36.338,453.875,32.681,449.362,32.681z M373.651,24.511c0-4.506,3.665-8.17,8.17-8.17c4.506,0,8.17,3.665,8.17,8.17
            v32.681c0,4.506-3.665,8.17-8.17,8.17c-4.506,0-8.17-3.665-8.17-8.17V24.511z M289.77,24.511c0-4.506,3.665-8.17,8.17-8.17
            c4.506,0,8.17,3.665,8.17,8.17v32.681c0,4.506-3.665,8.17-8.17,8.17c-4.506,0-8.17-3.665-8.17-8.17V24.511z M205.889,24.511
            c0-4.506,3.665-8.17,8.17-8.17s8.17,3.665,8.17,8.17v32.681c0,4.506-3.665,8.17-8.17,8.17s-8.17-3.665-8.17-8.17V24.511z
             M122.009,24.511c0-4.506,3.665-8.17,8.17-8.17c4.506,0,8.17,3.665,8.17,8.17v32.681c0,4.506-3.665,8.17-8.17,8.17
            c-4.506,0-8.17-3.665-8.17-8.17V24.511z`

        try {
            BdApi.Patcher.after(config.info.name, ChannelTextAreaButtons, "type", (_, [props], ret) => {
                try {
                    let path = BdApi.React.createElement("path", { 
                        fill: "currentColor", 
                        "fill-rule": "evenodd", 
                        "clip-rule": "evenodd", 
                        d 
                    });
                    let svg = BdApi.React.createElement("svg", {width:24, height:24, viewBox:"0 0 512 512"}, path)
                    let button = BdApi.React.createElement("div", {style: {minWidth: "50px"}},svg);
                    let buttonContainer = BdApi.React.createElement(ChannelTextAreaButton, { onClick: this.saveToCOLADO }, button);

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