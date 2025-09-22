"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Star, Search, Plus, Minus, Heart, Eye, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type MerchItem = {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  rating: number
  reviews: number
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  featured: boolean
  tags: string[]
}

const merchData: MerchItem[] = [
  {
    id: "tech-hoodie",
    name: "Technicia'25 Premium Hoodie",
    description: "Ultra-soft premium hoodie with embroidered logo and tech-inspired design elements.",
    price: 2499,
    originalPrice: 3499,
    category: "apparel",
    image: "/premium-black-hoodie-with-tech-logo.jpg",
    rating: 4.8,
    reviews: 124,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Forest Green"],
    inStock: true,
    featured: true,
    tags: ["premium", "comfortable", "unisex"],
  },
  {
    id: "code-mug",
    name: "Developer's Code Mug",
    description: "Heat-reactive mug that reveals code snippets when hot liquid is poured.",
    price: 899,
    category: "accessories",
    image: "/black-ceramic-mug-with-code-patterns.jpg",
    rating: 4.6,
    reviews: 89,
    colors: ["Black", "White"],
    inStock: true,
    featured: false,
    tags: ["interactive", "ceramic", "gift"],
  },
  {
    id: "tech-backpack",
    name: "Smart Tech Backpack",
    description: "Water-resistant backpack with built-in USB charging port and laptop compartment.",
    price: 3999,
    originalPrice: 4999,
    category: "accessories",
    image: "/modern-black-backpack-with-tech-features.jpg",
    rating: 4.9,
    reviews: 156,
    colors: ["Black", "Charcoal"],
    inStock: true,
    featured: true,
    tags: ["functional", "waterproof", "charging"],
  },
  {
    id: "circuit-tshirt",
    name: "Circuit Board T-Shirt",
    description: "Minimalist design featuring circuit board patterns with glow-in-the-dark elements.",
    price: 1299,
    category: "apparel",
    image: "/black-t-shirt-with-circuit-board-design.jpg",
    rating: 4.5,
    reviews: 203,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Charcoal"],
    inStock: true,
    featured: false,
    tags: ["glow-in-dark", "minimal", "cotton"],
  },
  {
    id: "wireless-charger",
    name: "Technicia Wireless Charger",
    description: "Fast wireless charging pad with LED indicators and premium aluminum finish.",
    price: 1899,
    category: "tech",
    image: "/sleek-wireless-charging-pad-with-led-lights.jpg",
    rating: 4.7,
    reviews: 78,
    colors: ["Space Gray", "Silver"],
    inStock: false,
    featured: true,
    tags: ["fast-charging", "aluminum", "LED"],
  },
  {
    id: "sticker-pack",
    name: "Tech Sticker Pack",
    description: "Collection of 20 premium vinyl stickers featuring programming languages and tech logos.",
    price: 499,
    category: "accessories",
    image: "/colorful-tech-stickers-programming-languages.jpg",
    rating: 4.4,
    reviews: 312,
    inStock: true,
    featured: false,
    tags: ["vinyl", "waterproof", "collection"],
  },
]

const categories = [
  { id: "all", name: "All Items", count: merchData.length, icon: "🔥" },
  { id: "apparel", name: "Apparel", count: merchData.filter((i) => i.category === "apparel").length, icon: "👕" },
  { id: "accessories", name: "Accessories", count: merchData.filter((i) => i.category === "accessories").length, icon: "🎒" },
  { id: "tech", name: "Tech", count: merchData.filter((i) => i.category === "tech").length, icon: "💻" },
]

