export default function getFormattedValues(
  values: any[],
  formatter: Function[] = [],
  prefixes: string[] = [''],
) {
  let cellValues: any[] = [];

  // for prevent error with null callback due to JSON.stringify()
  if (formatter.findIndex((func) => !func) !== -1) { // if there is at least one not Function item
    cellValues = values.map((value: any, index: number) => (prefixes[index] || '') + (value || ''));
  } else if (formatter?.length > 1) {
    formatter.forEach((format: Function, index: number) => {
      const formattedValue = format(prefixes[index] + values[index]);
      cellValues.push(formattedValue);
    });
  } else if (formatter?.length === 1) {
    values.forEach((_value: any, index: number) => {
      const formattedValue = formatter[0](prefixes[index]
        ? `${prefixes[index]}${values[index]}`
        : values[index]);
      cellValues.push(formattedValue);
    });
  }

  return cellValues;
}
