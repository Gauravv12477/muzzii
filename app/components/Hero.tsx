import React from 'react';
import { Play, Music, Radio, Headphones } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen pt-16 pb-32 flex content-center items-center justify-center">
      <div className="absolute top-0 w-full h-full">
        <div className="absolute inset-0  mix-blend-overlay opacity-20 bg-cover bg-center" />
        
      </div>
      
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="pr-12">
              <h1 className="text-white font-semibold text-5xl mb-8">
                Your Music, Unified.
              </h1>
              <p className="mt-4 text-lg text-gray-300">
                Stream seamlessly across platforms. One app, infinite possibilities.
              </p>
              <div className="mt-8 flex justify-center space-x-6">
                {[
                  { icon: Music, text: "Cross-Platform Integration" },
                  { icon: Radio, text: "Live Streaming" },
                  { icon: Headphones, text: "Premium Sound Quality" }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-white">
                    <div className="rounded-full bg-white/10 p-3 mb-2">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <button className="mt-12 bg-white text-indigo-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors flex items-center mx-auto">
                <Play className="w-5 h-5 mr-2" />
                Start Listening Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}