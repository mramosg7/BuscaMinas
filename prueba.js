let table= document.createElement('table');
let td= document.createElement('td');
let tr= document.createElement('tr');
td.textContent("hola");
tr.appendChild(td);
table.appendChild(tr);
document.body.appendChild(table);