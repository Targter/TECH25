// components/CheckoutModal.tsx
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  totalPrice: number
  cartItems: Array<{
    item: {
      id: string
      name: string
      price: number
    }
    quantity: number
  }>
}

export const CheckoutModal = ({
  isOpen,
  onClose,
  totalPrice,
  cartItems,
}: CheckoutModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    couponCode: '',
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
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

    // Validation
    if (!formData.fullName.trim()) {
      setError('Please enter your full name')
      return
    }
    if (!formData.email.trim()) {
      setError('Please enter your email')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number')
      return
    }
    if (!formData.address.trim()) {
      setError('Please enter your delivery address')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Send order confirmation email
      const emailResponse = await fetch('/api/send-order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json()
        throw new Error(errorData.error || 'Failed to send confirmation email')
      }

      const result = await emailResponse.json()
      console.log('Order confirmation sent:', result)

      setSuccess(true)

      // Redirect to payment after 2 seconds
      setTimeout(() => {
        window.open('https://razorpay.me/@searchyourmerchllp', '_blank')
        onClose()
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          couponCode: '',
        })
        setSuccess(false)
      }, 2000)
    } catch (err) {
      console.error('Checkout error:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to process your order. Please try again.'
      )
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
        className="bg-gray-900 rounded-2xl max-w-2xl w-full border border-green-700/30 p-6 overflow-y-auto max-h-[90vh]"
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
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              Order Confirmed!
            </h3>
            <p className="text-gray-300 mb-4">
              Confirmation email sent to <strong>{formData.email}</strong>
            </p>
            <p className="text-gray-400 text-sm">
              Redirecting to payment...
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                placeholder="+91"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Delivery Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-colors resize-none"
                placeholder="Enter your complete delivery address"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Coupon Code (Optional)
              </label>
              <input
                type="text"
                name="couponCode"
                value={formData.couponCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:outline-none transition-colors"
                placeholder="Enter coupon code if you have one"
              />
            </div>

            {error && (
              <motion.div
                className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <div className="bg-gray-800 rounded-lg p-4 my-6">
              <h3 className="font-semibold text-white mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm text-gray-300">
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
              className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Proceed to Payment →'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              You will receive a confirmation email and be redirected to payment
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}