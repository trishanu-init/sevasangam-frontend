import "./modals.css";
import { useState } from "react";
import { useAuth } from "../../context/Auth";

const AccountCreationModal = () => {

    const [auth] = useAuth();
    const user = auth?.user;
    const [isChecked, setIsChecked] = useState(false);

    const closeAccountOpeningModal = () => {
        // Close the modal
        const modal = document.getElementById("AccountOpeningBackdrop");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    }

    const handleNextClick = () => {
        if (!isChecked) {
            return; // Prevent the button click if checkbox is not checked
        }
        // Handle the "Next" button click
        closeAccountOpeningModal();
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    }

    return (
        <div
            className="modal fade"
            id="AccountOpeningBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Start Account Creation
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body text-left">
                        <p>Details of Verification Manager</p><br></br>
                        <table className="table table-light table-bordered table-striped">
                        <tbody>
                            <tr>
                            <td>Name:</td>
                            <td>{user?.name}</td>
                            </tr>
                            <tr>
                            <td>Email:</td>
                            <td>{user?.email}</td>
                            </tr>
                        </tbody>
                        </table>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="checkbox">
                                I have verified all the Bank details.
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer flex-column text-center">
                        <button
                            type="button"
                            onClick={handleNextClick}
                            className="m-auto btn btn-theme-primary"
                            disabled={!isChecked}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountCreationModal;