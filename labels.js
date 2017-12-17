document.addEventListener("DOMContentLoaded", _ => {
  let callback = _ => {
    let
      csv = document.getElementById('csv').value,
      pagePrototype = Array.from(document.querySelectorAll(".page.prototype"))[0],
      rows = csv
        // Split into rows
        .split('\n')
        .filter(t => t)
        // Discard the first row
        .slice(1)
        // The expected columns are [name, street 1, street 2, city, country code, postal, province code, country, province]
        .map(row => {
          let columns = row.split('\t');
          return {
            name: columns[0],
            street1: columns[1],
            street2: columns[2],
            city: columns[3],
            countryCode: columns[4],
            postalCode: columns[5],
            provinceCode: columns[6],
            country: columns[7],
            province: columns[8]
          };
        });

      // Remove all existing pages
      Array.from(document.querySelectorAll(".page:not(.prototype)"))
        .map(e => e.remove());

      // If there are more rows than labels, create new pages
      for (let i = 0; i < Math.ceil(rows.length / document.querySelectorAll('.page.prototype .label').length); i += 1) {
        let page = pagePrototype.cloneNode(true);
        page.classList.remove('prototype');
        pagePrototype.parentNode.appendChild(page);
      }

      // Add the row's information to each label on each page
      let labels = Array.from(document.querySelectorAll(".page:not(.prototype) .label"));
      rows
        .forEach((row, i) => {
          let lines = [row.name, '<br/>', row.street1, row.street2 ? row.street2 : null, `${row.city}, ${row.provinceCode}, ${row.postalCode}`, row.country];
          labels[i].innerHTML = lines.filter(line => line).join('<br/>');
        });
  };

  document.getElementById('refresh').addEventListener('click', callback);
  document.getElementById('csv').addEventListener('change', callback);
});
