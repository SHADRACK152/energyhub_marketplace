// QnA endpoints for product questions and answers
const express = require('express');
const router = express.Router();

// GET all QnA for a product
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { data, error } = await req.supabase
    .from('product_qna')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST a new question
router.post('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { question, user_id } = req.body;
  if (!question) return res.status(400).json({ error: 'Question required' });
  const { data, error } = await req.supabase
    .from('product_qna')
    .insert([{ product_id: productId, question, user_id }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PATCH to answer a question (admin/seller only)
router.patch('/answer/:qnaId', async (req, res) => {
  const { qnaId } = req.params;
  const { answer } = req.body;
  if (!answer) return res.status(400).json({ error: 'Answer required' });
  const { data, error } = await req.supabase
    .from('product_qna')
    .update({ answer })
    .eq('id', qnaId)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

module.exports = router;
