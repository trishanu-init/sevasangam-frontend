import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { set } from 'zod';

const CreateLinkedAccounts = () => {
    const api = import.meta.env.VITE_API_URL;
    const [newlyVerifiedTemples, setVerifiedTemples] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchVerifiedAccountPendingTemples = async () => {

        try {
            const res = await axios.get(`${api}/temple/verified-account-creation-pending`);

            if (res.data.success) {
                setVerifiedTemples(res.data.data.temples)

            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error Updating temple:', error);
        }


    }
    


    const handleVerifyTemple = async (id) => {

        try {
            const res = await axios.post(`${api}/temple/verify-temple/${id}`);

            if (res.data.success) {
                toast.success(res.data.message);
                fetchData()

            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.error('Error creating temple:', error);
        }


    }
    const fetchData = async () => {
        setLoading(true)
        await fetchVerifiedAccountPendingTemples()
        setLoading(false)
    }


    useEffect(() => {

        fetchData()

    }, [])
    return (

        <Layout>
            <section>
                <div className="section-heading mb-2">
                    Pending Account Creation
                </div>


                {newlyVerifiedTemples.length > 0 &&


                    (
                        <>
                            <h3 className='mb-2 fw-bold text-primary'> Recently Verified </h3>
                            <div className="table-responsive">
                                <table className=" table table-light table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <td><p className='fw-bold text-primary'>S.No</p></td>
                                            <td><p className='fw-bold text-primary'>Name</p></td>
                                            <td><p className='fw-bold text-primary'>Location</p></td>
                                            <td><p className='fw-bold text-primary'>Contact Person</p></td>
                                            <td><p className='fw-bold text-primary'>Created On</p></td>
                                            <td><p className='fw-bold text-primary'>Created By</p></td>

                                            <td colSpan={1}><p className='fw-bold text-primary'>Actions</p></td>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {newlyVerifiedTemples?.map((temple, index) => (
                                            <tr key={index}>

                                                <td> {index + 1}</td>
                                                <td>{temple.templeName}</td>
                                                <td>{temple.location.address} </td>
                                                <td>{temple.contactPerson.name} ({temple.contactPerson.email}, {temple.contactPerson.mobile})</td>
                                                <td>{new Date(temple.createdOn).toLocaleDateString("en-GB")}</td>
                                                <td>{temple.createdBy.name}</td>
                                                <td><Link to={`/superadmin/approve-bank-details/${temple._id}`} className='btn btn-theme-primary'>View Bank Details</Link></td>

                                            </tr>



                                        ))}



                                    </tbody>
                                </table>
                            </div> </>)}
            </section>
            {!loading && newlyVerifiedTemples.length === 0 && <div className='my-4  text-center'>No New Changes in Temples Found</div>}
            {loading && (
                <section className="d-flex m-auto">
                    <HashLoader color={"#ff395c"} />
                </section>
            )}

        </Layout >
    )
}

export default CreateLinkedAccounts