import express from 'express';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import Url from '../models/Url.js';
import validator from 'validator';

const router = express.Router();
router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl, email } = req.body;
    if (!originalUrl || !validator.isURL(originalUrl)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format. Please provide a valid URL.'
      });
    }

    // Check if URL already exists
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.status(200).json({
        success: true,
        data: existingUrl,
        message: 'URL already exists'
      });
    }

    // Generate unique code
    const urlCode = nanoid(8);
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    const shortUrl = `${baseUrl}/api/${urlCode}`;

    // Generate QR code
    const qrCode = await QRCode.toDataURL(shortUrl, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Create new URL entry
    const newUrl = new Url({
      originalUrl,
      shortUrl,
      urlCode,
      qrCode,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await newUrl.save();

    res.status(200).json({
      success: true,
      data: newUrl,
      message: 'URL shortened successfully'
    });

  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


router.get('/history', async (req, res) => {
  try {
    const urls = await Url.find({}, 'originalUrl shortUrl createdAt clicks qrCode').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: urls
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});


router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ urlCode: code });
    
    if (!url) {
      return res.status(404).json({
        success: false,
        error: 'URL not found'
      });
    }

    // Update click count and last accessed
    url.clicks += 1;
    url.lastAccessed = new Date();
    await url.save();

    // Redirect to original URL
    res.redirect(url.originalUrl);

  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

router.get('/stats/:code', async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ urlCode: code });
    
    if (!url) {
      return res.status(404).json({
        success: false,
        error: 'URL not found'
      });
    }

    res.status(200).json({
      success: true,
      data: url
    });

  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;