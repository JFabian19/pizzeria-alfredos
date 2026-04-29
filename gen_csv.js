import fs from 'fs';
import { menuData } from './src/data.js';

let csvCats = 'Categoría\n';
menuData.menu.forEach(cat => {
  csvCats += `"${cat.categoria}"\n`;
});
fs.writeFileSync('categorias.csv', csvCats);

let csvPlatos = 'Categoría,Nombre,Descripción,Precio,Imagen URL\n';
menuData.menu.forEach(cat => {
  cat.items.forEach(item => {
    let precio = item.precio;
    if (item.precios) {
      precio = item.precios.find(p => p !== null);
    }
    const catName = cat.categoria.replace(/"/g, '""');
    const itemName = item.nombre.replace(/"/g, '""');
    const itemDesc = (item.descripcion || '').replace(/"/g, '""');
    const imgUrl = ''; // empty
    csvPlatos += `"${catName}","${itemName}","${itemDesc}","${precio}","${imgUrl}"\n`;
  });
});
fs.writeFileSync('platos.csv', csvPlatos);
console.log('CSVs generated.');
