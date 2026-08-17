import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
  <div className="min-h-screen bg-white text-slate-800">

    {/* Hero Section */}
    <section className="relative py-18 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
          About <span className="text-green-600">GoCart Plus</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto">
          Your trusted multi-vendor marketplace bringing you the best gadgets at prices you'll love.
          We connect amazing sellers with smart shoppers worldwide.
        </p>
      </div>
    </section>


    {/* Our Story */}
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight mb-8">
            Our Story
          </h2>
          <div className="space-y-5 text-slate-500 leading-relaxed">
            <p>
              Founded with a vision to revolutionize online shopping, GoCart Plus
              began as a small team of tech enthusiasts who believed everyone
              deserves access to quality gadgets at fair prices.
            </p>
            <p>
              Today, we've grown into a thriving multi-vendor marketplace connecting
              thousands of sellers with millions of customers worldwide.
            </p>
            <p>
              From smartphones to innovative home gadgets, we carefully curate
              our marketplace to ensure you get only the best.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 shadow-sm hover:shadow-md transition duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Innovation First</h3>
              <p className="text-slate-500 text-sm">
                We bring you the latest tech innovations from around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    {/* Stats */}
    <section className="py-24 border-t border-b border-slate-100 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {[
          { value: "10K+", label: "Happy Customers" },
          { value: "500+", label: "Trusted Vendors" },
          { value: "50K+", label: "Products Listed" },
          { value: "99.8%", label: "Customer Satisfaction" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-4xl font-semibold text-slate-900 mb-2">
              {stat.value}
            </div>
            <div className="text-slate-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>


    {/* Mission & Values */}
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">
            Our Mission & Values
          </h2>
          <p className="text-slate-500 text-lg">
            What drives us every day
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Customer First",
              desc: "Every decision we make puts our customers at the center."
            },
            {
              title: "Quality Assured",
              desc: "We carefully vet vendors to ensure only premium quality."
            },
            {
              title: "Community Driven",
              desc: "Building a strong ecosystem of sellers and buyers."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>


    {/* Team */}
    <section className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold tracking-tight mb-4">
          Meet Our Team
        </h2>
        <p className="text-slate-500 mb-16">
          The passionate people behind GoCart Plus
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { name: "Arbazz Siddique", role: "CEO & Founder", initials: "AS" },
            { name: "Alice Davis", role: "CTO", initials: "AD" },
            { name: "Mike Johnson", role: "Head of Operations", initials: "MJ" },
          ].map((member, i) => (
            <div key={i}>
              <div className="w-28 h-28 bg-slate-200 rounded-full mx-auto mb-6 flex items-center justify-center text-slate-600 text-xl font-semibold">
                {member.initials}
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-slate-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>


    {/* CTA */}
    <section className="py-16 text-center bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-semibold tracking-tight mb-6">
          Ready to Start Shopping?
        </h2>
        <p className="text-slate-500 text-lg mb-10">
          Join thousands of happy customers and discover amazing deals today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <button className="px-8 py-3 rounded-full bg-slate-900 text-white font-medium hover:opacity-90 transition">
              Browse Products
            </button>
          </Link>

          <Link href="/create-store">
            <button className="px-8 py-3 rounded-full border border-slate-300 text-slate-800 font-medium hover:bg-slate-100 transition">
              Become a Vendor
            </button>
          </Link>
        </div>
      </div>
    </section>

  </div>
);
}