import { useEffect, useState, useMemo } from "react";

const Modal = ({
  isOpen,
  closeModal,
  modalForm,
  setUpdate,
  setModalFormData,
}) => {
  // read conditional isOpen. return modal html if true, null if false

  // Will Need to pass in form data from parent
  // Make form data like below, pass in a second object that specifies all of the fields in a given form
  // Pass in name of form as a prop to specify what the title is and what the update/create button says

  const [submitForm, setSubmitForm] = useState(false);

  const preCloseModal = (closeArgs) => {
    const updatedData = { ...modalForm.data };

    modalForm.fields.forEach((field) => {
      if (field.type === "select") {
        const defaultValue =
          modalForm?.data[field.name] ||
          (field.options.length > 0 ? field.options[0].value : "");

        updatedData[field.name] = defaultValue;
      }
    });

    // Update the modalForm state with the new data
    setModalFormData((prevModalForm) => ({
      ...prevModalForm,
      data: updatedData,
    }));

    setSubmitForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalFormData({
      ...modalForm,
      data: {
        ...modalForm.data,
        [name]: value, // Dynamically set the property name using square brackets
      },
    });
  };

  const closeArgs = useMemo(() => {
    if (modalForm?.title !== "Edit Transaction") {
      return [modalForm?.data, modalForm, setModalFormData, setUpdate, true];
    } else {
      return [
        modalForm?.data,
        modalForm?.id,
        modalForm,
        setModalFormData,
        setUpdate,
        true,
      ];
    }
  }, [modalForm, setModalFormData, setUpdate]);

  useEffect(() => {
    if (submitForm) {
      closeModal(...closeArgs);
    }
    setSubmitForm(false);
  }, [submitForm, closeModal, closeArgs]);
  //As a conditional component, need props to control whether or not it is displayed
  //Map displays all transaction fields
  //Can be updated to look better in the future

  //Will need to update so that button is only available if form is dirty
  //Use react hook form

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={() => closeModal(...closeArgs.slice(0, -1).concat(false))}
        >
          X
        </span>
        <h2>{modalForm?.title}</h2>
        <ul style={{ listStyleType: "none" }}>
          {modalForm?.fields.map((field, index) => {
            if (field.type === "select") {
              return (
                <li key={`${field.name}-${index}`}>
                  <label htmlFor={`${field.name}Input`}>{field.name}:</label>
                  <select
                    name={field.name}
                    id={`${field.name}Input`}
                    value={modalForm?.data[field.name]}
                    onChange={handleInputChange}
                  >
                    {field.options.map((option, index) => {
                      return (
                        <option
                          value={option.value}
                          key={`${option.value}-${index}`}
                        >
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </li>
              );
            } else {
              return (
                <li key={`${field.name}-${index}`}>
                  <label htmlFor={`${field.name}Input`}>{field.name}:</label>
                  <input
                    type={field.type}
                    name={field.name}
                    id={`${field.name}Input`}
                    value={modalForm?.data[field.name]}
                    onChange={handleInputChange}
                  />
                </li>
              );
            }
          })}
        </ul>
        <button
          className="btn btn-primary"
          onClick={() => preCloseModal(closeArgs)}
        >
          {modalForm?.title === "Edit Transaction"
            ? "Update Transaction"
            : "Create Transaction"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
