"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ChevronLeft,
  Smartphone,
  Building,
  Banknote,
  Package,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { OrderDetails, ShippingAddress } from "../types";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, tax, total, appliedCoupon, clearCart } = useCart();
  const { showToast } = useToast();

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express" | "priority">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking" | "cod">("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Address Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    street: "42, Silicon Heights, 100 Feet Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560038",
    country: "India",
  });

  // Card details state
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8892");
  const [cardExpiry, setCardExpiry] = useState("08/28");
  const [cardCvv, setCardCvv] = useState("742");
  const [upiId, setUpiId] = useState("aarav@okhdfcbank");

  const shippingCost =
    shippingMethod === "standard" ? 0 : shippingMethod === "express" ? 199 : 399;

  const grandTotal = total + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Items to Checkout</h2>
        <p className="text-xs text-gray-500 mb-6">
          Your cart is currently empty. Please add some products to proceed with checkout.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `MKT-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDetails: OrderDetails = {
        orderId,
        orderDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        items: [...cart],
        shippingAddress: formData,
        shippingMethod,
        shippingFee: shippingCost,
        paymentMethod,
        subtotal,
        discountAmount: discount,
        taxAmount: tax,
        total: grandTotal,
        couponCode: appliedCoupon?.code,
        status: "Confirmed",
        estimatedDelivery:
          shippingMethod === "priority"
            ? "Today by 8:00 PM"
            : shippingMethod === "express"
            ? "Tomorrow by 2:00 PM"
            : "In 3-4 Business Days",
      };

      try {
        localStorage.setItem(`marketly_order_${orderId}`, JSON.stringify(orderDetails));
      } catch (err) {
        console.error(err);
      }

      clearCart();
      setIsProcessing(false);
      showToast(`Order ${orderId} placed successfully!`, "success");
      router.push(`/order-success/${orderId}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Checkout Header */}
      <div className="bg-white border-b border-gray-200/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-indigo-600 transition"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Secure Checkout
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Multi-Step Forms */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Shipping Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <h2 className="text-base font-bold text-gray-900">
                    Shipping & Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Mobile Number (For Delivery SMS Updates) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Street Address & Apartment / Suite *
                    </label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Postal PIN Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Speed Option */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <h2 className="text-base font-bold text-gray-900">
                    Delivery Speed Options
                  </h2>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setShippingMethod("standard")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${
                      shippingMethod === "standard"
                        ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === "standard"}
                        onChange={() => setShippingMethod("standard")}
                        className="w-4 h-4 text-indigo-600 accent-indigo-600"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Standard Insured Delivery</p>
                        <p className="text-[11px] text-gray-500">Estimated 3-5 business days</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">FREE</span>
                  </label>

                  <label
                    onClick={() => setShippingMethod("express")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${
                      shippingMethod === "express"
                        ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="w-4 h-4 text-indigo-600 accent-indigo-600"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Express Air Courier</p>
                        <p className="text-[11px] text-gray-500">Guaranteed 1-2 business days delivery</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-900">+₹199</span>
                  </label>

                  <label
                    onClick={() => setShippingMethod("priority")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition cursor-pointer ${
                      shippingMethod === "priority"
                        ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod === "priority"}
                        onChange={() => setShippingMethod("priority")}
                        className="w-4 h-4 text-indigo-600 accent-indigo-600"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900">Same-Day Priority Express</p>
                        <p className="text-[11px] text-gray-500">Delivered today by 8:00 PM</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-900">+₹399</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Method Simulation */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <h2 className="text-base font-bold text-gray-900">
                    Payment Method
                  </h2>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition text-center cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold"
                        : "border-gray-200 hover:border-gray-300 text-gray-700 font-medium"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs">Credit/Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition text-center cursor-pointer ${
                      paymentMethod === "upi"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold"
                        : "border-gray-200 hover:border-gray-300 text-gray-700 font-medium"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition text-center cursor-pointer ${
                      paymentMethod === "netbanking"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold"
                        : "border-gray-200 hover:border-gray-300 text-gray-700 font-medium"
                    }`}
                  >
                    <Building className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs">Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition text-center cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold"
                        : "border-gray-200 hover:border-gray-300 text-gray-700 font-medium"
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs">Cash on Delivery</span>
                  </button>
                </div>

                {/* Sub-form based on selection */}
                {paymentMethod === "card" && (
                  <div className="p-4 bg-gray-50 rounded-2xl space-y-3 border border-gray-200/80">
                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono text-gray-900 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono text-gray-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">
                          CVV Security Code
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          maxLength={4}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono text-gray-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="p-4 bg-gray-50 rounded-2xl space-y-2 border border-gray-200/80">
                    <label className="text-[11px] font-bold text-gray-700 block">
                      Virtual Payment Address (VPA / UPI ID)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 outline-none"
                    />
                    <p className="text-[10px] text-gray-500">
                      You will receive a payment request notification on your UPI app (Google Pay, PhonePe, Paytm).
                    </p>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 text-xs text-gray-600">
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Choose Your Bank
                    </label>
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 outline-none cursor-pointer">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
                    <p className="font-bold">Pay with Cash on Delivery</p>
                    <p className="text-[11px]">
                      Please keep exact cash or UPI QR scanner ready when the delivery executive arrives at your doorstep.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary Recap */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 shadow-sm space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">Your Order ({cart.length} items)</h3>
                <Link href="/cart" className="text-xs font-bold text-indigo-600 hover:underline">
                  Edit Cart
                </Link>
              </div>

              {/* Items Mini List */}
              <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 pr-1 space-y-2">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">{item.product.name}</p>
                        <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-gray-900 shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2.5 text-xs text-gray-600 pt-4 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod.toUpperCase()})</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingCost.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-bold text-gray-900">₹{tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-200 text-base font-extrabold text-gray-900">
                  <span>Grand Total</span>
                  <span className="text-indigo-600 text-xl font-extrabold">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Authorizing Payment...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Place Order (₹{grandTotal.toLocaleString()})
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-gray-400">
                By clicking "Place Order", you agree to Marketly's Terms & Conditions.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
