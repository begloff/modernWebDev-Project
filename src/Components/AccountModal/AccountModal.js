import React, { useState, useEffect } from "react";
import Parse from "parse";

const AccountModal = ({ isOpen, closeModal }) => {
  
  
    const currUser = Parse.User.current()
  
    const [accountForm, setAccountData] = useState({
        accountName: "",
        balance: 0,
        user: currUser.id
    });

    // Reset form data when the modal is opened
    useEffect(() => {
        setAccountData({
            accountName: "",
            balance: 0
        });
    }, [isOpen]);

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setAccountData({
        ...accountForm,
        [name]: value,
        });
    };

    const isFormValid = accountForm.accountName.trim() !== "";

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <ul style={{ listStyleType: "none" }}>
            <li>
                <label htmlFor="accountNameInput">Account Name:</label>
                <input
                type="text"
                name="accountName"
                id="accountNameInput"
                value={accountForm.accountName}
                onChange={handleInputChange}
                />
            </li>
            <li>
                <label htmlFor="balanceInput">Balance:</label>
                <input
                type="number"
                name="balance"
                id="balanceInput"
                value={accountForm.balance}
                onChange={handleInputChange}
                />
            </li>
            </ul>

            <button
            className="btn btn-primary"
            onClick={() => isFormValid && closeModal(accountForm, true)}
            disabled={!isFormValid}
            >
            Create Account
            </button>
        </div>
    );
};

export default AccountModal;
