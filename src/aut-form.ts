interface Institution {
  id: string,
  name: string,
}

interface Collection {
  id: string,
  name: string,
  suffix: string
}

interface OutputType {

}

interface Filter {

}

interface Aggregation {

}

interface OutputFormat {

}

interface Script {
  path: string,
  institution: Institution,
  collections: Collection[],
  filename: string,
  outputType: OutputType,
  filters: Filter [], // e.g., by date, column, text etc.
  aggregations: Aggregation [], // e.g., count items
  outputFormat: OutputFormat,
  bypassScript: Boolean,
}


class Template {
  path: string = './filters/removeBoilerplate.html';
  filename: string;
}

class AutForm {
  script: Script;
  doc: any;

  constructor () {
    var btn:HTMLElement;
    var here = this;

    document.addEventListener("DOMContentLoaded", function(doc) {
      btn = document.getElementById('filter');
      if (btn) {
        btn.addEventListener("click", () => here.addFilter());
      }
    }
  );

  }

  addFilter () {
    var select = document.getElementById('filter-type') as HTMLSelectElement
    var val = select.options[select.selectedIndex].value
    switch (val) {
      case 'by domain': {
        this.applyTemplate(`<div id="bydomain"><input>by domain </input>`);
        break;
      }
      case 'by date range' : {
        this.applyTemplate('by date');
        break;
      }
      default : {
        this.applyTemplate ('<p><i>Remove Boilerplate</i></p>');
      }
    }
  }

  applyTemplate(template:string) {
     var elem = document.getElementById("filters");
     elem.appendChild(document.createElement('p')).innerHTML = template;
  }
};

new AutForm ();
  //do work
