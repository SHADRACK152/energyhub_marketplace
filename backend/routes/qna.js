// QnA endpoints for product questions and answers
const express = require('express');
const router = express.Router();
const { dbHelpers } = require('../database');

// GET all QnA for a product
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const qnaList = await dbHelpers.query(
      'SELECT * FROM product_qna WHERE product_id = ? ORDER BY createdAt DESC', 
      [productId]
    );
    console.log(`✅ Retrieved ${qnaList.length} Q&A items for product ${productId}`);
    res.json(qnaList);
  } catch (error) {
    console.error('❌ Error fetching QnA:', error);
    res.status(500).json({ error: 'Failed to fetch Q&A' });
  }
});

// POST a new question
router.post('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { question, user_id } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    // Get AI answer
    const { getAIAnswer } = require('../llm');
    const aiAnswer = await getAIAnswer(question);

    // Save question and answer to DB
    const result = await dbHelpers.run(
      'INSERT INTO product_qna (product_id, question, answer, user_id) VALUES (?, ?, ?, ?)',
      [productId, question, aiAnswer, user_id || 'anonymous']
    );
    const newQna = await dbHelpers.get('SELECT * FROM product_qna WHERE id = ?', [result.id]);
    console.log('✅ Question posted with AI answer:', newQna);
    res.status(201).json(newQna);
  } catch (error) {
    console.error('❌ Error posting question:', error);
    res.status(500).json({ error: 'Failed to post question' });
  }
});

// PATCH to answer a question (admin/seller only)
router.patch('/answer/:qnaId', async (req, res) => {
  try {
    const { qnaId } = req.params;
    const { answer } = req.body;
    if (!answer) return res.status(400).json({ error: 'Answer required' });
    
    await dbHelpers.run(
      'UPDATE product_qna SET answer = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [answer, qnaId]
    );
    
    const updatedQna = await dbHelpers.get('SELECT * FROM product_qna WHERE id = ?', [qnaId]);
    console.log('✅ Answer posted successfully:', updatedQna);
    res.json(updatedQna);
  } catch (error) {
    console.error('❌ Error posting answer:', error);
    res.status(500).json({ error: 'Failed to post answer' });
  }
});

module.exports = router;
