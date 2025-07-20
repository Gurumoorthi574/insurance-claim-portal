import React, { useState, useEffect } from 'react';
import { useFormContext } from '../FormContext'; // Import useFormContext

const MedicalExpensesForm = ({ goToNext, goToPrev }) => { // Assuming it receives these props from stepper
  const { form, setForm } = useFormContext(); // Get form and setForm from context

  // Initialize state from context or with defaults
  const [expenseItems, setExpenseItems] = useState(
    form.expenseItems || [{ serviceType: '', date: '', amount: '' }]
  );
  const [totalClaimAmount, setTotalClaimAmount] = useState(form.totalClaimAmount || 0);
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to track uploaded files (optional)

  // Effect to update FormContext when local state changes
  useEffect(() => {
    setForm({ ...form, expenseItems, totalClaimAmount });
  }, [expenseItems, totalClaimAmount, setForm]); // Removed form from dependency array to avoid loop if setForm doesn't change form identity carefully

  const handleAddExpense = () => {
    setExpenseItems([...expenseItems, { serviceType: '', date: '', amount: '' }]);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenseItems.filter((item, i) => i !== index);
    setExpenseItems(updatedExpenses);
    // calculateTotal will be called by the effect listening to expenseItems
  };

  const handleExpenseChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExpenses = expenseItems.map((item, i) =>
      i === index ? { ...item, [name]: name === 'amount' ? (value === '' ? '' : parseFloat(value) || 0) : value } : item
    );
    setExpenseItems(updatedExpenses);
    // calculateTotal will be called by the effect listening to expenseItems
  };

  // Effect to recalculate total when expenseItems change
  useEffect(() => {
    const total = expenseItems.reduce((sum, item) => {
      const amount = parseFloat(item.amount) || 0; // Ensure amount is a number
      return sum + amount;
    }, 0);
    setTotalClaimAmount(total);
  }, [expenseItems]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prevFiles => [...prevFiles, ...files]);
    console.log("Selected files:", files);
    // In a real application, you would typically use FormData to send files to a server
  };

  // const handleNext = () => {
  //   // setForm({ ...form, expenseItems, totalClaimAmount }); // Ensure context is updated before navigating
  //   goToNext();
  // };

  return (
    <div className="font-sans max-w-3xl mx-auto p-5 md:p-8 bg-slate-100 rounded-2xl shadow-[6px_6px_12px_#cbd5e1,_-6px_-6px_12px_#ffffff]">
      <h1 className="text-3xl font-semibold text-slate-800 mb-1">Medical Expenses</h1>
      <p className="text-slate-600 mb-6">Itemize your medical expenses and upload supporting documents</p>

      {/* Expense Items Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5 shadow-sm">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Expense Items</h2>
        {expenseItems.map((item, index) => (
          <div className="flex flex-col md:flex-row items-end md:items-center gap-4 mb-4 pb-4 border-b border-dashed border-gray-200 last:border-b-0 last:mb-0 last:pb-0" key={index}>
            <div className="flex-1 w-full">
              <label htmlFor={`serviceType-${index}`} className="block text-sm font-semibold text-gray-700 mb-1">Service Type</label>
              <select
                id={`serviceType-${index}`}
                name="serviceType"
                value={item.serviceType}
                onChange={(e) => handleExpenseChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
              >
                <option value="">Select type</option>
                <option value="Consultation">Consultation</option>
                <option value="Medication">Medication</option>
                <option value="Procedure">Procedure</option>
                <option value="Tests">Tests</option>
                {/* Add more service types as needed */}
              </select>
            </div>
            <div className="flex-1 w-full">
              <label htmlFor={`date-${index}`} className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
              <input
                type="date"
                id={`date-${index}`}
                name="date"
                value={item.date}
                onChange={(e) => handleExpenseChange(index, e)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
              />
            </div>
            <div className="flex-1 w-full">
              <label htmlFor={`amount-${index}`} className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                id={`amount-${index}`}
                name="amount"
                value={item.amount}
                onChange={(e) => handleExpenseChange(index, e)}
                placeholder="$0.00"
                min="0"
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
              />
            </div>
            <button
              className="ml-0 md:ml-4 text-red-600 hover:text-red-800 text-2xl p-1 rounded-md transition-colors duration-200"
              onClick={() => handleDeleteExpense(index)}
              aria-label="Delete expense item"
            >
              &#x1F5D1; {/* Trash can icon */}
            </button>
          </div>
        ))}
        <button
          className="mt-4 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md shadow-sm hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center justify-center gap-1 transition-colors duration-200"
          onClick={handleAddExpense}
        >
          <span className="text-lg font-bold">+</span> Add Another Expense
        </button>
      </div>

      {/* Total Claim Amount Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5 shadow-sm flex justify-between items-center text-lg font-bold text-gray-800">
        <h3>Total Claim Amount:</h3>
        <span className="text-blue-600">${totalClaimAmount.toFixed(2)}</span>
      </div>

      {/* Supporting Documents Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Supporting Documents</h2>
        <div className="border-2 border-dashed border-blue-400 rounded-lg p-10 text-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-300 relative">
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer" // Hide the default input visually
          />
          <label htmlFor="file-upload" className="block cursor-pointer">
            <span className="text-blue-500 text-5xl block mb-2">&#x2191;</span> {/* Up arrow icon */}
            <p className="text-gray-600 text-base">Upload receipts, invoices, and medical reports</p>
          </label>
        </div>
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Uploaded Files:</h4>
            <ul className="list-disc pl-5 text-gray-600 text-sm">
              {uploadedFiles.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation Buttons - Assuming this form is part of the stepper */}
      {/* <div className="flex justify-between pt-6">
        <button type="button" onClick={goToPrev} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
          Prev
        </button>
        <button
          type="button"
          onClick={handleNext} // Use the modified handleNext
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Next
        </button>
      </div> */}
    </div>
  );
};

export default MedicalExpensesForm;