import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import lookupService from '../../../services/lookupService';
import agentService from '../../../services/agentService';

const RegisterBankForm = () => {
  const [accountTypes, setAccountTypes] = useState([]);
  const [bankNames, setBankNames] = useState([]);
  const [formData, setFormData] = useState({
    accountType: '',
    contactNo: '',
    accountHolderName: '',
    bankAccountNo: '',
    confirmBankAccountNo: '',
    bankName: '',
    ifscCode: '',
    panNo: ''
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
    
    if (formData.bankAccountNo !== formData.confirmBankAccountNo) {
      toast.error('Bank account numbers do not match');
      return;
    }
    
    try {
      const payload = {
        bankId: 0,
        bankNameId: parseInt(formData.bankName),
        holderName: formData.accountHolderName,
        accountNo: formData.bankAccountNo,
        ifscCode: formData.ifscCode,
        acTypeId: parseInt(formData.accountType),
        isVerified: false,
        panNo: formData.panNo,
        contactNo: formData.contactNo
      };
      
      const response = await agentService.submitUpdateBankDetails(payload);
      
      if (response && response.status === 1) {
        toast.success(response.message || 'Bank registered successfully!');
        setFormData({
          accountType: '',
          contactNo: '',
          accountHolderName: '',
          bankAccountNo: '',
          confirmBankAccountNo: '',
          bankName: '',
          ifscCode: '',
          panNo: ''
        });
      } else {
        toast.error(response.message || 'Failed to register bank');
      }
    } catch (error) {
      console.error('Error registering bank:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to register bank';
      toast.error(errorMessage);
    }
  };

  const handleVerifyBeneficiary = () => {
    if (!formData.bankAccountNo || !formData.ifscCode) {
      toast.error('Please fill bank account number and IFSC code');
      return;
    }
    toast.success('Beneficiary verified successfully!');
  };

  const handleCancel = () => {
    setFormData({
      accountType: '',
      contactNo: '',
      accountHolderName: '',
      bankAccountNo: '',
      confirmBankAccountNo: '',
      bankName: '',
      ifscCode: '',
      panNo: ''
    });
    toast.info('Form cancelled');
  };
  return (
    <div className="card shadow-sm p-4 rounded-3">
      <form onSubmit={handleSubmit}>
        <Input 
          label="Settlement Account Type" 
          type="select" 
          options={accountTypes}
          name="accountType"
          value={formData.accountType}
          onChange={handleInputChange}
          required
        />
        <Input 
          label="Contact No." 
          name="contactNo"
          value={formData.contactNo}
          onChange={handleInputChange}
          placeholder="Enter contact number"
          required
        />
        <Input 
          label="A/C Holder Name" 
          name="accountHolderName"
          value={formData.accountHolderName}
          onChange={handleInputChange}
          placeholder="Enter account holder name"
          required
        />
        <Input 
          label="Bank A/C No." 
          name="bankAccountNo"
          value={formData.bankAccountNo}
          onChange={handleInputChange}
          placeholder="Enter bank account number"
          required
        />
        <Input 
          label="Confirm Bank A/C No." 
          name="confirmBankAccountNo"
          value={formData.confirmBankAccountNo}
          onChange={handleInputChange}
          placeholder="Confirm bank account number"
          required
        />
        <Input 
          label="Bank Name" 
          type="select" 
          placeholder="Search Bank Name" 
          options={bankNames}
          name="bankName"
          value={formData.bankName}
          onChange={handleInputChange}
          required
        />
        <Input 
          label="IFSC Code" 
          name="ifscCode"
          value={formData.ifscCode}
          onChange={handleInputChange}
          placeholder="Enter IFSC code"
          required
        />
        <Input 
          label="PAN Number" 
          name="panNo"
          value={formData.panNo}
          onChange={handleInputChange}
          placeholder="Enter PAN number"
          required
        />

        <div className="d-flex justify-content-between align-items-center mt-4">
          <button type="button" style={styles.outlineBtn} onClick={handleCancel}>Cancel</button>
          <button type="submit" style={styles.registerBtn}>
            Register <br /> Beneficiary
          </button>
          <button type="button" style={styles.outlineBtn} onClick={handleVerifyBeneficiary}>
            Verify <br /> Beneficiary
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, type = "input", placeholder = "Select", options = [], name, value, onChange, required = false }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    {type === "select" ? (
      <select 
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.statusId} value={option.statusId}>
            {option.statusValue}
          </option>
        ))}
      </select>
    ) : (
      <input 
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

const styles = {
  outlineBtn: {
    width: "148px",
    height: "49px",
    borderRadius: "8px",
    border: "1px solid #565656",
    backgroundColor: "#F5F5F5",
    fontWeight: "500",
  },
  registerBtn: {
    width: "148px",
    height: "49px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4BAF47",
    color: "#ffffff",
    fontWeight: "500",
  },
};

export default RegisterBankForm;