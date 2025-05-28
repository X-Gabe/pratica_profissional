const pdf = require('pdf-parse');
const fs = require('fs');

exports.extractTextFromPDF = async (filepath) => {
  try {
    const dataBuffer = fs.readFileSync(filepath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Erro ao extrair texto do PDF:', error);
    throw error;
  }
};