import React, { useState } from 'react';

const ProductQnA = ({ productId, qnaList = [], onSubmitQuestion, loading, error }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmitQuestion(question);
      setQuestion('');
    }
  };

  return (
    <div className="bg-muted/40 rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold mb-2 text-foreground">Product Q&amp;A</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="Ask a question about this product..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition text-sm" disabled={loading || !question.trim()}>Ask</button>
      </form>
      {error && <div className="text-xs text-error mb-2">{error}</div>}
      <div className="space-y-3">
        {loading && <div className="text-xs text-muted-foreground">Loading Q&amp;A...</div>}
        {!loading && qnaList.length === 0 && <div className="text-xs text-muted-foreground">No questions yet. Be the first to ask!</div>}
        {qnaList.map((qna, idx) => (
          <div key={idx} className="bg-background rounded p-2 shadow-sm">
            <div className="text-sm font-medium text-foreground">Q: {qna.question}</div>
            {qna.answer && <div className="text-xs text-success mt-1">A: {qna.answer}</div>}
            {!qna.answer && <div className="text-xs text-muted-foreground mt-1 italic">Awaiting answer...</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductQnA;
