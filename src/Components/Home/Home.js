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
import RollingText from "../RollingText/RollingText";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [updateAccounts, setUpdate] = useState(undefined);
  const [yearTotal, setYearTotal] = useState([0, 0]);
  const [monthTotal, setMonthTotal] = useState([0, 0]);
  const [weekTotal, setWeekTotal] = useState([0, 0]);
  const [financialHealthGrade, setFinancialHealthGrade] = useState(""); // ["Magnificent", "Good", "Ok", "Poor", "Terrible"
  const userfirst = Parse.User.current();

  const financialHealth = {
    Magnificent: {
      color: "#0ffc03",
      lines: [
        "Given your financial prowess, why not diversify investments for an added thrill?",
        "Consider mentoring others on financial acumen - could be your claim to fame.",
        "Since you're in financial cruise control, explore high-yield savings for extra sparkle.",
        "Why not channel that financial wizardry into exploring new investment avenues?",
        "You've got the golden touch - explore sophisticated investment opportunities.",
      ],
    },
    Good: {
      color: "#a3ff00",
      lines: [
        "Stay the course! Perhaps indulge in a slightly nicer treat for maintaining stability.",
        "Keep up the balanced approach; maybe set a slightly loftier savings goal.",
        "Maintain your financial routine, maybe spice it up with a calculated risk.",
        "You're on solid ground. Consider reviewing investment strategies for a little more zest.",
        "Why not treat yourself modestly for a job well done?",
      ],
    },
    Ok: {
      color: "#fffc00",
      lines: [
        "Stick to the plan! Maybe introduce a small twist to spice up your financial routine.",
        "Consider reevaluating expenses and aim for a bit more moderation.",
        "You're cruising, but review your financial radar for potential opportunities.",
        "Stay steady. Maybe shuffle the budget a bit for a refreshing change.",
        "Explore new saving strategies, just to give the finances a gentle nudge.",
      ],
    },
    Poor: {
      color: "#ff9d00",
      lines: [
        "Revisit expenses - you might find untapped savings by cutting back.",
        "Consider exploring frugal hacks to pump up the savings.",
        "Review and plug budget leaks for a little financial CPR.",
        "Revive the emergency fund; even small additions can make a difference.",
        "Explore ways to curtail spending - every bit counts!",
      ],
    },
    Terrible: {
      color: "#ff0000",
      lines: [
        "Prioritize debt management; explore strategies to start chipping away.",
        "Consider seeking financial counseling for a structured debt management plan.",
        "Focus on building a tiny emergency fund - even small savings can be a starting point.",
        "Refrain from new debts; focus on the financial spring cleaning instead.",
        "Explore drastic cost-cutting measures to reverse the financial tide.",
      ],
    },
  };

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
      return [0, 0];
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

  const calculateFinancialHealth = (totals) => {
    const totalExpenses = totals.reduce((acc, current) => acc + current[0], 0);
    const totalIncome = totals.reduce((acc, current) => acc + current[1], 0);

    const debtToIncomeRatio =
      totalExpenses !== 0 ? totalExpenses / totalIncome : 0;

    console.log(debtToIncomeRatio, totalExpenses, totalIncome);

    if (debtToIncomeRatio <= 0.2) {
      setFinancialHealthGrade("Magnificent");
    } else if (debtToIncomeRatio <= 0.5) {
      setFinancialHealthGrade("Good");
    } else if (debtToIncomeRatio <= 0.7) {
      setFinancialHealthGrade("Ok");
    } else if (debtToIncomeRatio <= 0.9) {
      setFinancialHealthGrade("Poor");
    } else {
      setFinancialHealthGrade("Terrible");
    }
  };

  useEffect(() => {
    // Set up charts
    const timeFrames = [];

    //Only add to timeFrames if there is data
    if (yearTotal[0] !== 0 || yearTotal[1] !== 0) {
      timeFrames.push("yearly");
    }
    if (monthTotal[0] !== 0 || monthTotal[1] !== 0) {
      timeFrames.push("monthly");
    }
    if (weekTotal[0] !== 0 || weekTotal[1] !== 0) {
      timeFrames.push("weekly");
    }

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

      const chartOptions = {
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
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";

                if (label) {
                  label += ": ";
                }
                if (context.parsed !== null) {
                  label += new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(context.parsed);
                }
                return label;
              },
            },
          },
        },
      };

      new Chart(canvas, {
        type: "pie",
        data: chartData,
        options: chartOptions,
      });
    });

    //Scan through yearTotal, monthTotal, and weekTotal and assign a financial Health grade
    calculateFinancialHealth([yearTotal, monthTotal, weekTotal]);
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

        <Modal
          isOpen={modalForm?.isOpen}
          closeModal={modalForm?.closeModalFunc}
          modalForm={modalForm}
          setUpdate={setUpdate}
          setModalFormData={setModalFormData}
        />

        <main className="content">
          <section className="summary" style={{ marginTop: "50px" }}>
            <h2>Your Financial Summary</h2>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ flex: "1" }}>
                <p>
                  Total expenses this year:
                  <b>
                    $
                    {yearTotal[0].toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </b>
                </p>
                <p>
                  Total expenses this month:{" "}
                  <b>
                    $
                    {monthTotal[0].toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </b>
                </p>
                <p>
                  Total expenses this week:{" "}
                  <b>
                    $
                    {weekTotal[0].toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </b>
                </p>
              </div>
              <div style={{ flex: "1" }}>
                <p>
                  Total Income this year:{" "}
                  <b>
                    $
                    {yearTotal[1].toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </b>
                </p>
                <p>
                  Total Income this month:{" "}
                  <b>
                    $
                    {monthTotal[1].toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </b>
                </p>
                <p>
                  Total Income this week:{" "}
                  <b>
                    $
                    {weekTotal[1]?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </b>
                </p>
              </div>
            </div>
            <div className="card-list">
              {(yearTotal[0] !== 0 || yearTotal[1] !== 0) && (
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
              )}
              {(monthTotal[0] !== 0 || monthTotal[1] !== 0) && (
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
              )}
              {(weekTotal[0] !== 0 || weekTotal[1] !== 0) && (
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
              )}
            </div>
            {financialHealthGrade && transactions.length && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    justifyContent: "center",
                  }}
                >
                  <h3
                    style={{
                      color: "black",
                      fontWeight: "normal",
                    }}
                  >
                    {userfirst.get("firstName")}, your financial health is{" "}
                  </h3>
                  <h3
                    style={{
                      fontSize: "35px",
                      color: financialHealth[financialHealthGrade].color,
                      lineHeight: "1",
                      marginLeft: "10px",
                    }}
                  >
                    {financialHealthGrade}
                  </h3>
                </div>
                <div className="row">
                  <div className="col">
                    {" "}
                    <h3
                      style={{
                        color: "black",
                        fontWeight: "normal",
                      }}
                    >
                      We recommend you:
                    </h3>
                  </div>
                  <div className="col" style={{ flexBasis: "40%" }}>
                    <RollingText
                      phrases={financialHealth[financialHealthGrade].lines}
                    />
                  </div>
                </div>
              </div>
            )}
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
