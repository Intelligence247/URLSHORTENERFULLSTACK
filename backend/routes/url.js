import express from 'express';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import Url from '../models/Url.js';
import validator from 'validator';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       required:
 *         - originalUrl
 *         - shortUrl
 *         - urlCode
 *         - qrCode
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the URL
 *         originalUrl:
 *           type: string
 *           description: The original URL to be shortened
 *         shortUrl:
 *           type: string
 *           description: The shortened URL
 *         urlCode:
 *           type: string
 *           description: The unique code for the shortened URL
 *         qrCode:
 *           type: string
 *           description: Base64 encoded QR code image
 *         clicks:
 *           type: number
 *           description: Number of times the short URL has been accessed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the URL was created
 *         lastAccessed:
 *           type: string
 *           format: date-time
 *           description: When the URL was last accessed
 */

/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Shorten a URL
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 description: The URL to be shortened
 *               email:
 *                 type: string
 *                 description: Email to send the shortened URL to (optional)
 *             example:
 *               originalUrl: "https://www.example.com/very-long-url-that-needs-shortening"
 *               email: "user@example.com"
 *     responses:
 *       200:
 *         description: URL shortened successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Url'
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request - Invalid URL or missing parameters
 *       500:
 *         description: Internal server error
 */
router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl, email } = req.body;

    // Validate URL
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

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Get history of all shortened URLs
 *     tags: [URLs]
 *     responses:
 *       200:
 *         description: List of all shortened URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Url'
 */
router.get('/history', async (req, res) => {
  try {
    const urls = await Url.find({}, 'originalUrl shortUrl createdAt clicks').sort({ createdAt: -1 });
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

/**
 * @swagger
 * /api/{code}:
 *   get:
 *     summary: Redirect to original URL
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The short URL code
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: URL not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/stats/{code}:
 *   get:
 *     summary: Get URL statistics
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The short URL code
 *     responses:
 *       200:
 *         description: URL statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Url'
 *       404:
 *         description: URL not found
 *       500:
 *         description: Internal server error
 */
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