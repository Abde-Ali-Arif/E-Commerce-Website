"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function ContactPage() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    showToast("Message sent! Our support team will reply within 2 hours.", "success");
    setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
  };

  const faqs = [
    {
      q: "How long does standard delivery take?",
      a: "Standard delivery typically arrives in 3-5 business days. If you select Express Air Dispatch at checkout, your package will arrive in 1-2 business days.",
    },
    {
      q: "What is your return & refund policy?",
      a: "We offer a 30-day risk-free return window for all unused items in their original packaging. Once our warehouse receives the returned item, your refund is processed within 24-48 hours.",
    },
    {
      q: "How can I track my order in real-time?",
      a: "As soon as your order is dispatched, you will receive an SMS and email notification containing your unique tracking link and courier details.",
    },
    {
      q: "What payment methods are supported?",
      a: "We accept all major Credit/Debit cards (Visa, Mastercard, RuPay, Amex), UPI (Google Pay, PhonePe, Paytm), Net Banking across 50+ Indian banks, and Cash on Delivery (COD).",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 space-y-12">
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-3 py-1 rounded-full">
            24/7 Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How Can We Help You Today?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Have questions regarding an order, product specifications, or partnerships? Reach out to our dedicated concierge team.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Direct Channels</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Email Support</h4>
                    <p className="text-xs text-gray-500 mt-0.5">support@marketly.store</p>
                    <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Avg response time: &lt; 2 hrs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Phone Hotline</h4>
                    <p className="text-xs text-gray-500 mt-0.5">+91 (800) 425-9800</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Toll-free, Mon - Sat 9am to 9pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Headquarters</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Marketly Commerce Towers, 100 Feet Road, Indiranagar, Bengaluru 560038
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" /> Frequently Asked Questions
              </h2>

              <div className="divide-y divide-gray-100">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-3 first:pt-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-gray-800 hover:text-indigo-600 transition py-1 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          openFaq === idx ? "rotate-180 text-indigo-600" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <p className="text-xs text-gray-500 leading-relaxed pt-2">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Send Us a Message</h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill out the form below and an agent will reach out shortly.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">Message Delivered!</h3>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for reaching out. We have assigned ticket #MKT-SRV to your inquiry.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Iyer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Subject / Topic *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>Order Status & Tracking</option>
                    <option>Returns & Exchanges</option>
                    <option>Product Warranty & Support</option>
                    <option>Wholesale & Corporate Orders</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide details about your query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-gray-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
