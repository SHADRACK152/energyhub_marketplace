import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/api';

const LoanApplicationForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    product: '',
    amount: '',
    term: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/loans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to submit loan application');
      setSubmitted(true);
    } catch (err) {
      alert(err.message || 'Error submitting loan application');
    }
    setLoading(false);
  };

  if (submitted) {
    return <div className="p-4 bg-green-50 border border-green-200 rounded">Thank you! Your loan application has been submitted. We will contact you soon.</div>;
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input name="name" value={form.name} onChange={handleChange} required className="border rounded px-3 py-2 w-full" />
      </div>
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required className="border rounded px-3 py-2 w-full" />
      </div>
      <div>
        <label className="block font-medium mb-1">Product</label>
        <input name="product" value={form.product} onChange={handleChange} required className="border rounded px-3 py-2 w-full" placeholder="e.g. Solar Panel 400W" />
      </div>
      <div>
        <label className="block font-medium mb-1">Loan Amount (USD)</label>
        <input name="amount" type="number" value={form.amount} onChange={handleChange} required className="border rounded px-3 py-2 w-full" />
      </div>
      <div>
        <label className="block font-medium mb-1">Repayment Term (months)</label>
        <select name="term" value={form.term} onChange={handleChange} required className="border rounded px-3 py-2 w-full">
          <option value="">Select term</option>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Additional Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} className="border rounded px-3 py-2 w-full" />
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Submitting...' : 'Apply for Loan'}
      </button>
    </form>
  );
};

export default LoanApplicationForm;
