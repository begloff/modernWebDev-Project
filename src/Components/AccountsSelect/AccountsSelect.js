import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AccountsSelect = ({ accounts }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/transactions/${id}`);
  };
  if (!accounts) {
    return <div>Loading...</div>;
  }

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
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </div>
                  <div className="col">
                    <button className="btn btn-danger">
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
        <button className="btn btn-primary" style={{ marginTop: "25px" }}>
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default AccountsSelect;
