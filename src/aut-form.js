"use strict";
var Template = /** @class */ (function () {
    function Template() {
    }
    return Template;
}());
var AutForm = /** @class */ (function () {
    function AutForm(institution) {
        var _this = this;
        this.institution = institution;
        var btn = document.getElementById("filter");
        btn.addEventListener("click", function (e) { return _this.addFilter("remove boilerplate"); });
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
module.exports = AutForm;
//# sourceMappingURL=aut-form.js.map
