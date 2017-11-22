class Template {
    constructor() {
        this.path = './filters/removeBoilerplate.html';
    }
}
class AutForm {
    constructor() {
        var btn;
        var here = this;
        var remove;
        document.addEventListener("DOMContentLoaded", function (doc) {
            document.querySelector('form').addEventListener('change', function (event) {
                var elem = event.target;
                if (elem.value == "file") {
                    here.createFileForm();
                }
                else {
                    here.restoreCounterForm();
                }
            });
            document.querySelector('body').addEventListener('click', function (event) {
                var elem = event.target;
                if (elem.className == 'remove') {
                    console.log(elem.id);
                    here.removeFilter(elem.id);
                }
                switch (elem.id) {
                    case 'filter': {
                        here.addFilterForm();
                        break;
                    }
                    case 'domain':
                    case 'url':
                    case 'keyword':
                        {
                            here.addFilter(elem.id);
                            break;
                        }
                    case 'language': {
                        var langid = document.getElementById('languageinput');
                        here.addFilter(elem.id, langid.options[langid.selectedIndex].value);
                        break;
                    }
                    case 'copy': {
                        here.copyToClipboard('code');
                        break;
                    }
                    case 'scriptify': {
                        here.createScript();
                        break;
                    }
                    case 'date': {
                        var dateval = "";
                        var date = document.getElementById('dateinput').value;
                        if (date.length == 4) {
                            dateval = 'YYYY';
                        }
                        else if (date.length == 6) {
                            dateval = 'YYYYMM';
                        }
                        else if (date.length == 8) {
                            dateval = 'YYYYMMDD';
                        }
                        else {
                            document.getElementById('error').innerHTML = `
                Error:  A date may have only 4, 6 or 8 characters (YYYY, YYYYMM, or YYYYMMDD)`;
                        }
                        var value = date + '", ' + dateval;
                        here.addFilter(elem.id, value);
                        break;
                    }
                    default: {
                        // protect against misuse.
                    }
                }
            });
        });
    }
    restoreCounterForm() {
        this.clearForm("output_text");
        var counterform = document.getElementById('output_text');
        counterform.innerHTML = `<label>Take this many:</label>
    <input id="take_output" type="number" min=3 max=1000 value=10></input>`;
    }
    createFileForm() {
        this.clearForm("output_text");
        var fileform = document.getElementById('output_text');
        fileform.innerHTML = `<label>Enter the file path
    for your output text.</label>
    <br /><input id="take_output" size="30"> </input>`;
    }
    setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
    clearForm(id) {
        var filterform = document.getElementById(id);
        while (filterform.firstChild) {
            filterform.removeChild(filterform.firstChild);
        }
    }
    addFilter(name, value = "") {
        let filters = document.getElementById('filters');
        if (value == "") {
            value = document.getElementById(name + 'input').value;
        }
        this.clearForm('filterform');
        let div = filters.appendChild(document.createElement("div"));
        let id = filters.getElementsByClassName('remove').length;
        this.setAttributes(div, { "id": id,
            "class": name + "Filter",
            "draggable": true });
        div.innerHTML = "Keep this " + name + ": ";
        div.appendChild(document.createElement('span')).innerHTML = value;
        var button = div.appendChild(document.createElement('button'));
        this.setAttributes(button, { "id": id,
            "class": "remove" });
        button.innerHTML = "X";
    }
    addFilterForm() {
        var select = document.getElementById('filter-type');
        var val = select.options[select.selectedIndex].value;
        switch (val) {
            case 'by domain': {
                this.applyTemplate(`<div id="bydomain">
                            <input id="domaininput">Keep this domain</input>
                            <button id="domain" class="btn btn-secondary">apply</button>
                            </div>`);
                break;
            }
            case 'by date range': {
                this.applyTemplate(`<div id="bydate">
                            <input id="dateinput">Enter a date (YYYY, YYYYMM or YYYYMMDD)</input>
                          <button id="date" class="btn btn-secondary"> apply</button>
                        </div>`);
                break;
            }
            case 'by url pattern': {
                this.applyTemplate(`<div id="byurl">
                            <input id="urlinput">by url pattern </input>
                            <button id="url" class="btn btn-secondary">apply</button>
                            </div>`);
                break;
            }
            case 'by language': {
                this.applyTemplate(`<div id="bylanguage">
                            <select id="languageinput">
                            <option value="ar">ar / العربية</option>
                            <option value="en">en / English</option>
                            <option value="fr">fr / Français</option>
                            <option value="ge">ge / Deutsche</option>
                            <option value="zh">zh / 中国</option>
                            </select>
                            <button id="language" class="btn btn-secondary">apply</button>
                            </div>`);
                break;
            }
            case 'keyword': {
                this.applyTemplate(`<div id="keywords"><input id="keywordinput" placeholder="enter keywords...">Keyword filter</input>
                            <button id="keyword" class="btn btn-secondary">apply</button></div>`);
                break;
            }
            default: {
                var boilerexists = document.getElementById('boilerplate');
                if (!boilerexists) {
                    this.addFilter('boilerplate', 'remove boilerplate');
                }
            }
        }
    }
    removeFilter(id) {
        let div = document.getElementById('filters');
        div.removeChild(div.childNodes[Number(id)]);
        let children = div.getElementsByClassName('remove');
        for (var i = 0; i < children.length; i++) {
            this.setAttributes(children[i], {
                id: i,
                class: 'remove'
            });
        }
    }
    applyTemplate(template) {
        var elem = document.getElementById("filterform");
        elem.innerHTML = template;
    }
    cleanInput(text) {
        return text.replace(/[\-\[\]\(\)\+\?\\\^\$\|]/g, "\\$&");
    }
    prepareMap(checks) {
        if (checks == undefined) {
            return "";
        }
        else {
            var script = '.map (r => (';
            var arr = [];
            for (var i = 0; i < checks.length; i++) {
                if (checks[i].checked) {
                    var include = checks[i].id;
                    switch (include) {
                        case "includeDates": {
                            script += "r.getCrawlDate, ";
                            break;
                        }
                        case "includeDomains": {
                            script += "r.getDomain, ";
                            break;
                        }
                        default: {
                            script += "r.getUrl, ";
                            break;
                        }
                    }
                }
            }
            if (document.getElementById('boilerplate')) {
                script += "ExtractBoilerpipeText(r.getContentString)))\n";
            }
            else {
                script += "RemoveHTML(r.getContentString)))\n";
            }
            return script;
        }
    }
    copyToClipboard(elementId) {
        // Create a "hidden" input
        var aux = document.createElement("textarea");
        var copy = document.getElementById(elementId).innerText;
        // Assign it the value of the specified element
        aux.innerHTML = copy;
        // Append it to the body
        document.body.appendChild(aux);
        aux.innerHTML.replace('<br>', '\r\n');
        // Highlight its content
        aux.select();
        // Copy the highlighted text
        document.execCommand("copy");
        // Remove it from the body
        document.body.removeChild(aux);
    }
    createScript() {
        this.clearForm('outputText');
        var elem = document.createElement('br');
        let codediv = document.getElementById('outputText');
        let code = document.getElementById('outputText').appendChild(document.createElement('code'));
        code.setAttribute('id', 'code');
        codediv.appendChild(elem);
        codediv.appendChild(elem);
        let copy = document.getElementById('outputText').appendChild(document.createElement('button'));
        copy.setAttribute('id', 'copy');
        copy.setAttribute('class', 'btn btn-secondary');
        copy.innerHTML = "Copy code to clipboard";
        let inc = document.getElementsByClassName('inc');
        let output = document.getElementById('outputType');
        let path = document.getElementById('collectionPath').value;
        let filters = document.getElementById('filters').childNodes;
        let screen_output = document.getElementById('take_output').value;
        let script = `import io.archivesunleashed.spark.matchbox._
                  import io.archivesunleashed.spark.rdd.RecordRDD._

                  val r = RecordLoader.loadArchives("` + this.cleanInput(path) + `", sc)
                    .keepValidPages()
                    `;
        for (var i = 0; i < filters.length; i++) {
            var domain, urlInput, keyword, language, date = false;
            if (filters[i].className == "domainFilter") {
                if (domain) {
                }
                else {
                    domain = true;
                    script += this.handleDomains('domain', 'domains');
                }
            }
            if (filters[i].className == "urlFilter") {
                if (urlInput) {
                }
                else {
                    urlInput = true;
                    script += this.handleDomains('url', 'UrlPatterns');
                }
            }
            if (filters[i].className == "keywordFilter") {
                if (keyword) {
                }
                else {
                    keyword = true;
                    script += this.handleDomains('keyword', 'content');
                }
            }
            if (filters[i].className == "languageFilter") {
                if (language) {
                }
                else {
                    language = true;
                    script += this.handleDomains('language', 'languages');
                }
            }
            if (filters[i].className == "dateFilter") {
                if (date) {
                }
                else {
                    date = true;
                    script += this.handleDomains('date');
                }
            }
        }
        script += this.prepareMap(inc);
        if (isNaN(+screen_output)) {
            script += `.saveAsTextFile("` + screen_output + `")`;
        }
        else {
            script += `.take(` + String(screen_output) + `)`;
        }
        code.innerText = script;
    }
    firstUpperCase(input) {
        return input[0].toUpperCase() + input.substr(1);
    }
    handleDomains(val, code = "") {
        if (code == "") {
            code = val;
        }
        let prefix = '(Set(';
        let suffix = '))\n';
        let comma = '", ';
        let endquote = '"';
        if (val == 'date') {
            prefix = '(';
            suffix = ')\n';
            comma = ',';
            endquote = "";
        }
        let domains = document.getElementById('filters').getElementsByClassName(val + 'Filter');
        let script = '.keep' + this.firstUpperCase(code) + prefix;
        for (var i = 0; i < domains.length; i++) {
            if (i < domains.length - 1) {
                script += '"' + domains[i].firstElementChild.innerHTML + comma;
            }
            else {
                script += '"' + domains[i].firstElementChild.innerHTML + endquote;
            }
        }
        script += suffix;
        return script;
    }
}
;
new AutForm();
//do work
//# sourceMappingURL=aut-form.js.map