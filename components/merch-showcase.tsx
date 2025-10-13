"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Search, Plus, Minus, Heart, X } from "lucide-react"
import Image from "next/image"
import { merchData } from "@/lib/constants"

type MerchItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  tags: string[]
}

const categories = [
  { id: "all", name: "All Items" },
  { id: "tshirts", name: "T-Shirts" },
  { id: "bottles", name: "Bottles" },
  { id: "bags", name: "Bags" },
  { id: "diary", name: "Diary" },
]

// Floating Cart Icon
const FloatingCartIcon = ({ count, onClick }: { count: number; onClick: () => void }) => (
  <motion.div className="fixed bottom-8 right-8 z-50" initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={onClick}>
    <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
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
          className="absolute top-4 right-4 z-10 bg-gray-800/80 p-2 rounded-full"
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
                className={`p-2 rounded-full ${wishlist.includes(item.id) ? "bg-red-500/20 text-red-500" : "bg-gray-800 text-gray-400"}`}
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
                        selectedSize === size ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300"
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
                        selectedColor === color ? "bg-green-600 text-white" : "bg-gray-800 text-gray-300"
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
              </div>
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 text-gray-400 rounded">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-white font-semibold min-w-[2rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1 text-gray-400 rounded">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) onAddToCart(item.id)
                onClose()
              }}
              disabled={!item.inStock}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item.inStock ? `Add ${quantity} to Cart` : "Out of Stock"}
            </button>
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
      <div className="p-6 min-h-screen text-white">
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
                      <p className="text-green-400 font-semibold mt-1">₹{(item.price * qty).toLocaleString()}</p>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(id)} className="text-red-500">
                    Remove
                  </button>
                </div>
              )
            })}
            <div className="mt-6 flex justify-end items-center gap-6">
              <span className="text-xl font-bold">Total: ₹{totalPrice.toLocaleString()}</span>
              <button className="bg-green-600 px-6 py-2 rounded-lg font-bold">Proceed to Payment</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <main className="relative z-10 pt-8 pb-20">
        <div className="max-w-[75rem] mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">Tech Merch</span>
              <br />
              <span className="text-white">For The Digital Generation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Premium merchandise designed for tech enthusiasts. Express your passion with our exclusive collection.
            </p>
            
            {/* Search Input */}
            <div className="relative max-w-md mx-auto mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-3.5 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" layout>
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-green-700/20"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  layout
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.button onClick={() => toggleWishlist(item.id)} className={`backdrop-blur-sm p-3 rounded-full ${wishlist.includes(item.id) ? "bg-red-500/80 text-white" : "bg-white/20 text-white"}`}>
                        <Heart className={`h-5 w-5 ${wishlist.includes(item.id) ? "fill-current" : ""}`} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-bold text-green-400">₹{item.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {cart[item.id] ? (
                        <div className="flex items-center gap-3 bg-green-600 rounded-lg p-2 w-full justify-center">
                          <button onClick={() => removeFromCart(item.id)} className="text-white p-1 rounded">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-white font-semibold min-w-[2rem] text-center">{cart[item.id]}</span>
                          <button onClick={() => addToCart(item.id)} className="text-white p-1 rounded">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item.id)} disabled={!item.inStock} className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${item.inStock ? "bg-gradient-to-r from-green-500 to-green-700 text-white" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}>
                          {item.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      <FloatingCartIcon count={totalCartItems} onClick={() => setViewCartPage(true)} />

      <AnimatePresence>{selectedItem && <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} wishlist={wishlist} />}</AnimatePresence>
    </div>
  )
}