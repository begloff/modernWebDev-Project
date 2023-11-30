import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AccountsSelect = ({
  accounts,
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

  if (!accounts) {
    return <div>Loading...</div>;
  }

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

  return (
    <div>
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
                onClick={() => handleClick(item.id)}
              >
                <h3>{item.attributes.accountName}</h3>
                <p>Balance: ${item.attributes.balance}</p>
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
