import { Router } from 'express';
import QRCode from 'qrcode';

const router = Router();

// GET /api/qr/table/:tableNumber
router.get('/table/:tableNumber', async (req, res) => {
  try {
    const { tableNumber } = req.params;
    const link = `${process.env.CLIENT_URL || 'http://localhost:5173'}/table/${tableNumber}`;
    const dataUrl = await QRCode.toDataURL(link);
    res.json({ tableNumber, link, dataUrl });
  } catch (e) {
    res.status(500).json({ message: 'Failed to generate QR', error: e.message });
  }
});

export default router;
