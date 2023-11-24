/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
    
      },
      {
        protocol: 'https',
        hostname: "res.cloudinary.com"
      }
    ]
  },

}

module.exports = nextConfig




// Me lo dio el chat para que el @ resuelva desde el scr pero me crea conflicto
// const path = require('path');

// module.exports = {
//   webpack: (config) => {
//     config.resolve.alias['@'] = path.resolve(__dirname, 'src');
//     return config;
//   },
// };

