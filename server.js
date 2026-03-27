const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 SPOTIFY PREMIUM SPOOF ENDPOINTS
app.use('/v1/me', (req, res) => res.json({
  id: "premium_user",
  product: "premium",
  premium_since: 1640995200,
  is_premium: true
}));

app.use('/client/api/attribution', (req, res) => res.json({
  attribution: { product: "premium" }
}));

app.use('/track/premium_status', (req, res) => res.json({ premium: true }));

// Proxy lainnya ke Spotify real
app.use('/', createProxyMiddleware({
  target: 'https://spclient.wg.spotify.com',
  changeOrigin: true,
  pathRewrite: {'^/': '/'}
}));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🎵 Spotify Premium Proxy: ${port}`);
});
