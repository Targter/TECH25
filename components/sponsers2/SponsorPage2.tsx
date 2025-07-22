import React from 'react';

const SponsorPage2 = () => {
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900  flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-grid-pattern animate-pulse"></div>
      </div>



      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-2xl p-12 relative overflow-hidden">
          {/* Neon glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10 rounded-2xl"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl blur opacity-20"></div>

          <div className="mb-8 relative">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 mb-4 leading-tight tracking-wider animate-pulse">
              WANT TO BE A SPONSOR? 
            </h1>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto animate-pulse shadow-lg shadow-cyan-400/50"></div>

            {/* Decorative lines */}
            <div className="absolute -left-4 top-1/2 w-8 h-px bg-gradient-to-r from-transparent to-cyan-400 opacity-60"></div>
            <div className="absolute -right-4 top-1/2 w-8 h-px bg-gradient-to-l from-transparent to-pink-400 opacity-60"></div>
          </div>

        <a 
  href="mailto:iste@cumail.in"
  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-pink-500/50 border border-cyan-400/30 uppercase tracking-wider"
>
  {/* Button glow effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

  <svg
    className="w-5 h-5 mr-3 group-hover:animate-pulse relative z-10"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
  
  <span className="relative z-10">Contact Us</span>

  {/* Animated border */}
  <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-cyan-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
</a>

          <div className="mt-8 text-cyan-300/70 text-sm font-mono uppercase tracking-wider animate-pulse">
            &gt; INITIATE_PARTNERSHIP_PROTOCOL.EXE
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400/50"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-pink-400/50"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400/50"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-400/50"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-1 h-1 bg-cyan-400 absolute top-1/4 left-1/3 animate-ping"></div>
        <div className="w-1 h-1 bg-pink-400 absolute top-3/4 left-2/3 animate-ping animation-delay-500"></div>
        <div className="w-1 h-1 bg-yellow-400 absolute top-1/2 right-1/4 animate-ping animation-delay-1000"></div>
      </div>
    </div>
  );
};

export default SponsorPage2;
