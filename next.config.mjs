/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
      ),
    ],
  },
};

export default nextConfig;
