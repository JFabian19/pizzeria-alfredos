import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, Trash2, ChevronRight } from 'lucide-react';

import { menuData } from './data';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(menuData.menu[0].categoria);
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

  const handleProductClick = (product, category) => {
    if (product.precios && category.tamanos) {
      setSelectedProduct({ product, category });
    } else {
      addToCart(product);
    }
  };

  const sendOrderToWhatsApp = () => {
    const phone = "51999999999"; // Replace with actual number
    let text = `*¡Hola Alfredo's! Quiero hacer el siguiente pedido:* 🍕\n\n`;
    
    cart.forEach(item => {
      text += `• ${item.cantidad}x ${item.nombre} ${item.tamano ? `(${item.tamano})` : ''} - S/ ${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    
    text += `\n*Total a pagar: S/ ${cartTotal.toFixed(2)}*`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentActive = menuData.menu[0].categoria;
      
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
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm hover:scale-105 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.33 3.608 1.308.977.978 1.245 2.244 1.307 3.61.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.33 2.633-1.308 3.608-.978.977-2.244 1.245-3.61 1.307-1.265.058-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-1.367-.062-2.633-.33-3.608-1.308-.977-.978-1.245-2.244-1.307-3.61-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.069-4.849.062-1.366.33-2.633 1.308-3.608.978-.977 2.244-1.245 3.61-1.307 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-1.28.058-2.508.274-3.497 1.262-.988.99-1.204 2.218-1.262 3.497-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.279.274 2.508 1.262 3.497.99.988 2.218 1.204 3.497 1.262 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.279-.058 2.508-.274 3.497-1.262.989-.99 1.205-2.218 1.262-3.497.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.279-.274-2.508-1.262-3.497-.99-.988-2.218-1.204-3.497-1.262-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm hover:scale-105 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/>
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
            {menuData.menu.map((cat, i) => (
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
          {menuData.menu.map((category, idx) => (
            <section key={idx} id={category.categoria} className="mb-10 scroll-mt-36">
              <h2 className="font-oswald text-2xl mb-1 text-gray-800">{category.categoria}</h2>
              {category.descripcion_seccion && (
                <p className="text-sm text-gray-500 mb-4 font-inter">{category.descripcion_seccion}</p>
              )}
              {!category.descripcion_seccion && <div className="h-4"></div>}
              
              <div className="grid gap-4">
                {category.items.map((item, itemIdx) => {
                  const isPromo = category.categoria.toLowerCase().includes('promocion');
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIdx * 0.05 }}
                      whileHover={{ y: -4 }}
                      key={itemIdx}
                      className={`bg-white rounded-[24px] p-4 flex justify-between items-center shadow-sm border border-gray-50 ${isPromo ? 'border-accent/50 bg-yellow-50/30' : ''}`}
                    >
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-center text-[10px] text-gray-400 border border-dashed border-gray-200 flex-shrink-0 mr-3 font-inter leading-tight p-1">
                        aca va aimagen
                      </div>
                      <div className="flex-1 pr-2">

                        <h3 className="font-titan text-lg text-gray-800 mb-1 leading-tight">{item.nombre}</h3>
                        {item.descripcion && (
                          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{item.descripcion}</p>
                        )}
                        <div className="text-primary font-bold">
                          {item.precio ? `S/ ${item.precio.toFixed(2)}` : (
                            <span className="text-sm text-gray-500 font-medium">Desde S/ {Math.min(...item.precios.filter(p=>p)).toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleProductClick(item, category)}
                        className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-colors flex-shrink-0 border border-gray-100"
                      >
                        <Plus size={24} />
                      </button>
                    </motion.div>
                  )
                })}
              </div>
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
                              onClick={() => updateQuantity(item.id, -item.cantidad)}
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

      </div>
    </div>
  );
}
