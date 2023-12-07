import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import "./AccountSelect.css";

const AccountsSelect = ({
  accounts,
  transactions,
  openModal,
  modalForm,
  setModalFormData,
  finishAccountEdit,
  finishAccountCreate,
  updateDeletedAccount,
  deleteAccount,
}) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/transactions/${id}`);
  };

  const formFields = [
    {
      name: "accountName",
      type: "string",
    },
  ];

  const handleButtonClick = (event, item) => {
    event.stopPropagation();
    if (item) {
      openModal(
        "Edit Account",
        formFields,
        {
          accountName: item.attributes.accountName,
          balance: item.attributes.balance,
          user: item.attributes.user,
        },
        setModalFormData,
        item.id,
        finishAccountEdit
      );
    } else {
      openModal(
        "New Account",
        formFields,
        {
          accountName: "",
          balance: 0,
          user: "",
        },
        setModalFormData,
        undefined,
        finishAccountCreate
      );
    }
  };

  const [newCharts, setNewCharts] = useState({});

  useEffect(() => {
    if (newCharts) {
      //create newCharts and set chartReferences
      for (const property in newCharts) {
        const canvasId = `chart-${property}`;
        const canvas = document.getElementById(canvasId);
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
          existingChart.destroy();
        }
        if (canvas) {
          new Chart(canvas, {
            type: "line",
            data: newCharts[property],
            options: {
              maintainAspectRatio: false,
              aspectRatio: 1.5,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.dataset.label || "";

                      if (label) {
                        label += ": ";
                      }
                      if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(context.parsed.y);
                      }
                      return label;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(value);
                    },
                  },
                },
                x: {
                  // Change the color of xAxis labels based on the sum of y-values
                  ticks: {
                    color: function (context) {
                      //using index, check if the value is positive or negative within newCharts[property].datasets[0].data
                      // console.log(newCharts[property].datasets);
                      const monthSum = newCharts[property].datasets.reduce(
                        (total, dataset) => total + dataset.data[context.index],
                        0
                      );

                      if (monthSum === 0) {
                        return "black";
                      } else if (monthSum > 0) {
                        return "rgb(57,255,20)";
                      } else {
                        return "rgb(255,7,58)";
                      }
                    },
                  },
                },
              },
            },
          });
        }
      }
    }
  }, [newCharts]);

  useEffect(() => {
    if (
      accounts &&
      accounts.length > 0 &&
      transactions &&
      transactions.length > 0
    ) {
      const chartReferences = {};
      accounts.forEach((account) => {
        const canvasId = `chart-${account.id}`;
        const canvas = document.getElementById(canvasId);
        if (canvas) {
          if (chartReferences[account.id]) {
            chartReferences[account.id].destroy();
          }

          const chartData = {
            labels: [], // Array of labels for each month
            datasets: [
              {
                label: "Expenses Over Last 12 Months",
                data: [], // Array of balance data for each month
                fill: false,
                borderColor: "rgb(255,7,58)",
                tension: 0.1,
              },
              {
                label: "Income Over Last 12 Months",
                data: [], // Array of balance data for each month
                fill: false,
                borderColor: "rgb(57,255,20)",
                tension: 0.1,
              },
            ],
          };

          // Get today's date and calculate date 12 months ago
          const today = new Date();
          today.setMonth(today.getMonth() + 1);
          today.setDate(1);
          today.setHours(0, 0, 0, 0);
          const twelveMonthsAgo = new Date();
          twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
          twelveMonthsAgo.setDate(1);
          twelveMonthsAgo.setHours(0, 0, 0, 0);

          // Loop through each month within the last 12 months
          let currentDate = new Date(twelveMonthsAgo);
          while (currentDate < today) {
            chartData.labels.push(
              currentDate.toLocaleString("default", {
                month: "short",
                year: "numeric",
              })
            );

            const monthExpenses = transactions.filter(
              (transaction) =>
                transaction.attributes?.account?.id === account.id &&
                new Date(transaction.attributes.date) >= currentDate &&
                new Date(transaction.attributes.date) <=
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    0
                  ) &&
                transaction.attributes.type === "expense"
            );

            const monthIncome = transactions.filter(
              (transaction) =>
                transaction.attributes?.account?.id === account.id &&
                new Date(transaction.attributes.date) >= currentDate &&
                new Date(transaction.attributes.date) <=
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    0
                  ) &&
                transaction.attributes.type === "income"
            );

            // Calculate the total balance for the current month's transactions
            const totalExpenses = monthExpenses.reduce(
              (total, transaction) => total - transaction.attributes.amount,
              0
            );
            chartData.datasets[0].data.push(totalExpenses);

            // Calculate the total balance for the current month's transactions
            const totalIncome = monthIncome.reduce(
              (total, transaction) => total + transaction.attributes.amount,
              0
            );
            chartData.datasets[1].data.push(totalIncome);

            currentDate.setMonth(currentDate.getMonth() + 1);
          }

          chartReferences[account.id] = chartData;
        }
      });
      setNewCharts({ ...chartReferences });
    }
  }, [accounts, transactions]);

  return (
    <div className="accountSelect">
      <div className="row">
        <h2 style={{ marginTop: "25px" }}>Accounts:</h2>
      </div>
      <div className="row">
        <div className="col">
          <div className="card-list" style={{ margin: "10px" }}>
            {accounts.map((item, index) => (
              <div
                className="card"
                key={index}
                id={`card-${index}`}
                onClick={() => handleClick(item.id)}
              >
                <h3 style={{ color: "black" }}>
                  {item.attributes.accountName}
                </h3>
                <div className="row">
                  <div
                    className="col chart-container"
                    style={{
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <canvas id={`chart-${item.id}`}></canvas>
                  </div>
                </div>
                <p>
                  Balance:{" "}
                  <b
                    style={{
                      color:
                        item.attributes.balance > 0
                          ? "rgb(57,255,20)"
                          : item.attributes.balance < 0
                          ? "rgb(255,7,58)"
                          : "black",
                    }}
                  >
                    ${item.attributes.balance.toFixed(2)}
                  </b>
                </p>
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-primary"
                      onClick={(event) => handleButtonClick(event, item)}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-danger"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteAccount(item.id);
                        updateDeletedAccount(item.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        {/* Future Work: Make new account actually functional */}
        <button
          className="btn btn-primary"
          style={{ marginTop: "25px" }}
          onClick={(event) => handleButtonClick(event, undefined)}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default AccountsSelect;
