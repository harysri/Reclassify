import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using react-router

const About = () => {
  return (
    <div className="min-h-screen bg-[#fcfdfa] font-sans text-emerald-950">
      {/* Hero Section */}
      <section className="bg-emerald-50 border-b-4 border-emerald-950 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white border-2 border-emerald-950 px-4 py-1 rounded-full shadow-[4px_4px_0px_rgba(6,78,59,1)]">
            <span className="font-bold text-sm uppercase tracking-wider text-emerald-900">
              Our Mission
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] text-emerald-950 max-w-4xl">
            REDEFINING <span className="text-emerald-600">WASTE</span> FOR A
            BETTER WORLD
          </h1>
          <p className="text-xl md:text-2xl text-emerald-800 max-w-2xl leading-relaxed font-medium">
            We believe that responsible disposal shouldn't be a chore. It should
            be a highly rewarding, seamless experience that actively builds a
            cleaner planet.
          </p>
        </div>
      </section>

      {/* The Problem & Solution Section */}
      <section className="py-28 px-6 md:px-12 bg-[#f4f6f0]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Visual Block */}
          <div className="bg-white border-4 border-emerald-950 p-8 shadow-[12px_12px_0px_rgba(6,78,59,1)] relative h-full flex flex-col justify-center">
            <div className="absolute top-4 left-4 text-emerald-200 opacity-50 text-8xl font-serif">
              "
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-emerald-950 leading-tight relative z-10 mb-6">
              Waste isn't the end. It's the beginning of a new cycle.
            </h3>
            <div className="flex gap-4 mt-4">
              <div className="w-16 h-16 bg-emerald-100 border-4 border-emerald-950 flex items-center justify-center text-3xl shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                🌍
              </div>
              <div className="w-16 h-16 bg-emerald-100 border-4 border-emerald-950 flex items-center justify-center text-3xl shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                ♻️
              </div>
            </div>
          </div>

          {/* Text Block */}
          <div className="space-y-6">
            <h2 className="text-5xl font-extrabold tracking-tighter text-emerald-950">
              The Re-classify Story
            </h2>
            <p className="text-lg text-emerald-800 leading-relaxed font-medium">
              Traditional recycling systems are broken. They rely on guesswork,
              lack incentives, and suffer from inefficient logistics. We set out
              to change that by merging cutting-edge technology with community
              action.
            </p>
            <p className="text-lg text-emerald-800 leading-relaxed font-medium">
              By leveraging advanced deep learning classification, we ensure
              every piece of waste is accurately identified and sorted at the
              source. Coupled with our structured pickup scheduling and an
              engaging rewards system, we are turning everyday disposals into
              measurable environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* The Ecosystem (3 Pillars) */}
      <section className="py-28 px-6 md:px-12 bg-emerald-50 border-y-4 border-emerald-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-emerald-950 mb-6">
              A Complete Ecosystem
            </h2>
            <p className="text-xl text-emerald-800 font-medium leading-relaxed">
              We bridge the gap between conscious consumers and efficient
              logistics, creating a closed-loop system where everyone wins.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Core Tech 1 */}
            <div className="bg-white border-4 border-emerald-950 p-8 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-emerald-600 text-white w-14 h-14 border-4 border-emerald-950 flex items-center justify-center mb-6 text-2xl shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                1
              </div>
              <h3 className="text-2xl font-extrabold text-emerald-950 mb-4">
                Deep Learning AI
              </h3>
              <p className="text-emerald-800 leading-relaxed">
                Our proprietary models take the confusion out of recycling.
                Point, scan, and let the AI instantly categorize materials with
                high-confidence accuracy to prevent contamination.
              </p>
            </div>

            {/* Core Tech 2 */}
            <div className="bg-white border-4 border-emerald-950 p-8 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-emerald-600 text-white w-14 h-14 border-4 border-emerald-950 flex items-center justify-center mb-6 text-2xl shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                2
              </div>
              <h3 className="text-2xl font-extrabold text-emerald-950 mb-4">
                Smart Logistics
              </h3>
              <p className="text-emerald-800 leading-relaxed">
                We empower a fleet of verified local drivers with
                route-optimized scheduling software, ensuring reliable, on-time
                pickups directly from your doorstep.
              </p>
            </div>

            {/* Core Tech 3 */}
            <div className="bg-white border-4 border-emerald-950 p-8 shadow-[8px_8px_0px_rgba(6,78,59,1)] hover:shadow-[12px_12px_0px_rgba(6,78,59,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="bg-emerald-600 text-white w-14 h-14 border-4 border-emerald-950 flex items-center justify-center mb-6 text-2xl shadow-[4px_4px_0px_rgba(6,78,59,1)]">
                3
              </div>
              <h3 className="text-2xl font-extrabold text-emerald-950 mb-4">
                Circular Economy
              </h3>
              <p className="text-emerald-800 leading-relaxed">
                Good habits deserve great rewards. Our e-commerce platform
                converts your environmental efforts into a digital currency for
                premium, sustainably-sourced goods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-[#fcfdfa]">
        <div className="max-w-4xl mx-auto bg-emerald-600 border-4 border-emerald-950 p-12 shadow-[16px_16px_0px_rgba(6,78,59,1)] text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
            Ready to make an impact?
          </h2>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Join thousands of users and drivers who are already transforming the
            way we handle waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-emerald-950 font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(6,78,59,1)] hover:shadow-[2px_2px_0px_rgba(6,78,59,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Start Scanning
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-emerald-950 text-emerald-50 font-extrabold text-lg uppercase tracking-widest border-4 border-emerald-950 shadow-[6px_6px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Become a Driver
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
