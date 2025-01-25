import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import { HashLoader } from "react-spinners";
import ForgotPasswordModal from "../../components/modals/ForgotPassword";

const ApproveBankDetails = () => {
    const { id } = useParams();
    const api = import.meta.env.VITE_API_URL;

    const [currentTemple, setCurrentTemple] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    const templeFields = ["templeName","typeOfOrganization","createdOn"];
    const bankFields = ["bankName", "branch","accountHolderName","accountNumber", "ifscCode"];
    const taxFields = ["taxId", "ein"];

    const fetchCurrentTemple = async () => {
        try {
            const res = await axios.get(`${api}/temple/get-temple/${id}`);
            if (res.data.success) {
                setCurrentTemple(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error fetching current temple:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentTemple();
    }, []);

    const formatKey = (key) =>
        key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

    const renderFields = (fields, data) => {
        return fields.map((field) => {
            if (field === "logo" || field === "bannerImage") {
                return (
                    <tr key={field}>
                        <td>{formatKey(field)}</td>
                        <td colSpan={2}>
                            {data[field] && (
                                <img
                                    src={data[field]}
                                    alt={field}
                                    style={{ width: "auto", height: "100px", border: "3px solid #fff" }}
                                />
                            )}
                        </td>
                    </tr>
                );
            }

            return (
                <tr key={field}>
                    <td>{formatKey(field)}</td>
                    <td colSpan={2}>{data[field] || "N/A"}</td>
                </tr>
            );
        });
    };

    return (
        <Layout>
            {!loading && (
                <section>
                    <div>
                        <div style={{ fontSize: "30px" }} className="section-heading mb-2">
                            Temple Details: {currentTemple?.templeName}
                        </div>
                        <table className="verify-changes-table table table-light table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th colSpan={3}>Temple Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderFields(templeFields, currentTemple)}
                            </tbody>
                        </table>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <table className="verify-changes-table table table-light table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th colSpan={3}>Bank Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderFields(bankFields, currentTemple?.bankDetails || {})}
                                </tbody>
                            </table>
                            <table className="verify-changes-table table table-light table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th colSpan={3}>Tax Information</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderFields(taxFields, currentTemple?.taxInformation || {})}
                                </tbody>
                            </table>
                        </div>
                        <button data-bs-toggle="modal" data-bs-target="#AccountOpeningBackdrop" className="btn btn-theme-primary">
                            Start Creation
                        </button>
                    </div>
                </section>
            )}
            {loading && (
                <section className="d-flex m-auto">
                    <HashLoader color={"#ff395c"} />
                </section>
            )}
        </Layout>
    );
};

export default ApproveBankDetails;