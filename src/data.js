export const menuData = {
  "informacion_restaurante": {
    "nombre": "Pizzeria ALFREDO'S pastas & pizzas",
    "eslogan": "¡Deliciosamente irresistible!",
    "horario": "Lunes a Domingos DE 12:00PM A 12:00AM",
    "redes_sociales": {
      "facebook": "Pastas & Pizzas Alfredo's",
      "instagram": "alfredos_pastas_pizzas"
    }
  },
  "menu": [
    {
      "categoria": "PROMOCIONES",
      "items": [
        { "nombre": "Promo Mediana (1 Pizza Mediana + Pan al ajo 3u + Pepsi Personal)", "precio": 20.90 },
        { "nombre": "Promo Familiar (1 Pizza Familiar + Pan al ajo 6u + Pepsi 1LT)", "precio": 32.90 },
        { "nombre": "Promo Extra Familiar (1 Pizza Extra Fam + Pan al ajo 6u + Pepsi 1LT)", "precio": 38.90 },
        { "nombre": "Dúo Mediano (2 Pizzas Medianas + Pan al ajo 6u + Pepsi 1LT)", "precio": 39.90 },
        { "nombre": "Dúo Extra Familiar (2 Pizzas Extra Fam + Pan al ajo 6u + Pepsi 1.5LT)", "precio": 59.90 },
        { "nombre": "Súper Promo (1 Pizza Extra Fam + Lasaña + Pan al ajo + Pepsi 1.5LT)", "precio": 49.90 }
      ]
    },
    {
      "categoria": "PIZZAS CLÁSICAS",
      "tamanos": ["Personal", "Mediana", "Familiar", "Extra Fam."],
      "items": [
        { "nombre": "MOZZARELLA", "precios": [7.50, 16.00, 23.00, 30.00] },
        { "nombre": "AMERICANA", "precios": [7.50, 16.00, 23.00, 30.00] },
        { "nombre": "PEPPERONI", "precios": [7.50, 16.00, 23.00, 30.00] },
        { "nombre": "SICILIANA", "precios": [7.50, 16.00, 23.00, 30.00] },
        { "nombre": "VEGETARIANA", "precios": [null, 16.00, 23.00, 30.00] },
        { "nombre": "HAWAIANA", "precios": [8.50, 16.00, 23.00, 30.00] },
        { "nombre": "FULL CHORIZO", "precios": [7.50, 16.00, 23.00, 30.00] },
        { "nombre": "BRAVA", "precios": [null, 17.00, 23.00, 30.00] }
      ]
    },
    {
      "categoria": "PIZZAS ESPECIALES",
      "tamanos": ["Mediana", "Familiar", "Extra Fam."],
      "items": [
        { "nombre": "FUGAZZA", "precios": [17.00, 23.00, 32.00] },
        { "nombre": "HAWAIANA TROPICAL", "precios": [17.00, 23.00, 32.00] },
        { "nombre": "AMAZÓNICA", "precios": [17.00, 24.00, 32.00] },
        { "nombre": "CAPRICHOSA", "precios": [17.00, 24.00, 32.00] },
        { "nombre": "AMERICANA BURGER", "precios": [17.00, 25.00, 33.00] },
        { "nombre": "HAWAIANA CHICKEN", "precios": [17.00, 25.00, 33.00] },
        { "nombre": "GOURMET", "precios": [18.00, 26.00, 33.00] },
        { "nombre": "FULL MEAT", "precios": [18.00, 26.00, 34.00] },
        { "nombre": "GORDON BLUE", "precios": [18.00, 26.00, 34.00] },
        { "nombre": "FULL CARNE", "precios": [18.00, 28.00, 35.00] },
        { "nombre": "ALFREDITO'S", "precios": [18.00, 28.00, 35.00] },
        { "nombre": "SUPREMA", "precios": [18.00, 28.00, 36.00] }
      ]
    },
    {
      "categoria": "PASTAS (Spaguettis y Macarrones)",
      "items": [
        { "nombre": "A LA BOLOGNESA", "precio": 13.00 },
        { "nombre": "A LO ALFREDO", "precio": 13.00 },
        { "nombre": "EN SALSA ROSSINI", "precio": 13.00 },
        { "nombre": "EN SALSA PESTO", "precio": 13.00 },
        { "nombre": "A LA HUANCAINA", "precio": 13.00 },
        { "nombre": "A LO ALFREDO ESPECIAL", "precio": 15.00 }
      ],
      "descripcion_seccion": "Pechuga, Bisteck, Chuleta, Churrasco o Milanesa + S/5.90"
    },
    {
      "categoria": "PASTAS (Fetuccinis)",
      "items": [
        { "nombre": "A LA BOLOGNESA", "precio": 14.00 },
        { "nombre": "A LO ALFREDO", "precio": 14.00 },
        { "nombre": "EN SALSA ROSSINI", "precio": 14.00 },
        { "nombre": "EN SALSA PESTO", "precio": 14.00 },
        { "nombre": "A LA HUANCAINA", "precio": 14.00 },
        { "nombre": "A LO ALFREDO ESPECIAL", "precio": 16.00 }
      ]
    },
    {
      "categoria": "PASTAS (Ravioles)",
      "items": [
        { "nombre": "A LA BOLOGNESA", "precio": 17.00 },
        { "nombre": "A LO ALFREDO", "precio": 17.00 },
        { "nombre": "EN SALSA ROSSINI", "precio": 17.00 },
        { "nombre": "EN SALSA PESTO", "precio": 17.00 },
        { "nombre": "A LA HUANCAINA", "precio": 17.00 },
        { "nombre": "A LO ALFREDO ESPECIAL", "precio": 19.00 }
      ]
    },
    {
      "categoria": "LASAGNA Y CANELONES",
      "items": [
        { "nombre": "Lasagna A LA BOLOGNESA / ALFREDO / ROSSINI / PESTO", "precio": 19.00 },
        { "nombre": "Lasagna A LO ALFREDO ESPECIAL", "precio": 21.00 },
        { "nombre": "Canelones A LA BOLOGNESA / ALFREDO / ROSSINI", "precio": 18.00 },
        { "nombre": "Canelones A LO ALFREDO ESPECIAL", "precio": 20.00 }
      ]
    },
    {
      "categoria": "CALZONE",
      "items": [
        { 
          "nombre": "CALZONE A LO ALFREDO ESPECIAL", 
          "descripcion": "Masa artesanal relleno con mozzarella, jamón, tocino, pepperoni, carne, champiñones.",
          "precio": 20.00 
        }
      ]
    },
    {
      "categoria": "ADICIONALES",
      "items": [
        { "nombre": "Porción de Pan al Ajo Tradicional", "precio": 5.00 },
        { "nombre": "Porción de Pan al Ajo Especial", "precio": 8.50 },
        { "nombre": "Porción de Pan al Ajo Alfredo's", "precio": 9.00 },
        { "nombre": "Extra Cheese Mediana", "precio": 3.00 },
        { "nombre": "Extra Cheese Familiar", "precio": 4.00 },
        { "nombre": "Otros Adicionales", "precio": 3.00 }
      ]
    },
    {
      "categoria": "BEBIDAS Y FROZEN",
      "items": [
        { "nombre": "Gaseosa Personal (Pepsi)", "precio": 3.00 },
        { "nombre": "Gaseosa 1L (Pepsi)", "precio": 5.50 },
        { "nombre": "Gaseosa 1.5L (Pepsi/7up)", "precio": 6.50 },
        { "nombre": "Gaseosa 1.5L (Coca/Inka)", "precio": 9.00 },
        { "nombre": "Chicha Morada / Limonada / Maracuya (1 Litro)", "precio": 10.00 },
        { "nombre": "Frozen (Limón/Maracuyá/Fresa/Chicha) 1L", "precio": 12.00 }
      ]
    },
    {
      "categoria": "CERVEZAS Y VINOS",
      "items": [
        { "nombre": "Cusqueña Rubia/Negra 330ml", "precio": 5.50 },
        { "nombre": "Corona 355ml / Heineken 300ml", "precio": 6.50 },
        { "nombre": "Cusqueña Rubia/Negra 620ml", "precio": 9.00 },
        { "nombre": "Vino Queirolo (Borgoña/Magdalena)", "precio": 25.00 },
        { "nombre": "Vino Tabernero (Gran Tinto/Rose)", "precio": 30.00 }
      ]
    },
    {
      "categoria": "COCTELES Y SANGRÍAS",
      "items": [
        { "nombre": "Pisco Sour / Maracuya Sour / Chilcano / Mojito / Piña Colada", "precio": 19.90 },
        { "nombre": "Sangría Especial Alfredo's Tinto 1L", "precio": 28.90 },
        { "nombre": "Sangría Especial de Estación 1L", "precio": 29.90 }
      ]
    }
  ]
};
