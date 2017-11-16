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
            document.querySelector('body').addEventListener('click', function (event) {
                var elem = event.target;
                if (elem.className == 'remove') {
                    here.removeFilter(elem.id);
                }
                switch (elem.id) {
                    case 'filter': {
                        here.addFilterForm();
                        break;
                    }
                    case 'domain':
                    case 'date':
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
                    default: {
                        // protect against misuse.
                    }
                }
            });
        });
    }
    setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
    addFilter(name, value = "") {
        var filterform = document.getElementById('filterform');
        let filters = document.getElementById('filters');
        if (value == "") {
            value = document.getElementById(name + 'input').value;
        }
        while (filterform.firstChild) {
            filterform.removeChild(filterform.firstChild);
        }
        let div = filters.appendChild(document.createElement("div"));
        let id = filters.getElementsByClassName('remove').length;
        this.setAttributes(div, { "id": name + "filter",
            "draggable": true });
        div.innerHTML = "<br />Filter by " + name + ": " + value;
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
                            <input id="domaininput">by domain </input>
                            <button id="domain">apply</button>
                            </div>`);
                break;
            }
            case 'by date range': {
                this.applyTemplate(`<div id="bydate">
                            <input id="date" type="range" multiple value="1996,2016"
                            min="1995" max="2017" step=1
                            ></input>
                          <button id="date"> apply</button>
                        </div>`);
                break;
            }
            case 'by url pattern': {
                this.applyTemplate(`<div id="byurl">
                            <input id="urlinput">by url pattern </input>
                            <button id="url">apply</button>
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
                            <button id="language">apply</button>
                            </div>`);
                break;
            }
            case 'keyword': {
                this.applyTemplate(`<div id="keywords"><input id="keywordinput" placeholder="enter keywords...">Keyword filter</input>
                            <button id="keyword">apply</button></div>`);
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
}
;
new AutForm();
//do work
//# sourceMappingURL=aut-form.js.map