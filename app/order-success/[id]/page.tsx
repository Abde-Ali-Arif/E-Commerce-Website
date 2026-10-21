"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Printer,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { OrderDetails } from "../../types";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Fire confetti cannon
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4f46e5", "#10b981", "#f59e0b", "#ec4899"],
      });
    } catch (e) {
      console.error(e);
    }

    // Retrieve order details from localStorage
    try {
      const stored = localStorage.getItem(`marketly_order_${orderId}`);
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Celebration Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/60 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight pt-2">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              We've received your order and are preparing it for express dispatch. A confirmation email has been sent to{" "}
              <strong className="text-gray-800">{order?.shippingAddress.email || "your email"}</strong>.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-2xl text-xs font-semibold text-gray-700">
            <span>Order Reference:</span>
            <span className="font-mono font-bold text-indigo-600 text-sm">
              #{orderId}
            </span>
          </div>

          {/* Delivery Tracker Simulation */}
          <div className="pt-8 border-t border-gray-100 max-w-2xl mx-auto">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  ✓
                </div>
                <p className="text-[11px] font-bold text-gray-900 mt-2">Placed</p>
                <p className="text-[10px] text-gray-400">Today</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm ring-4 ring-indigo-100">
                  <Package className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-bold text-indigo-600 mt-2">Processing</p>
                <p className="text-[10px] text-indigo-500">In Hub</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
                  <Truck className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-bold text-gray-400 mt-2">Shipped</p>
                <p className="text-[10px] text-gray-400">Pending</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
                  🏠
                </div>
                <p className="text-[11px] font-bold text-gray-400 mt-2">Delivered</p>
                <p className="text-[10px] text-gray-400">{order?.estimatedDelivery || "In 3 days"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-gray-900 pb-4 border-b border-gray-100">
              Purchased Items ({order.items.length})
            </h2>

            {/* Items List */}
            <div className="divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ""} {item.selectedSize ? `• ${item.selectedSize}` : ""}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm font-extrabold text-gray-900 shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Information Grid: Address, Method, Payment, Financials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100 text-xs">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl space-y-1.5 border border-gray-100">
                  <div className="flex items-center gap-1.5 font-bold text-gray-900">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" /> Delivery Address
                  </div>
                  <p className="text-gray-800 font-semibold">{order.shippingAddress.fullName}</p>
                  <p className="text-gray-600">{order.shippingAddress.street}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-1 border border-gray-100">
                  <div className="flex items-center gap-1.5 font-bold text-gray-900">
                    <CreditCard className="w-3.5 h-3.5 text-indigo-600" /> Payment & Dispatch
                  </div>
                  <p className="text-gray-600 capitalize">
                    Payment Method: <strong className="text-gray-800">{order.paymentMethod.toUpperCase()}</strong>
                  </p>
                  <p className="text-gray-600">
                    Delivery Speed: <strong className="text-gray-800">{order.shippingMethod.toUpperCase()}</strong> ({order.estimatedDelivery})
                  </p>
                </div>
              </div>

              {/* Price summary */}
              <div className="p-4 bg-gray-50 rounded-2xl space-y-2.5 border border-gray-100 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">₹{order.subtotal.toLocaleString()}</span>
                  </div>

                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({order.couponCode || "Coupon"})</span>
                      <span>-₹{order.discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Fee</span>
                    <span>{order.shippingFee === 0 ? "FREE" : `₹${order.shippingFee.toLocaleString()}`}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>GST / Taxes</span>
                    <span className="font-bold text-gray-900">₹{order.taxAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-3 border-t border-gray-200 text-sm font-extrabold text-gray-900">
                  <span>Total Paid</span>
                  <span className="text-indigo-600 text-base">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print Order Receipt
              </button>

              <Link
                href="/products"
                className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                Continue Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
