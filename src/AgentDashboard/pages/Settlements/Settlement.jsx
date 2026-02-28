import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import lookupService from '../../../services/lookupService';

const Settlement = () => {
  const [accountTypes, setAccountTypes] = useState([]);
  const [bankNames, setBankNames] = useState([]);
  const [formData, setFormData] = useState({
    accountType: '',
    bankAccountNo: '',
    contactNo: '',
    bankName: '',
    ifscCode: '',
    accountHolderName: '',
    bankitFee: '',
    totalSettlementBalance: '',
    amount: '',
    transactionPin: '',
    transferMode: 'Instant',
    securePlusAssurance: false,
    agreeTerms: false
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    try {
      // Simulate API call
      console.log('Processing settlement with data:', formData);
      toast.success('Settlement processed successfully!');
      
      // Reset form
      setFormData({
        accountType: '',
        bankAccountNo: '',
        contactNo: '',
        bankName: '',
        ifscCode: '',
        accountHolderName: '',
        bankitFee: '',
        totalSettlementBalance: '',
        amount: '',
        transactionPin: '',
        transferMode: 'Instant',
        securePlusAssurance: false,
        agreeTerms: false
      });
    } catch (error) {
      console.error('Error processing settlement:', error);
      toast.error('Failed to process settlement');
    }
  };

  const handleCancel = () => {
    setFormData({
      accountType: '',
      bankAccountNo: '',
      contactNo: '',
      bankName: '',
      ifscCode: '',
      accountHolderName: '',
      bankitFee: '',
      totalSettlementBalance: '',
      amount: '',
      transactionPin: '',
      transferMode: 'Instant',
      securePlusAssurance: false,
      agreeTerms: false
    });
    toast.info('Form cancelled');
  };
  return (
    <div style={styles.card}>
      <form onSubmit={handleSubmit}>
        <div style={styles.row}>
          <div style={styles.col}>
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
          <div style={styles.col}>
            <label style={styles.label}>Bank A/C No.</label>
            <input 
              style={styles.input}
              name="bankAccountNo"
              value={formData.bankAccountNo}
              onChange={handleInputChange}
              placeholder="Enter bank account number"
              required
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Contact No.</label>
            <input 
              style={styles.input}
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              placeholder="Enter contact number"
              required
            />
          </div>
          <div style={styles.col}>
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
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
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
          <div style={styles.col}>
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
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Bankit Fee <span style={{color: '#ef4444'}}>*</span></label>
            <input 
              style={styles.input}
              name="bankitFee"
              value={formData.bankitFee}
              onChange={handleInputChange}
              placeholder="Enter bankit fee"
              required
            />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Total Settlement Balance</label>
            <input 
              style={styles.input}
              name="totalSettlementBalance"
              value={formData.totalSettlementBalance}
              onChange={handleInputChange}
              placeholder="Enter total settlement balance"
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Amount <span style={{color: '#ef4444'}}>*</span></label>
          <input 
            style={styles.input}
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            required
          />
        </div>

        <p style={styles.warning}>
          You can not make any settlement exceeding your Total Settlement Balance / Allowed Settlement Limit / Wallet Balance
        </p>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Transaction Pin <span style={{color: '#ef4444'}}>*</span></label>
            <input 
              type="password" 
              style={styles.input}
              name="transactionPin"
              value={formData.transactionPin}
              onChange={handleInputChange}
              placeholder="Enter transaction pin"
              required
            />
            <div style={styles.linkText}>Change Transaction Pin</div>
          </div>

          <div style={styles.col}>
            <label style={styles.label}>Transfer Mode <span style={{color: '#ef4444'}}>*</span></label>
            <select 
              style={styles.input}
              name="transferMode"
              value={formData.transferMode}
              onChange={handleInputChange}
              required
            >
              <option value="Instant">Instant</option>
            </select>
          </div>
        </div>

        <div style={styles.checkbox}>
          <input 
            type="checkbox"
            name="securePlusAssurance"
            checked={formData.securePlusAssurance}
            onChange={handleInputChange}
            style={{marginRight: '8px'}}
          />
          <label style={styles.checkboxLabel}>
            Rs. 0 will be charged for opting SecurePlus assurance plan on this transaction
          </label>
        </div>

        <div style={styles.checkbox}>
          <input 
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            required
            style={{marginRight: '8px'}}
          />
          <label style={styles.checkboxLabel}>
            I hereby agree to the terms & Conditions of this settlement transaction.
          </label>
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
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px'
  },
  col: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
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
  warning: {
    color: '#ef4444',
    fontSize: '13px',
    marginBottom: '20px'
  },
  linkText: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '6px'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px'
  },
  checkboxLabel: {
    fontSize: '13px',
    color: '#4a5568'
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
    background: '#EC5B13',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};

export default Settlement;