// Starfield background
const StarField = () => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number; speed: number }>>([])
  useEffect(() => {
    const newStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.1,
    }))
    setStars(newStars)
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.size}px`, height: `${s.size}px` }}
          animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity], scale: [1, 1.2, 1] }}
          transition={{ duration: 2 + s.speed, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
        />
      ))}
    </div>
  )
}

// Floating Cart Icon
const FloatingCartIcon = ({ count, onClick }: { count: number; onClick: () => void }) => (
  <motion.div className="fixed bottom-8 right-8 z-50" initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={onClick}>
    <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 cursor-pointer">
      <ShoppingCart className="h-8 w-8 text-white" />
      {count > 0 && (
        <motion.span
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {count}
        </motion.span>
      )}
    </div>
  </motion.div>
)

// Product Modal
const ProductModal = ({
  item,
  onClose,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}: {
  item: MerchItem
  onClose: () => void
  onAddToCart: (id: string) => void
  onToggleWishlist: (id: string) => void
  wishlist: string[]
}) => {
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0] || "")
  const [selectedColor, setSelectedColor] = useState(item.colors?.[0] || "")
  const [quantity, setQuantity] = useState(1)

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-green-700/30 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-800/80 p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative h-80 md:h-auto">
            <Image src={item.image} alt={item.name} fill className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
          </div>
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{item.name}</h2>
              <button
                onClick={() => onToggleWishlist(item.id)}
                className={`p-2 rounded-full ${wishlist.includes(item.id) ? "bg-red-500/20 text-red-500" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
              >
                <Heart className={`h-5 w-5 ${wishlist.includes(item.id) ? "fill-current" : ""}`} />
              </button>
            </div>
            <p className="text-gray-300 mb-6">{item.description}</p>

            {item.sizes && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {item.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        selectedSize === size ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {item.colors && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {item.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        selectedColor === color ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-green-400">₹{item.price.toLocaleString()}</span>
                {item.originalPrice && <span className="text-lg text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>}
              </div>
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 text-gray-400 hover:text-white rounded">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-white font-semibold min-w-[2rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 text-gray-400 hover:text-white rounded">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              onClick={() => {
                for (let i = 0; i < quantity; i++) onAddToCart(item.id)
                onClose()
              }}
              disabled={!item.inStock}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item.inStock ? `Add ${quantity} to Cart` : "Out of Stock"}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MerchShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null)
  const [viewCartPage, setViewCartPage] = useState(false)

  const filteredItems = useMemo(() => {
    return merchData.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const addToCart = (itemId: string) => setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) newCart[itemId]--
      else delete newCart[itemId]
      return newCart
    })
  }
  const toggleWishlist = (itemId: string) => setWishlist((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  const totalCartItems = Object.values(cart).reduce((sum, count) => sum + count, 0)

  if (viewCartPage) {
    const totalPrice = Object.entries(cart).reduce((acc, [id, qty]) => {
      const item = merchData.find((m) => m.id === id)
      return item ? acc + item.price * qty : acc
    }, 0)

    return (
      <div className="p-6 min-h-screen bg-gray-950 text-white">
        <button onClick={() => setViewCartPage(false)} className="mb-4 text-green-400 font-bold">
          &larr; Back to Store
        </button>
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {totalCartItems === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {Object.entries(cart).map(([id, qty]) => {
              const item = merchData.find((m) => m.id === id)!
              return (
                <div key={id} className="flex justify-between items-center border-b border-gray-700 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20">
                      <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">{item.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => removeFromCart(id)} className="bg-gray-700 px-2 py-1 rounded">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span>{qty}</span>
                        <button onClick={() => addToCart(id)} className="bg-gray-700 px-2 py-1 rounded">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-green-400 font-semibold mt-1">₹{item.price * qty}</p>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(id)} className="text-red-500 hover:text-red-400">
                    Remove
                  </button>
                </div>
              )
            })}
            <div className="mt-6 flex justify-end items-center gap-6">
              <span className="text-xl font-bold">Total: ₹{totalPrice}</span>
              <Button className="bg-green-600 hover:bg-green-500">Proceed to Payment</Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gray-950 text-white overflow-hidden">
      <StarField />
      <main className="relative z-10 pt-8 pb-20">
        <div className="max-w-[75rem] mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">Tech Merch</span>
              <br />
              <span className="text-white">For The Digital Generation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Premium merchandise designed for tech enthusiasts. Express your passion with our exclusive collection.
            </p>
            {/* Search Input */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Product Grid */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" layout>
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-green-700/20 group relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)" }}
                  layout
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.button onClick={() => setSelectedItem(item)} className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Eye className="h-5 w-5" />
                      </motion.button>
                      <motion.button onClick={() => toggleWishlist(item.id)} className={`backdrop-blur-sm p-3 rounded-full transition-colors ${wishlist.includes(item.id) ? "bg-red-500/80 text-white" : "bg-white/20 text-white hover:bg-white/30"}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Heart className={`h-5 w-5 ${wishlist.includes(item.id) ? "fill-current" : ""}`} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-bold text-green-400">₹{item.price.toLocaleString()}</span>
                      {item.originalPrice && <span className="text-md text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      {cart[item.id] ? (
                        <div className="flex items-center gap-3 bg-green-600 rounded-lg p-2">
                          <motion.button onClick={() => removeFromCart(item.id)} className="text-white hover:bg-green-700 p-1 rounded" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          <span className="text-white font-semibold min-w-[2rem] text-center">{cart[item.id]}</span>
                          <motion.button onClick={() => addToCart(item.id)} className="text-white hover:bg-green-700 p-1 rounded" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Plus className="h-4 w-4" />
                          </motion.button>
                        </div>
                      ) : (
                        <motion.button onClick={() => addToCart(item.id)} disabled={!item.inStock} className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 ${item.inStock ? "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`} whileHover={item.inStock ? { scale: 1.02 } : {}} whileTap={item.inStock ? { scale: 0.98 } : {}}>
                          {item.inStock ? "Add to Cart" : "Out of Stock"}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <FloatingCartIcon count={totalCartItems} onClick={() => setViewCartPage(true)} />

      <AnimatePresence>{selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />}</AnimatePresence>
    </div>
  )
}
