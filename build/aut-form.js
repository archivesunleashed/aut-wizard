class Template {
    constructor() {
        this.path = './filters/removeBoilerplate.html';
    }
}
class AutForm {
    constructor() {
        var btn;
        var here = this;
        document.addEventListener("DOMContentLoaded", function (doc) {
            btn = document.getElementById('filter');
            if (btn) {
                btn.addEventListener("click", () => here.addFilter());
            }
        });
    }
    addFilter() {
        var select = document.getElementById('filter-type');
        var val = select.options[select.selectedIndex].value;
        switch (val) {
            case 'by domain': {
                this.applyTemplate(`<div id="bydomain"><input>by domain </input>`);
                break;
            }
            case 'by date range': {
                this.applyTemplate('by date');
                break;
            }
            default: {
                this.applyTemplate('<p><i>Remove Boilerplate</i></p>');
            }
        }
    }
    applyTemplate(template) {
        var elem = document.getElementById("filters");
        elem.appendChild(document.createElement('p')).innerHTML = template;
    }
}
;
new AutForm();
//do work
//# sourceMappingURL=aut-form.js.map