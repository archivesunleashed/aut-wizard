"use strict";
var Template = (function () {
    function Template() {
    }
    return Template;
}());
var AutForm = (function () {
    function AutForm(institution) {
        var _this = this;
        this.institution = institution;
        var btn = document.getElementById("filter");
        btn.addEventListener("click", function (e) { return _this.addFilter(e); });
    }
    AutForm.prototype.addFilter = function (event) {
        switch (event) {
            case 'by domain': {
                this.applyTemplate({ path: './filters/', filename: 'domainFilter.html' });
                break;
            }
            case 'by date': {
                this.applyTemplate({ filename: 'dateFilter.html' });
            }
            default: {
                this.applyTemplate({ filename: 'removeBoilerplate.html' });
            }
        }
    };
    AutForm.prototype.applyTemplate = function (template) {
        var elem = document.getElementById("filters").lastChild;
        elem.appendChild(template);
    };
    return AutForm;
}());
;
