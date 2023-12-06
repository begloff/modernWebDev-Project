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
import Parse from "parse";
import Chart from "chart.js/auto";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [updateAccounts, setUpdate] = useState(undefined);
  const [yearTotal, setYearTotal] = useState([0, 0]);
  const [monthTotal, setMonthTotal] = useState([0, 0]);
  const [weekTotal, setWeekTotal] = useState([0, 0]);
  const userfirst = Parse.User.current();

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Function to calculate the sum of transactions for a given period
  const calculateSumForPeriod = (transactions, period) => {
    if (!transactions || transactions.length === 0) {
      // Check if transactions array is empty or undefined, return 0
      return 0;
    }

    const currentDate = new Date(); // get current date
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.get("date"));
      if (period === "year") {
        return transactionDate.getFullYear() === currentDate.getFullYear();
      } else if (period === "month") {
        return (
          transactionDate.getMonth() === currentDate.getMonth() &&
          transactionDate.getFullYear() === currentDate.getFullYear()
        );
      } else if (period === "week") {
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - 7);
        return transactionDate >= weekStart && transactionDate <= currentDate;
      }
      return false;
    });

    // Calculate the sum
    const sumExpenses = filteredTransactions.reduce((total, transaction) => {
      if (transaction.get("type") === "expense") {
        return total + transaction.get("amount");
      } else {
        return total + 0; // For expenses, add 0 to the total
      }
    }, 0);
    const sumIncome = filteredTransactions.reduce((total, transaction) => {
      if (transaction.get("type") === "income") {
        return total + transaction.get("amount");
      } else {
        return total + 0; // For expenses, add 0 to the total
      }
    }, 0);

    return [sumExpenses, sumIncome];
  };

  // return the HTML for everything on the page
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAllAccounts().then((results) => {
      setAccounts(results);
    });

    getAllTransactions().then((results) => {
      setTransactions(results);
      setYearTotal(calculateSumForPeriod(results, "year"));
      setMonthTotal(calculateSumForPeriod(results, "month"));
      setWeekTotal(calculateSumForPeriod(results, "week"));
    });
  }, []);

  useEffect(() => {
    // Set up charts
    const timeFrames = ["yearly", "monthly", "weekly"];

    timeFrames.forEach((timeFrame) => {
      //set up chart
      const canvas = document.getElementById(`${timeFrame}-chart`);
      const existingChart = Chart.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }

      var data;

      if (timeFrame === "yearly") {
        data = yearTotal;
      } else if (timeFrame === "monthly") {
        data = monthTotal;
      } else if (timeFrame === "weekly") {
        data = weekTotal;
      }

      const chartData = {
        labels: ["Expenses", "Income"],
        datasets: [
          {
            label: "Financial Report",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
            ],
            hoverOffset: 4,
            borderWidth: 1,
          },
        ],
      };

      new Chart(canvas, {
        type: "pie",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.5,
          plugins: {
            title: {
              display: true,
              text: `${toTitleCase(timeFrame)} Financial Report`,
              font: {
                size: 18,
              },
            },
          },
        },
      });
    });
  }, [yearTotal, weekTotal, monthTotal]);

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
          <h1>
            Welcome to BudgetBuddy financial manager,{" "}
            {userfirst.get("firstName")} {userfirst.get("lastName")}.
          </h1>
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
            <h2>Your Financial Summary</h2>
            <div className="row">
              <div className="col">
                {" "}
                <p>
                  Total expenses this year: $
                  {yearTotal[0].toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p>
                  Total expenses this month: $
                  {monthTotal[0].toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p>
                  Total expenses this week: $
                  {weekTotal[0].toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="col">
                {" "}
                <p>
                  Total Income this year: $
                  {yearTotal[1].toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p>
                  Total Income this month: $
                  {monthTotal[1].toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p>
                  Total Income this week: $
                  {weekTotal[1].toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <div className="card-list">
              <div>
                <div
                  className="col chart-container"
                  style={{
                    position: "relative",
                  }}
                >
                  <canvas id="yearly-chart"></canvas>
                </div>
              </div>
              <div>
                <div
                  className="col chart-container"
                  style={{
                    position: "relative",
                  }}
                >
                  <canvas id="monthly-chart"></canvas>
                </div>
              </div>
              <div>
                <div
                  className="col chart-container"
                  style={{
                    position: "relative",
                  }}
                >
                  <canvas id="weekly-chart"></canvas>
                </div>
              </div>
            </div>
          </section>
        </main>

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
    </div>
  );
};

export default Home;
