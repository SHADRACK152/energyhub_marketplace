import React from 'react';
import LoanApplicationForm from './LoanApplicationForm';

const LoanPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Solar & Energy Product Loans</h1>
      <p className="mb-6">Explore financing options for solar panels, batteries, and more. Apply for a loan below or contact support for details.</p>
      <LoanApplicationForm />
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Available Loan Options</h2>
        <ul className="list-disc pl-6">
          <li>Flexible repayment terms (6-36 months)</li>
          <li>Low interest rates for clean energy products</li>
          <li>Quick approval and easy application</li>
          <li>Support for residential and commercial customers</li>
        </ul>
      </div>
    </div>
  );
};

export default LoanPage;
