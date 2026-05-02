export const menuData = {
  "informacion_restaurante": {
    "nombre": "Pizzeria ALFREDO'S pastas & pizzas",
    "eslogan": "¡Deliciosamente irresistible!",
    "horario": "Lunes a Domingos DE 12:00PM A 12:00AM",
    "whatsapp": "51940986177",
    "redes_sociales": {
      "facebook": "https://www.facebook.com/alfredospastasypizzas",
      "instagram": "https://www.instagram.com/alfredos_pastas_pizzas/"
    }
  },
  "menu": [
    {
      "categoria": "PROMOCIONES",
      "items": [
        { "nombre": "Promo MEDIANA", "descripcion": "1 PIZZA MEDIANA (6 PORCIONES) + PAN AL AJO (3 UNIDADES) + PEPSI PERSONAL", "precio": 20.90, "imagen": "/Promo Mediana.png" },
        { "nombre": "Promo FAMILIAR", "descripcion": "1 PIZZA FAMILIAR (8 PORCIONES) + PAN AL AJO (6 UNIDADES) + PEPSI 1 LT.", "precio": 32.90, "imagen": "/Promo Familiar.png" },
        { "nombre": "PROMO EXTRA FAMILIAR", "descripcion": "1 PIZZA EXTRA FAMILIAR (12 PORCIONES) + PAN AL AJO (6 UNIDADES) + PEPSI 1LT.", "precio": 38.90, "imagen": "/Promo Extra Familiar.png" },
        { "nombre": "Dúo MEDIANO", "descripcion": "2 PIZZAS MEDIANA + PAN AL AJO (6 UNID.) + 1 PEPSI 1 LT.", "precio": 39.90, "imagen": "/Dúo Mediano.png" },
        { "nombre": "Dúo EXTRAFAMILIAR", "descripcion": "2 PIZZAS EXTRA FAMILIAR + PAN AL AJO (6 UNID.) + 1 PEPSI 1.5 LT.", "precio": 59.90, "imagen": "/Dúo Extra Familiar.png" },
        { "nombre": "Súper Promo (1 Pizza Extra Fam + Lasaña)", "descripcion": "12 PORCIONES + LASAÑA + PORCIÓN DE PAN AL AJO + GASEOSA PEPSI 1.5 LT.", "precio": 49.90, "imagen": "/Súper Promo.png" }
      ]
    },
    {
      "categoria": "PIZZAS",
      "tamanos": ["Personal", "Mediana", "Familiar", "Extra Fam."],
      "items": [
        { "nombre": "MOZZARELLA", "descripcion": "QUESO MOZZARELLA, QUESO DAMBO, SALSA PIZZERA Y OREGANO", "precios": [7.50, 16.00, 23.00, 30.00], "imagen": "/pizza-mozzarella.webp" },
        { "nombre": "AMERICANA", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA Y JAMÓN", "precios": [7.50, 16.00, 23.00, 30.00], "imagen": "/pizza-americana_1_.webp" },
        { "nombre": "PEPPERONI", "descripcion": "QUESO MOZZARELLA, PEPPERONI Y SALSA PIZZERA", "precios": [7.50, 16.00, 23.00, 30.00], "imagen": "/pizza-pepperoni.webp" },
        { "nombre": "SICILIANA", "descripcion": "QUESO MOZZARELLA, SALAME, PIMIENTO Y SALSA PIZZERA", "precios": [7.50, 16.00, 23.00, 30.00], "imagen": "/sicilian-pizza-with-sausage-an-146.jpg" },
        { "nombre": "VEGETARIANA", "descripcion": "QUESO MOZZARELLA, CHAMPIÑON, ACEITUNA VERDE, PIMIENTO, CEBOLLA BLANCA Y SALSA PIZZERA", "precios": [null, 16.00, 23.00, 30.00], "imagen": "/pizza-vegetariana.webp" },
        { "nombre": "HAWAIANA", "descripcion": "QUESO MOZZARELLA, JAMÓN, PIÑA Y SALSA PIZZERA", "precios": [8.50, 16.00, 23.00, 30.00], "imagen": "/pizza-hawaiana.webp" },
        { "nombre": "FULL CHORIZO", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA Y FULL CHORIZO", "precios": [7.50, 16.00, 23.00, 30.00], "imagen": "/full chorizo.webp" },
        { "nombre": "BRAVA", "descripcion": "QUESO MOZZARELLA, CHORIZO, TOCINO, CABANOSSI Y SALSA PIZZERA", "precios": [null, 17.00, 23.00, 30.00], "imagen": "/BRAVA.webp" },
        { "nombre": "FUGAZZA", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, TOCINO, ACEITUNAS Y PIMIENTOS", "precios": [null, 17.00, 23.00, 32.00], "imagen": "/FUGAZZA.jpg" },
        { "nombre": "HAWAIANA TROPICAL", "descripcion": "QUESO MOZZARELLA, JAMÓN, PIÑA, DURAZNO Y SALSA PIZZERA", "precios": [null, 17.00, 23.00, 32.00], "imagen": "/HAWAIANA TROPICAL.jpg" },
        { "nombre": "AMAZÓNICA", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, CECINA AHUMADA Y CHORIZO AHUMADO", "precios": [null, 17.00, 24.00, 32.00], "imagen": "/AMAZÓNICA.jpeg" },
        { "nombre": "CAPRICHOSA", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, JAMÓN, CABANOSSI Y PIÑA", "precios": [null, 17.00, 24.00, 32.00], "imagen": "/CAPRICHOSA.jpg" },
        { "nombre": "AMERICANA BURGER", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, CARNE PIZZERA Y LOMITO AHUMADO", "precios": [null, 17.00, 25.00, 33.00], "imagen": "/AMERICANA BURGER.jpg" },
        { "nombre": "HAWAIANA CHICKEN", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, JAMÓN, PIÑA, POLLO Y BBQ", "precios": [null, 17.00, 25.00, 33.00], "imagen": "/pizza-hawaiana-chicken-bbq.webp" },
        { "nombre": "GOURMET", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, PEPPERONI, CHAMPIÑONES Y CARNE PIZZERA", "precios": [null, 18.00, 26.00, 33.00], "imagen": "/GOURMET.jpg" },
        { "nombre": "FULL MEAT", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, PEPPERONI, JAMÓN, CARNE PIZZERA, SALCHICHA Y CHORIZO", "precios": [null, 18.00, 26.00, 34.00], "imagen": "/FULL MEAT.webp" },
        { "nombre": "GORDON BLUE", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, JAMÓN, POLLO, TOCINO, Y LOMITO AHUMADO", "precios": [null, 18.00, 26.00, 34.00], "imagen": "/GORDON BLUE.webp" },
        { "nombre": "FULL CARNE", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, POLLO A LA BRASA, TOCINO, CARNE PIZZERA Y SALCHICHA", "precios": [null, 18.00, 28.00, 35.00], "imagen": "/FULL CARNE.webp" },
        { "nombre": "ALFREDITO'S", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, CABANOSSI, JAMÓN, Y LOMITO AHUMADO", "precios": [null, 18.00, 28.00, 35.00] },
        { "nombre": "SUPREMA", "descripcion": "QUESO MOZZARELLA, SALSA PIZZERA, CARNE PIZZERA, JAMÓN, PEPPERONI, CHORIZO, SALCHICHA, SALAME, TOCINO, ACEITUNAS, PIMIENTO Y CHAMPIÑON", "precios": [null, 18.00, 28.00, 36.00], "imagen": "/SUPREMA.jpeg" }
      ]
    },
    {
      "categoria": "PASTAS",
      "descripcion_seccion": "Elige tu tipo de pasta y salsa favorita",
      "nota_adicional": "+ S/5.90 PECHUGA, BISTECK, CHULETA, CHURRASCO O MILANESA",
      "subcategorias": [
        {
          "nombre": "SPAGUETTIS",
          "imagen": "/spagueti a lo alfredo.avif",
          "items": [
            { "nombre": "A LA BOLOGNESA", "descripcion": "Salsa de carne tradicional", "precio": 13.00, "imagen": "/A LA BOLOGNESA.jpg" },
            { "nombre": "A LO ALFREDO", "descripcion": "Salsa blanca cremosa con jamón y queso", "precio": 13.00, "imagen": "/spagueti a lo alfredo.avif" },
            { "nombre": "EN SALSA ROSSINI", "descripcion": "Salsa fusión rosada con especias", "precio": 13.00, "imagen": "/spagueti EN SALSA ROSSINI.webp" },
            { "nombre": "EN SALSA PESTO", "descripcion": "Tradicional salsa verde de albahaca fresca", "precio": 13.00, "imagen": "/espaguetis-al-pesto-con-albahaca.jpg" },
            { "nombre": "A LA HUANCAINA", "descripcion": "Fusión peruana con crema de ají amarillo", "precio": 13.00, "imagen": "/spagueti A LA HUANCAINA.jpg" },
            { "nombre": "A LO ALFREDO ESPECIAL", "descripcion": "Receta premium de la casa", "precio": 15.00, "imagen": "/spagueti ALFREDO LOVER´S.jpg" }
          ]
        },
        {
          "nombre": "MACARRONES",
          "imagen": "/macarrones A LO ALFREDO.jpg",
          "items": [
            { "nombre": "A LA BOLOGNESA", "descripcion": "Salsa de carne tradicional", "precio": 13.00, "imagen": "/portada-de-los-macarrones-a-la-bolonesa-con-carne-picada.jpg" },
            { "nombre": "A LO ALFREDO", "descripcion": "Salsa blanca cremosa con jamón y queso", "precio": 13.00, "imagen": "/macarrones A LO ALFREDO.jpg" },
            { "nombre": "EN SALSA ROSSINI", "descripcion": "Salsa fusión rosada con especias", "precio": 13.00, "imagen": "/macarrones EN SALSA ROSSINI.jpg" },
            { "nombre": "EN SALSA PESTO", "descripcion": "Tradicional salsa verde de albahaca fresca", "precio": 13.00, "imagen": "/macarrones EN SALSA PESTO.jpeg" },
            { "nombre": "A LA HUANCAINA", "descripcion": "Fusión peruana con crema de ají amarillo", "precio": 13.00, "imagen": "/macarrones-huancaina-10.webp" },
            { "nombre": "A LO ALFREDO ESPECIAL", "descripcion": "Receta premium de la casa", "precio": 15.00, "imagen": "/macarrones ALFREDO LOVER´S.jpg" }
          ]
        },
        {
          "nombre": "FETUCCINIS",
          "imagen": "/fetuccini-alfredo-ccc.jpg",
          "items": [
            { "nombre": "A LA BOLOGNESA", "descripcion": "Salsa de carne tradicional", "precio": 14.00, "imagen": "/fetuccini A LA BOLOGNESA.jpeg" },
            { "nombre": "A LO ALFREDO", "descripcion": "Salsa blanca cremosa con jamón y queso", "precio": 14.00, "imagen": "/fetuccini A LO ALFREDO.jpeg" },
            { "nombre": "EN SALSA ROSSINI", "descripcion": "Salsa fusión rosada con especias", "precio": 14.00, "imagen": "/fetuccini EN SALSA ROSSINI.jpeg" },
            { "nombre": "EN SALSA PESTO", "descripcion": "Tradicional salsa verde de albahaca fresca", "precio": 14.00, "imagen": "/fetuccini EN SALSA PESTO.jpeg" },
            { "nombre": "A LA HUANCAINA", "descripcion": "Fusión peruana con crema de ají amarillo", "precio": 14.00, "imagen": "/fetuccini A LA HUANCAINA.jpeg" },
            { "nombre": "A LO ALFREDO ESPECIAL", "descripcion": "Receta premium de la casa", "precio": 16.00, "imagen": "/fetuccini-alfredo-ccc.jpg" }
          ]
        },
        {
          "nombre": "RAVIOLES",
          "imagen": "/ravioles A LO ALFREDO.jpg",
          "items": [
            { "nombre": "A LA BOLOGNESA", "descripcion": "Salsa de carne tradicional", "precio": 17.00, "imagen": "/ravioles A LA BOLOGNESA.jpeg" },
            { "nombre": "A LO ALFREDO", "descripcion": "Salsa blanca cremosa con jamón y queso", "precio": 17.00, "imagen": "/ravioles A LO ALFREDO.jpg" },
            { "nombre": "EN SALSA ROSSINI", "descripcion": "Salsa fusión rosada con especias", "precio": 17.00, "imagen": "/ravioles EN SALSA ROSSINI.webp" },
            { "nombre": "EN SALSA PESTO", "descripcion": "Tradicional salsa verde de albahaca fresca", "precio": 17.00, "imagen": "/ravioles EN SALSA PESTOjpg.jpg" },
            { "nombre": "A LA HUANCAINA", "descripcion": "Fusión peruana con crema de ají amarillo", "precio": 17.00, "imagen": "/ravioles A LA HUANCAINA.jpg" },
            { "nombre": "A LO ALFREDO ESPECIAL", "descripcion": "Receta premium de la casa", "precio": 19.00, "imagen": "/ravioles ALFREDO LOVER´S.webp" }
          ]
        }
      ]
    },
    {
      "categoria": "LASAGNAS Y CANELONES",
      "items": [
        { "nombre": "Lasagna A LA BOLOGNESA / ALFREDO / ROSSINI / PESTO", "descripcion": "Capas de pasta artesanal con tu salsa favorita y queso gratinado.", "precio": 19.00, "imagen": "/lasana. Lasagna A LA BOLOGNESAjpg.jpg" },
        { "nombre": "Lasagna A LO ALFREDO ESPECIAL", "descripcion": "Lasagna premium con nuestra salsa Alfredo especial gratinada.", "precio": 21.00, "imagen": "/Lasagna A LO ALFREDO ESPECIAL.jpeg" },
        { "nombre": "Canelones A LA BOLOGNESA / ALFREDO / ROSSINI", "descripcion": "Tubos de pasta rellenos con carne y bañados en tu salsa preferida.", "precio": 18.00, "imagen": "/Canelones A LA BOLOGNESA.jpeg" },
        { "nombre": "Canelones A LO ALFREDO ESPECIAL", "descripcion": "Canelones con la receta Alfredo especial de la casa.", "precio": 20.00, "imagen": "/Canelones A LO ALFREDO ESPECIAL.jpg" }
      ]
    },
    {
      "categoria": "CALZONE",
      "items": [
        { 
          "nombre": "CALZONE A LO ALFREDO ESPECIAL", 
          "descripcion": "MASA ARTESANAL DE GROSOR INTERMEDIO RELLENO CON QUESO MOZZARELLA, JAMÓN TOCINO, PEPPERONI, CARNE PIZZERA, CHAMPIÑONES Y FINAS HIERBAS", 
          "precio": 20.00,
          "imagen": "/CALZONE A LO ALFREDO ESPECIAL.jpeg" 
        }
      ]
    },
    {
      "categoria": "ADICIONALES",
      "items": [
        { "nombre": "PORCIÓN DE PAN AL AJO TRADICIONAL", "descripcion": "Pan crujiente con pasta de ajo", "precio": 5.00, "imagen": "/PORCIÓN DE PAN AL AJO TRADICIONAL.jpg" },
        { "nombre": "PORCIÓN DE PAN AL AJO ESPECIAL", "descripcion": "(Mozzarella / Jamón / Pimiento)", "precio": 8.50, "imagen": "/PORCIÓN DE PAN AL AJO ESPECIAL.png" },
        { "nombre": "PORCIÓN DE PAN AL AJO ALFREDO'S", "descripcion": "(Mozzarella / Tocino / Pimiento)", "precio": 9.00, "imagen": "/PORCIÓN DE PAN AL AJO ALFREDO'S.jpg" },
        { "nombre": "EXTRA CHESSE MEDIANA", "descripcion": "Queso extra para pizza mediana", "precio": 3.00, "imagen": "/EXTRA CHESSE MEDIANA.webp" },
        { "nombre": "EXTRA CHESSE FAMILIAR", "descripcion": "Queso extra para pizza familiar", "precio": 4.00, "imagen": "/EXTRA CHESSE FAMILIAR.webp" },
        { "nombre": "OTROS ADICIONALES", "descripcion": "Ingredientes extras", "precio": 3.00, "imagen": "/OTROS ADICIONALES.webp" }
      ]
    },
    {
      "categoria": "BEBIDAS",
      "items": [
        { "nombre": "AGUA MINERAL", "descripcion": "Botella de agua natural", "precio": 2.50, "imagen": "/AGUA MINERAL.png" },
        { "nombre": "GASEOSA PERSONAL (PEPSI)", "descripcion": "Bebida helada personal", "precio": 3.00, "imagen": "/GASEOSA PERSONAL (PEPSI).webp" },
        { "nombre": "GASEOSA PERSONAL (COCA COLA / INKA COLA)", "descripcion": "Bebida helada personal clásica", "precio": 3.50, "imagen": "/GASEOSA PERSONAL (COCA COLA  INKA COLA).webp" },
        { "nombre": "GASEOSA 1L (PEPSI)", "descripcion": "Gaseosa para compartir", "precio": 5.50, "imagen": "/GASEOSA 1L (PEPSI).webp" },
        { "nombre": "GASEOSA 1.5 L (PEPSI/7UP)", "descripcion": "Gaseosa mediana familiar", "precio": 6.50, "imagen": "/GASEOSA 1.5 L (PEPSI7UP).webp" },
        { "nombre": "GASEOSA 1.5 L (COCA COLA / INKA COLA)", "descripcion": "Gaseosa familiar clásica", "precio": 9.00, "imagen": "/GASEOSA 1.5 L (COCA COLA  INKA COLA).webp" },
        { "nombre": "CHICHA MORADA (JARRA DE 1/2 LITRO)", "descripcion": "Refresco natural de maíz morado", "precio": 5.00, "imagen": "/CHICHA MORADA (JARRA DE 12 LITRO).jpeg" },
        { "nombre": "CHICHA MORADA (JARRA DE 1 LITRO)", "descripcion": "Refresco natural familiar", "precio": 10.00, "imagen": "/CHICHA MORADA (JARRA DE 1 LITRO).webp" },
        { "nombre": "LIMONADA AMERICANA (JARRA DE 1/2 LITRO)", "descripcion": "Jugo de limón fresco", "precio": 5.00, "imagen": "/LIMONADA AMERICANA (JARRA DE 12 LITRO).jpg" },
        { "nombre": "LIMONADA AMERICANA (JARRA DE 1 LITRO)", "descripcion": "Jugo familiar", "precio": 10.00, "imagen": "/LIMONADA AMERICANA (JARRA DE 1 LITRO).jpeg" },
        { "nombre": "MARACUYA 1/2 LT.", "descripcion": "Jugo de maracuyá natural", "precio": 5.00, "imagen": "/MARACUYA 12 LT..webp" },
        { "nombre": "MARACUYA 1 LT.", "descripcion": "Jugo de maracuyá familiar", "precio": 10.00, "imagen": "/MARACUYA 1 LT..jpeg" }
      ]
    },
    {
      "categoria": "FROZEN Y CAFETERÍA",
      "items": [
        { "nombre": "JARRA DE 1/2L (FROZEN)", "descripcion": "(LIMÓN / MARACUYA / FRESA / CHICHA)", "precio": 6.00, "imagen": "/JARRA DE 12L (FROZEN).webp" },
        { "nombre": "JARRA DE 1L (FROZEN)", "descripcion": "(LIMÓN / MARACUYA / FRESA / CHICHA)", "precio": 12.00, "imagen": "/JARRA DE 1L (FROZEN).jpg" },
        { "nombre": "INFUSIONES (TÉ/ANIS/MANZANILLA)", "descripcion": "Bebidas calientes aromáticas", "precio": 3.00, "imagen": "/INFUSIONES (TÉANISMANZANILLA).jpg" },
        { "nombre": "CAFÉ AMERICANO", "descripcion": "Café pasado puro", "precio": 5.50, "imagen": "/CAFÉ AMERICANO.jpg" },
        { "nombre": "CAFÉ CON LECHE", "descripcion": "Mezcla clásica", "precio": 6.50, "imagen": "/CAFÉ CON LECHE.jpeg" },
        { "nombre": "CAPUCCINO SIN CREMA", "descripcion": "Café espumoso italiano", "precio": 7.90, "imagen": "/CAPUCCINO SIN CREMA.jpeg" },
        { "nombre": "CAPUCCINO CON CREMA", "descripcion": "Capuccino premium con crema batida", "precio": 9.90, "imagen": "/CAPUCCINO CON CREMA.jpeg" }
      ]
    },
    {
      "categoria": "LICORES Y COCTELES",
      "items": [
        { "nombre": "VINOS QUEIROLO (BORGOÑA/MAGDALENA)", "descripcion": "Vino tinto o blanco", "precio": 25.00 },
        { "nombre": "VINOS TABERNERO", "descripcion": "Borgoña / Gran Rose / Gran Tinto", "precio": 27.00 },
        { "nombre": "VINOS TACAMA", "descripcion": "Rose / Gran Tinto", "precio": 30.00 },
        { "nombre": "CERVEZA CUSQUEÑA RUBIA/NEGRA 330ML", "descripcion": "Cerveza nacional premium", "precio": 5.50 },
        { "nombre": "CERVEZA CORONA / HEINEKEN", "descripcion": "Botella personal importada", "precio": 6.50 },
        { "nombre": "CERVEZA CUSQUEÑA RUBIA/NEGRA 620ML", "descripcion": "Cerveza grande para compartir", "precio": 9.00 },
        { "nombre": "PISCO SOUR / MARACUYA SOUR", "descripcion": "Clásico cóctel peruano", "precio": 19.90 },
        { "nombre": "CHILCANO / ALGARROBINA", "descripcion": "Variedad de bebidas a base de pisco", "precio": 19.90 },
        { "nombre": "PIÑA COLADA / MOJITO / DAIQUIRI", "descripcion": "Cócteles refrescantes", "precio": 19.90 },
        { "nombre": "SANGRÍA ESPECIAL ALFREDO'S TINTO 1L", "descripcion": "Vino tabernero gran tinto fina reserva", "precio": 28.90 },
        { "nombre": "SANGRÍA ESPECIAL DE ESTACIÓN 1L", "descripcion": "Vino tabernero gran blanco chenin + frutas", "precio": 29.90 }
      ]
    }
  ]
};
