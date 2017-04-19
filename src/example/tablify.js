const Table = require('cli-table');

export function tablify (data, options) {
  let keys = Object.keys(data[0]);

  if (options && options.include) {
    keys = keys.filter(key => options.include.includes(key));
  }

  const table = new Table({ head: keys }, );

  data.forEach(item => {
    const row = keys.map((key) => {
      return item[key];
    });
    table.push(row);
  });

  return table.toString();
}