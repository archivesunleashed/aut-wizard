import { Institution, Script } from './model';

class Template {
  path: './filters/removeBoilerplate.html';
  filename: String;
}

export class AutForm {
  script: Script;

  constructor (private institution: String, ) {
    let btn = document.getElementById("filter");
    btn.addEventListener("click", (e:Event) => this.addFilter(e));
  }

  addFilter (event) {
    switch (event) {
      case 'by domain': {
        this.applyTemplate({ path:'./filters/', filename: 'domainFilter.html'});
        break;
      }
      case 'by date' : {
        this.applyTemplate({ filename: 'dateFilter.html'});
      }
      default : {
        this.applyTemplate ({ filename: 'removeBoilerplate.html'});
      }
    }
  }

  applyTemplate(template) {
     var elem = document.getElementById("filters").lastChild;
     elem.appendChild(template);
  }
};
