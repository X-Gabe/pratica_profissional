const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const authMiddleware = require('../middleware/auth');
const uploadMiddleware = require('../middleware/upload');

// Rotas protegidas por autenticação
router.use(authMiddleware);

// Upload de PDF
router.post('/', 
  uploadMiddleware.single('pdf'),
  pdfController.uploadPDF
);

// Listar PDFs recentes
router.get('/', pdfController.listPDFs);

module.exports = router;