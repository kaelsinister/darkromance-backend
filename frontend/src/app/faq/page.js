"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "What is DarkRomance.ai?",
      answer:
        "DarkRomance.ai is an AI-powered storytelling platform that generates immersive dark romance stories tailored to your preferences.",
    },
    {
      question: "Is DarkRomance.ai free to use?",
      answer:
        "We offer a free tier with limited story generations per month. Premium plans unlock more stories, customization, and spice levels.",
    },
    {
      question: "Can I customize my story?",
      answer:
        "Yes! You can personalize character names, traits, tropes, and more to make your story uniquely yours.",
    },
    {
      question: "What are the available spice levels?",
      answer:
        "You can choose from Mild, Medium, or High spice levels, tailoring the intensity of romance in your story.",
    },
    {
      question: "How does the subscription model work?",
      answer:
        "We offer multiple tiers: Free, Basic ($7/month), Premium ($12/month), and Unlimited ($30/month), each with varying story limits and customization options.",
    },
    {
      question: "Can I continue a story I've generated?",
      answer:
        "Yes! DarkRomance.ai allows you to continue your story, keeping consistency with previously generated details.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach us via the Contact page for any questions or support inquiries.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-12">
        {/* FAQ Content */}
        <h1 className="text-4xl text-red-400 font-bold mb-8 tracking-wide">
          Frequently Asked Questions
        </h1>
        <div className="bg-gray-900 p-8 max-w-3xl w-full rounded-xl shadow-lg border border-gray-700">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-700 pb-4 transition-all duration-300"
              >
                <button
                  className={`w-full text-left flex justify-between items-center text-lg font-medium transition-all duration-300 ${
                    openIndex === index ? "text-red-400" : "text-gray-300 hover:text-gray-200"
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span
                    className={`transition-transform duration-200 ${
                      openIndex === index ? "rotate-180 text-red-400" : "text-gray-500"
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
