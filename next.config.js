/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig

// ...................io..........................

// module.exports = {
//   async server({ app }) {
//     const httpServer = require('http').createServer(app)
//     const io = new Server(httpServer, {
//       cors: {
//         origin: 'http://localhost:3000', // Replace with your frontend URL
//         methods: ['GET', 'POST'],
//         allowedHeaders: ['my-custom-header'],
//         credentials: true,
//       },
//     })

//     app.set('io', io)

//     await new Promise(resolve => httpServer.listen(3001, resolve))
//   },
// }
