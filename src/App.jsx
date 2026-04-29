import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, Trash2, ChevronRight } from 'lucide-react';

import { menuData } from './data';

function parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/);
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const row = [];
    let inQuotes = false;
    let currentStr = '';
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        if (inQuotes && line[j+1] === '"') {
          currentStr += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(currentStr);
        currentStr = '';
      } else {
        currentStr += char;
      }
    }
    row.push(currentStr);
    result.push(row);
  }
  return result;
}

export default function App() {
  const [menu, setMenu] = useState(menuData.menu);
  const [activeCategory, setActiveCategory] = useState(menuData.menu[0]?.categoria || '');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // For size selection modal

  // Calculate cart totals
  const cartTotal = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.cantidad, 0);

  const addToCart = (product, size = null, price = null) => {
    const cartItem = {
      id: `${product.nombre}-${size || 'default'}`,
      nombre: product.nombre,
      tamano: size,
      precio: price || product.precio,
      cantidad: 1
    };

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItem.id);
      if (existing) {
        return prev.map(item => 
          item.id === cartItem.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, cartItem];
    });
    
    if (selectedProduct) setSelectedProduct(null); // Close modal after adding
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.cantidad + delta;
        return newQuantity > 0 ? { ...item, cantidad: newQuantity } : item;
      }
      return item;
    }).filter(item => item.cantidad > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getItemImage = (item, category) => {
    if (item.imagenUrl) return item.imagenUrl;
    if (category.categoria.toLowerCase().includes('promocion')) {
      const nameLower = item.nombre.toLowerCase();
      if (nameLower.includes('promo mediana')) return '/Promo Mediana.png';
      if (nameLower.includes('promo familiar')) return '/Promo Familiar.png';
      if (nameLower.includes('promo extra familiar')) return '/Promo Extra Familiar.png';
      if (nameLower.includes('dúo mediano') || nameLower.includes('duo mediano')) return '/Dúo Mediano.png';
      if (nameLower.includes('dúo extrafamiliar') || nameLower.includes('duo extrafamiliar') || nameLower.includes('duo extra familiar')) return '/Dúo Extra Familiar.png';
      if (nameLower.includes('súper promo') || nameLower.includes('super promo') || nameLower.includes('1 pizza extra fam')) return '/Súper Promo.png';
    }
    
    // Fallbacks premium de stock por categoría
    if (category.categoria.toLowerCase().includes('pizza')) {
      return 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80';
    }
    if (category.categoria.toLowerCase().includes('pasta') || category.categoria.toLowerCase().includes('lasagna') || category.categoria.toLowerCase().includes('calzone')) {
      return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80';
    }
    if (category.categoria.toLowerCase().includes('bebida') || category.categoria.toLowerCase().includes('cerveza') || category.categoria.toLowerCase().includes('coctel')) {
      return 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
  };

  const handleProductClick = (product, category) => {
    if (product.precios && category.tamanos) {
      setSelectedProduct({ product, category });
    } else {
      addToCart(product);
    }
  };

  const sendOrderToWhatsApp = () => {
    const phone = "51940986177";
    let text = `*¡Hola Alfredo's! Quiero hacer el siguiente pedido:* 🍕\n\n`;
    
    cart.forEach(item => {
      text += `• ${item.cantidad}x ${item.nombre} ${item.tamano ? `(${item.tamano})` : ''} - S/ ${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    
    text += `\n*Total a pagar: S/ ${cartTotal.toFixed(2)}*`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  useEffect(() => {
    const fetchSheetData = async () => {
      const sheetId = '1iTAA0NHRCGTpg7D_X20nOUH6bqmADiQ7oVQbzx88nFY';
      try {
        const fetchCSV = async (sheetName) => {
          const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error('Fetch failed');
          return await res.text();
        };

        let catsCSV = '';
        try {
          catsCSV = await fetchCSV('Categorías');
        } catch (e) {
          catsCSV = await fetchCSV('Categorias');
        }

        let platosCSV = '';
        try {
          platosCSV = await fetchCSV('Platos');
        } catch (e) {
          platosCSV = await fetchCSV('Hoja 2');
        }

        const catsRows = parseCSV(catsCSV);
        const platosRows = parseCSV(platosCSV);

        const categories = catsRows.slice(1).map(row => row[0]).filter(Boolean);
        const platos = platosRows.slice(1).map(row => ({
          categoria: row[0],
          nombre: row[1],
          descripcion: row[2],
          precio: parseFloat(row[3]),
          imagenUrl: row[4]
        })).filter(p => p.categoria && p.nombre);

        if (categories.length === 0 || platos.length === 0) return;

        const newMenu = categories.map(catName => {
          const catPlatos = platos.filter(p => p.categoria.toLowerCase() === catName.toLowerCase());
          const originalCat = menuData.menu.find(c => c.categoria.toLowerCase() === catName.toLowerCase());
          
          return {
            categoria: catName,
            descripcion_seccion: originalCat?.descripcion_seccion || '',
            tamanos: originalCat?.tamanos || null,
            items: catPlatos.map(p => {
              const originalItem = originalCat?.items.find(i => i.nombre.toLowerCase() === p.nombre.toLowerCase());
              const originalBasePrice = originalItem?.precios ? originalItem.precios.find(pr => pr !== null) : originalItem?.precio;
              const isPriceChanged = !isNaN(p.precio) && p.precio !== originalBasePrice;
              
              return {
                nombre: p.nombre,
                descripcion: p.descripcion,
                precio: isPriceChanged || !originalItem?.precios ? p.precio : undefined,
                precios: isPriceChanged ? null : originalItem?.precios,
                imagenUrl: p.imagenUrl || ''
              };
            })
          };
        });

        setMenu(newMenu);
      } catch (error) {
        console.error('Error loading sheet data, using local fallback:', error);
      }
    };

    fetchSheetData();
  }, []);

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentActive = menu[0]?.categoria || '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          currentActive = section.getAttribute('id');
        }
      });
      setActiveCategory(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 140; // Header height + Marquee
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[500px] bg-background min-h-screen relative shadow-2xl overflow-x-hidden">
        
        {/* Header */}
        <header className="sticky top-0 z-40 glass rounded-b-3xl">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="font-fredoka text-3xl text-primary tracking-wide">
              ALFREDO'S
            </h1>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/alfredos_pastas_pizzas/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform" style={{background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'}}>
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.308.977.978 1.245 2.244 1.307 3.61.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.33 2.633-1.308 3.608-.978.977-2.244 1.245-3.61 1.307-1.265.058-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-1.367-.062-2.633-.33-3.608-1.308-.977-.978-1.245-2.244-1.307-3.61-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.069-4.849.062-1.366.33-2.633 1.308-3.608.978-.977 2.244-1.245 3.61-1.307 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-1.28.058-2.508.274-3.497 1.262-.988.99-1.204 2.218-1.262 3.497-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.279.274 2.508 1.262 3.497.99.988 2.218 1.204 3.497 1.262 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.279-.058 2.508-.274 3.497-1.262.989-.99 1.205-2.218 1.262-3.497.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.279-.274-2.508-1.262-3.497-.99-.988-2.218-1.204-3.497-1.262-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/alfredospastasypizzas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://wa.me/51940986177" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>

          </div>

          {/* Banner Image */}
          <div className="px-4 pb-3">
            <img 
              src="/banner.png" 
              alt="Banner" 
              className="w-full h-auto object-contain rounded-2xl shadow-sm border border-gray-100/50" 
            />

          </div>
          
          {/* Categories Nav */}

          <div className="px-4 pb-4 overflow-x-auto no-scrollbar flex gap-2">
            {menu.map((cat, i) => (
              <button
                key={i}
                onClick={() => scrollToCategory(cat.categoria)}
                className={`whitespace-nowrap px-5 py-2 rounded-full font-oswald text-sm tracking-wider transition-all duration-300 ${
                  activeCategory === cat.categoria 
                    ? 'bg-secondary text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-100'
                }`}
              >
                {cat.categoria}
              </button>
            ))}
          </div>
        </header>

        {/* Infinity Marquee */}
        <div className="bg-accent text-gray-900 py-2 overflow-hidden flex whitespace-nowrap items-center border-y border-yellow-500/30">
          <div className="animate-marquee flex gap-4 items-center">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="font-oswald text-sm font-medium tracking-wide flex items-center gap-4">
                ¡DELICIOSAMENTE IRRESISTIBLE! • PASTAS & PIZZAS • ATENCIÓN DE 12PM A 12AM • HAPPY HOUR 2X1 EN CÓCTELES • 
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="px-4 py-6 pb-32">
          {menu.map((category, idx) => (
            <section key={idx} id={category.categoria} className="mb-10 scroll-mt-36">
              <h2 className="font-oswald text-2xl mb-1 text-gray-800">{category.categoria}</h2>
              {category.descripcion_seccion && (
                <p className="text-sm text-gray-500 mb-4 font-inter">{category.descripcion_seccion}</p>
              )}
              {!category.descripcion_seccion && <div className="h-4"></div>}
              
              {/* Subcategories (Pastas) */}
              {category.subcategorias ? (
                <div className="space-y-8">
                  {category.subcategorias.map((sub, subIdx) => (
                    <div key={subIdx}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-md border-2 border-accent/40">
                          <img src={sub.imagen} alt={sub.nombre} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-oswald text-lg text-gray-800 tracking-wide">{sub.nombre}</h3>
                          <p className="text-xs text-gray-400 font-inter">Elige tu salsa favorita</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {sub.items.map((item, itemIdx) => (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: itemIdx * 0.04 }}
                            whileHover={{ y: -3 }}
                            key={itemIdx}
                            className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 flex flex-col"
                          >
                            <div className="aspect-square bg-gray-50 overflow-hidden p-3">
                              <img 
                                src={sub.imagen} 
                                alt={item.nombre} 
                                className="w-full h-full object-cover rounded-2xl"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80';
                                }}
                              />
                            </div>
                            <div className="p-3 flex flex-col flex-1">
                              <h4 className="font-oswald text-sm text-gray-800 leading-tight mb-1 line-clamp-2">
                                {item.nombre}
                              </h4>
                              {item.descripcion && (
                                <p className="text-[10px] text-gray-400 font-inter mb-2 line-clamp-2 leading-snug flex-1">
                                  {item.descripcion}
                                </p>
                              )}
                              <div className="flex items-center justify-between mt-auto">
                                <span className="text-primary font-bold text-base font-oswald">
                                  S/.{item.precio.toFixed(2)}
                                </span>
                                <button 
                                  onClick={() => addToCart({ ...item, nombre: `${item.nombre} (${sub.nombre})` })}
                                  className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110"
                                >
                                  <Plus size={18} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Protein add-on banner */}
                  {category.nota_adicional && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-4 border border-accent/30 flex items-center gap-3"
                    >
                      <div className="bg-accent text-gray-900 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 font-oswald font-bold text-sm shadow-md">
                        +5.90
                      </div>
                      <p className="font-oswald text-sm text-gray-700 tracking-wide leading-snug">
                        {category.nota_adicional.replace('+ S/5.90 ', '')}
                      </p>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* Regular items - Vertical card layout */
                <div className="grid grid-cols-2 gap-3">
                  {category.items.map((item, itemIdx) => {
                    const isPromo = category.categoria.toLowerCase().includes('promocion');
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIdx * 0.04 }}
                        whileHover={{ y: -3 }}
                        key={itemIdx}
                        className={`bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 flex flex-col ${isPromo ? 'border-accent/30' : ''}`}
                      >
                        <div className="aspect-square bg-gray-50 overflow-hidden p-3">
                          <img 
                            src={getItemImage(item, category)} 
                            alt={item.nombre} 
                            className="w-full h-full object-cover rounded-2xl"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                          <h3 className="font-oswald text-sm text-gray-800 leading-tight mb-1 line-clamp-2">
                            {item.nombre}
                          </h3>
                          {item.descripcion && (
                            <p className="text-[10px] text-gray-400 font-inter mb-2 line-clamp-2 leading-snug flex-1">
                              {item.descripcion}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-primary font-bold text-base font-oswald">
                              {item.precio ? `S/.${item.precio.toFixed(2)}` : (
                                <span className="text-xs text-gray-500 font-medium font-inter">Desde S/.{Math.min(...item.precios.filter(p=>p)).toFixed(2)}</span>
                              )}
                            </span>
                            <button 
                              onClick={() => handleProductClick(item, category)}
                              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-200 hover:scale-110"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </section>
          ))}
        </main>

        {/* Floating Cart Button */}
        <AnimatePresence>
          {cartItemsCount > 0 && !isCartOpen && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-6 left-0 right-0 flex justify-center z-40 px-4 pointer-events-none"
            >
              <div className="w-full max-w-[460px] pointer-events-auto">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-full glass-dark text-white rounded-full p-4 flex items-center justify-between shadow-2xl hover:scale-[1.02] transition-transform shimmer"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                      {cartItemsCount}
                    </div>
                    <span className="font-oswald tracking-wide text-lg">VER PEDIDO</span>
                  </div>
                  <span className="font-bold text-xl">S/ {cartTotal.toFixed(2)}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Size Selection Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm max-w-[500px] mx-auto"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-0 w-full max-w-[500px] bg-white rounded-t-[32px] z-50 p-6 pb-8 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-titan text-2xl text-gray-800">{selectedProduct.product.nombre}</h3>
                    <p className="text-gray-500 text-sm mt-1">Selecciona el tamaño deseado</p>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="p-2 bg-gray-100 rounded-full text-gray-500">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {selectedProduct.category.tamanos.map((tamano, idx) => {
                    const price = selectedProduct.product.precios[idx];
                    if (!price) return null;
                    
                    return (
                      <button
                        key={tamano}
                        onClick={() => addToCart(selectedProduct.product, tamano, price)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-primary/30 hover:bg-red-50/50 transition-all group"
                      >
                        <span className="font-inter font-medium text-gray-800 group-hover:text-primary">{tamano}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-gray-800">S/ {price.toFixed(2)}</span>
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                            <Plus size={18} />
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Cart Modal */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm max-w-[500px] mx-auto"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-0 w-full max-w-[500px] bg-white rounded-t-[32px] z-50 p-6 pb-8 shadow-2xl flex flex-col max-h-[85vh]"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-titan text-2xl text-gray-800">Tu Pedido</h3>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500">
                    <X size={20} />
                  </button>
                </div>

                <div className="overflow-y-auto flex-1 mb-6 pr-2 no-scrollbar">
                  {cart.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Tu carrito está vacío</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800">{item.nombre}</h4>
                            {item.tamano && <p className="text-sm text-primary">{item.tamano}</p>}
                            <p className="font-bold text-gray-800 mt-2">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={18} />
                            </button>
                            <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-full border border-gray-200">
                              <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                                <Minus size={14} />
                              </button>
                              <span className="font-bold w-4 text-center">{item.cantidad}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white">
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-inter text-gray-500">Total a pagar</span>
                      <span className="font-titan text-3xl text-gray-800">S/ {cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={sendOrderToWhatsApp}
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 font-oswald tracking-wide text-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    >
                      ENVIAR PEDIDO A WHATSAPP
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Location Map Section */}
        <section className="px-4 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-50 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-oswald text-xl text-gray-800">ENCUÉNTRANOS</h2>
                <p className="text-xs text-gray-500 font-inter">Visítanos en nuestro local</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.84005327876!2d-77.1189375!3d-11.869937499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d3f598d8e67d%3A0xe56d6becd197a4a3!2sPizzeria%20Alfredo&#39;s%20pastas%20%26%20pizza!5e1!3m2!1ses!2spe!4v1777405998436!5m2!1ses!2spe" 
                width="100%" 
                height="250" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Pizzeria Alfredo's"
                className="w-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white px-6 py-8 text-center">
          <h3 className="font-fredoka text-2xl text-primary mb-2">ALFREDO'S</h3>
          <p className="text-gray-400 text-sm font-inter mb-1">Pastas & Pizzas</p>
          <p className="text-gray-500 text-xs font-inter mb-4">¡Deliciosamente irresistible!</p>
          
          <div className="flex justify-center gap-3 mb-5">
            <a href="https://www.instagram.com/alfredos_pastas_pizzas/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform" style={{background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'}}>
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.308.977.978 1.245 2.244 1.307 3.61.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.33 2.633-1.308 3.608-.978.977-2.244 1.245-3.61 1.307-1.265.058-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-1.367-.062-2.633-.33-3.608-1.308-.977-.978-1.245-2.244-1.307-3.61-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.069-4.849.062-1.366.33-2.633 1.308-3.608.978-.977 2.244-1.245 3.61-1.307 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-1.28.058-2.508.274-3.497 1.262-.988.99-1.204 2.218-1.262 3.497-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.279.274 2.508 1.262 3.497.99.988 2.218 1.204 3.497 1.262 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.279-.058 2.508-.274 3.497-1.262.989-.99 1.205-2.218 1.262-3.497.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.279-.274-2.508-1.262-3.497-.99-.988-2.218-1.204-3.497-1.262-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.facebook.com/alfredospastasypizzas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://wa.me/51940986177" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>

          <div className="text-gray-500 text-xs font-inter space-y-1 mb-4">
            <p>📍 Lunes a Domingos de 12:00PM a 12:00AM</p>
            <p>📞 +51 940 986 177</p>
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-600 text-xs font-inter">© 2025 Pizzeria Alfredo's. Todos los derechos reservados.</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
