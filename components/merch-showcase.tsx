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

// Checkout Modal Component
const CheckoutModal = ({
  isOpen,
  onClose,
  totalPrice,
  cartItems,
}: {
  isOpen: boolean
  onClose: () => void
  totalPrice: number
  cartItems: Array<{ item: MerchItem; quantity: number }>
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    couponCode: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      setError("Please enter your full name")
      return
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email")
      return
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number")
      return
    }
    if (!formData.address.trim()) {
      setError("Please enter your delivery address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/merchconfirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          cartItems,
          totalPrice,
          couponCode: formData.couponCode || undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send email")
      }

      setSuccess(true)

      setTimeout(() => {
        window.open("https://razorpay.me/@searchyourmerchllp", "_blank")
        onClose()
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          couponCode: "",
        })
        setSuccess(false)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-2xl max-w-md w-full border border-green-700/30 p-6 overflow-y-auto max-h-[90vh]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {success ? (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              Email Sent!
            </h3>
            <p className="text-gray-300 mb-4">
              Confirmation sent to <strong>{formData.email}</strong>
            </p>
            <p className="text-gray-400 text-sm">
              Redirecting to payment...
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 outline-none transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 outline-none transition-colors"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 outline-none transition-colors"
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 outline-none transition-colors resize-none"
              rows={3}
            />
            <input
              type="text"
              name="couponCode"
              placeholder="Coupon Code (Optional)"
              value={formData.couponCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 outline-none transition-colors"
            />

            {error && (
              <motion.div
                className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <div className="bg-gray-800 rounded-lg p-4 my-4">
              <h3 className="font-semibold text-white mb-3 text-sm">Order Summary</h3>
              <div className="space-y-2 text-xs text-gray-300">
                {cartItems.map(({ item, quantity }) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{quantity}</span>
                    <span>₹{(item.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between font-bold text-white">
                <span>Total</span>
                <span className="text-green-400">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:opacity-50 text-white font-bold py-2.5 rounded-lg transition-all"
            >
              {isLoading ? "Sending Email..." : "Send & Proceed to Payment →"}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        )}
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
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [couponCode, setCouponCode] = useState("")
const [discountApplied, setDiscountApplied] = useState(false)


  const filteredItems = useMemo(() => {
    return (merchData as MerchItem[]).filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
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
      const item = (merchData as MerchItem[]).find((m) => m.id === id)
      return item ? acc + item.price * qty : acc
    }, 0)

    const cartItems = Object.entries(cart).map(([id, qty]) => ({
      item: (merchData as MerchItem[]).find((m) => m.id === id)!,
      quantity: qty
    })).filter(({ item }) => item)

    return (
      <div className="min-h-screen text-white bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <button 
            onClick={() => setViewCartPage(false)} 
            className="mb-6 text-green-400 hover:text-green-300 font-bold flex items-center gap-2 transition-colors"
          >
            <span>&larr;</span> Back to Store
          </button>
          
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Your Cart
          </h1>
          
          {totalCartItems === 0 ? (
  <div className="text-center py-20">
    <ShoppingCart className="h-24 w-24 text-gray-600 mx-auto mb-4" />
    <p className="text-gray-400 text-xl">Your cart is empty.</p>
    <button 
      onClick={() => setViewCartPage(false)}
      className="mt-6 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold transition-colors"
    >
      Continue Shopping
    </button>
  </div>
) : (
  <div className="grid lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-4">
      {cartItems.map(({ item, quantity }) => (
        <div key={item.id} className="bg-gray-900 rounded-xl p-4 border border-green-700/20 flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Image 
              src={item.image} 
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-1 truncate">{item.name}</h3>
            <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-bold">₹{item.price.toLocaleString()}</span>
              <div className="flex items-center gap-3 bg-gray-800 rounded-lg p-1">
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-white font-semibold min-w-[2rem] text-center">{quantity}</span>
                <button 
                  onClick={() => addToCart(item.id)} 
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              const newCart = { ...cart }
              delete newCart[item.id]
              setCart(newCart)
            }}
            className="text-red-400 hover:text-red-300 transition-colors"
            aria-label="Remove item"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>

    <div className="lg:col-span-1">
      <div className="bg-gray-900 rounded-xl p-6 border border-green-700/20 sticky top-4">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

        {/* Coupon Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 mb-3"
          />
          <button
            onClick={() => {
              if (couponCode.trim().toUpperCase() === "TECHNICIA25") {
                setDiscountApplied(true)
              } else {
                setDiscountApplied(false)
                alert("Invalid coupon code")
              }
            }}
            className="w-full bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg font-bold text-white transition-colors"
          >
            Apply Coupon
          </button>
          {discountApplied && (
            <p className="text-green-400 text-sm mt-2">Coupon applied! You saved 10% 🎉</p>
          )}
        </div>

        <div className="space-y-3 mb-6 pb-6 border-b border-gray-800">
          <div className="flex justify-between text-gray-400">
            <span>Items ({totalCartItems})</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Shipping</span>
            <span className="text-green-400">Free</span>
          </div>
          {discountApplied && (
            <div className="flex justify-between text-gray-400">
              <span>Discount (10%)</span>
              <span className="text-green-400">-₹{(totalPrice * 0.1).toFixed(0)}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between text-xl font-bold mb-6">
          <span>Total</span>
          <span className="text-green-400">
            ₹{discountApplied ? (totalPrice * 0.9).toFixed(0) : totalPrice.toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => setShowCheckoutModal(true)}
          className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 px-6 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg text-white mb-6"
        >
          Proceed to Checkout →
        </button>

        <div className="mb-6">
          <p className="text-center text-sm text-gray-400 mb-4">Or scan QR code to pay</p>
          <div className="bg-white p-6 rounded-lg flex items-center justify-center">
            <div className="relative w-48 h-48">
              <Image 
                src="/qr.jpg"
                alt="Payment QR Code"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  </div>
)}

        </div>

        <CheckoutModal 
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          totalPrice={totalPrice}
          cartItems={cartItems}
        />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <main className="relative z-10 pt-8 pb-20">
        <div className="max-w-[75rem] mx-auto px-4 sm:px-6">
         <div className="text-center mb-12">
  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
    <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
      Tech Merch
    </span>
    <br />
    <span className="text-white">Made for the Digital Generation</span>
  </h1>
  <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
    Elevate your style with premium gear built for innovators, coders, and creators.
    <br />Exclusive designs that let your tech spirit shine.
  </p>
  <h2 className="text-xl font-semibold text-green-400 mb-8 animate-pulse">
    🎁 Use Code <span className="text-white">TECHNICIA25</span> for <span className="text-white">10% OFF</span> your order!
  </h2>

  <div className="relative max-w-md mx-auto mb-8">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search your favorite merch..."
      className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <Search className="absolute right-3 top-3.5 text-gray-400 h-5 w-5" />
  </div>
</div>


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