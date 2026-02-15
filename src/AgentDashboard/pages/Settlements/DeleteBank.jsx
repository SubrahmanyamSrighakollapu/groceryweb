import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import lookupService from '../../../services/lookupService';

const DeleteBank = () => {
  const [accountTypes, setAccountTypes] = useState([]);
  const [bankNames, setBankNames] = useState([]);
  const [formData, setFormData] = useState({
    accountType: '',
    bankAccountNo: '',
    bankName: '',
    ifscCode: '',
    accountHolderName: ''
  });

  useEffect(() => {
    fetchAccountTypes();
    fetchBankNames();
  }, []);

  const fetchAccountTypes = async () => {
    try {
      const response = await lookupService.getAccountTypes();
      if (response && response.status === 1 && response.result) {
        setAccountTypes(response.result);
      }
    } catch (error) {
      console.error('Error fetching account types:', error);
    }
  };

  const fetchBankNames = async () => {
    try {
      const response = await lookupService.getBankNames();
      if (response && response.status === 1 && response.result) {
        setBankNames(response.result);
      }
    } catch (error) {
      console.error('Error fetching bank names:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      console.log('Deleting bank with data:', formData);
      toast.success('Bank deleted successfully!');
      
      // Reset form
      setFormData({
        accountType: '',
        bankAccountNo: '',
        bankName: '',
        ifscCode: '',
        accountHolderName: ''
      });
    } catch (error) {
      console.error('Error deleting bank:', error);
      toast.error('Failed to delete bank');
    }
  };

  const handleCancel = () => {
    setFormData({
      accountType: '',
      bankAccountNo: '',
      bankName: '',
      ifscCode: '',
      accountHolderName: ''
    });
    toast.info('Form cancelled');
  };
  return (
    <div style={styles.card}>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Settlement Account Type</label>
          <select 
            style={styles.input}
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Account Type</option>
            {accountTypes.map((type) => (
              <option key={type.statusId} value={type.statusId}>
                {type.statusValue}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Bank A/C No.</label>
          <select 
            style={styles.input}
            name="bankAccountNo"
            value={formData.bankAccountNo}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Account Number</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Bank Name</label>
          <select 
            style={styles.input}
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Bank Name</option>
            {bankNames.map((bank) => (
              <option key={bank.statusId} value={bank.statusId}>
                {bank.statusValue}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>IFSC Code</label>
          <input 
            style={styles.input}
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleInputChange}
            placeholder="Enter IFSC code"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>A/C Holder Name</label>
          <input 
            style={styles.input}
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleInputChange}
            placeholder="Enter account holder name"
            required
          />
        </div>
        
        <div style={styles.buttonRow}>
          <button type="button" style={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" style={styles.submitBtn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    maxWidth: '700px'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#495057'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s',
    outline: 'none'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e2e8f0'
  },
  cancelBtn: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    background: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  submitBtn: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    background: '#10b981',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};

export default DeleteBank;