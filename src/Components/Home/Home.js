import { React, useEffect, useState } from "react";
import "./Home.css";
import AccountsSelect from "../AccountsSelect/AccountsSelect";
import { getAllAccounts } from "../../Models/Accounts/Accounts";
import Modal from "../Modal/Modal";
import {
  updateAccount,
  createAccount,
  deleteAccount,
} from "../../Models/Accounts/Accounts";
import { getAllTransactions } from "../../Models/Transactions/Transactions";

const Home = () => {
  // return the HTML for everything on the page
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    getAllAccounts().then((results) => {
      setAccounts(results);
    });
    getAllTransactions().then((results) => {
      setTransactions(results);
    });
  }, []);

  const [transactions, setTransactions] = useState([]);
  const [updateAccounts, setUpdate] = useState(undefined);

  const finishAccountEdit = async (
    account,
    id,
    modalForm,
    setModalFormData,
    setUpdate,
    post
  ) => {
    if (post) {
      //Trigger wait animation

      const updated = await updateAccount(id, account);

      //Untrigger wait animation
      setUpdate(updated);
    }

    setModalFormData({ ...modalForm, isOpen: false });
  };

  const finishAccountCreate = async (
    account,
    modalForm,
    setModalFormData,
    setUpdate,
    post
  ) => {
    if (post) {
      const newAccount = await createAccount(account);
      setUpdate(newAccount);
    }

    setModalFormData({ ...modalForm, isOpen: false });
  };

  const openModal = (
    title,
    fields,
    data,
    setModalFormData,
    id,
    closeModalFunc
  ) => {
    // Set the title, fields, data and isopen of the modal
    setModalFormData({
      title: title,
      fields: fields,
      data: data,
      isOpen: true,
      id: id,
      closeModalFunc: closeModalFunc,
    });
  };

  const [modalForm, setModalFormData] = useState({
    isOpen: false,
    data: {},
    fields: {},
    title: "",
    id: "",
    closeModalFunc: () => {},
  });

  useEffect(() => {
    if (updateAccounts !== undefined) {
      //loop through forms data and update any transactions that have been changed (id)
      const ind = accounts.findIndex((obj) => obj.id === updateAccounts.id);
      if (ind !== -1) {
        const updatedAccounts = [...accounts];
        updatedAccounts[ind] = updateAccounts;
        setAccounts(updatedAccounts);
      } else {
        // Add the new transaction to the list
        setAccounts([...accounts, updateAccounts]);
      }
    }
    setUpdate(undefined);
  }, [updateAccounts, accounts]);

  const updateDeletedAccount = (accountId) => {
    // Filter out the deleted transaction
    const updatedAccounts = accounts.filter(
      (account) => account.id !== accountId
    );

    setAccounts(updatedAccounts);
  };

  return (
    <div>
      <div className="homepage">
        <header className="header">
          <h1>Financial Manager</h1>
          <p>Efficiently Manage Your Finances</p>
        </header>

        {/* Future Work - make the summary reactive: not just fake numbers */}

        <Modal
          isOpen={modalForm?.isOpen}
          closeModal={modalForm?.closeModalFunc}
          modalForm={modalForm}
          setUpdate={setUpdate}
          setModalFormData={setModalFormData}
        />

        <main className="content">
          <section className="summary">
            <h2>Financial Summary</h2>
            <p>Total expenses this year: $30,000.00</p>
            <p>Total expenses this month: $3,000.00</p>
            <p>Total expenses this week: $300.00</p>
          </section>
        </main>
      </div>

      <AccountsSelect
        accounts={accounts}
        transactions={transactions}
        openModal={openModal}
        modalForm={modalForm}
        setModalFormData={setModalFormData}
        finishAccountEdit={finishAccountEdit}
        finishAccountCreate={finishAccountCreate}
        updateDeletedAccount={updateDeletedAccount}
        deleteAccount={deleteAccount}
      />
    </div>
  );
};

export default Home;
