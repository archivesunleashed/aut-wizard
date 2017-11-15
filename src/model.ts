interface Institution {
  id: String,
  name: String,
}

interface Collection {
  id: String,
  name: String,
  suffix: String
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
  path: String,
  institution: Institution,
  collections: Collection[],
  filename: String,
  outputType: OutputType,
  filters: Filter [], // e.g., by date, column, text etc.
  aggregations: Aggregation [], // e.g., count items
  outputFormat: OutputFormat,
  bypassScript: Boolean,
}

export {Script, OutputFormat, Aggregation, Filter, OutputType, Collection, Institution}
