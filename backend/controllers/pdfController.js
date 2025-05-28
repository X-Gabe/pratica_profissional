const PDF = require('../models/PDF');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');
const { extractTextFromPDF } = require('../services/pdfProcessor');
const { generateEmbeddings } = require('../services/ragService');

// Upload de PDF
exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }

    const { title, category } = req.body;
    const userId = req.userId;

    // Extrair texto do PDF
    const filepath = path.join(__dirname, '../uploads', req.file.filename);
    const content = await extractTextFromPDF(filepath);

    // Gerar embeddings (simplificado)
    const embeddings = await generateEmbeddings(content);

    // Salvar no banco de dados
    const pdf = new PDF({
      title,
      filename: req.file.originalname,
      filepath: req.file.path,
      category,
      uploadedBy: userId,
      content,
      embeddings
    });

    await pdf.save();

    res.status(201).json({ 
      message: 'PDF enviado com sucesso',
      pdf: {
        id: pdf._id,
        title: pdf.title,
        category: pdf.category,
        createdAt: pdf.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao processar PDF' });
  }
};

// Listar PDFs
exports.listPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find()
      .select('title category createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(pdfs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar PDFs' });
  }
};