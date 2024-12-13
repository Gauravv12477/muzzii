import React from 'react';
import { Users, Youtube, Music } from 'lucide-react';

const mockStreams = [
  {
    id: 1,
    title: "Lo-Fi Beats for Study",
    artist: "ChillHop Radio",
    viewers: 1420,
    platform: "youtube",
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Deep House Mix",
    artist: "Electronic Vibes",
    viewers: 892,
    platform: "spotify",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80"
  },
  // Add more mock streams as needed
];

export default function LiveStreams() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Live Now
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStreams.map((stream) => (
            <div
              key={stream.id}
              className="relative group bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {stream.viewers.toLocaleString()}
                </div>
                <div className="absolute bottom-2 right-2">
                  {stream.platform === 'youtube' ? (
                    <Youtube className="w-6 h-6 text-white" />
                  ) : (
                    <Music className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stream.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {stream.artist}
                </p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition-colors">
                  Join Stream
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}