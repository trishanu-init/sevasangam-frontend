import axios from 'axios';
import toast from 'react-hot-toast';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';

const OauthGoogle = () => {

    const api = import.meta.env.VITE_API_URL;
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();



    const handleGoogleLoginSuccess = async ({ data }) => {

        const accessToken = data.access_token;


        try {
            const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { name, email, picture } = userInfoRes.data;

            // Send user data to your backend to handle registration or login
            const res = await axios.post(`${api}/auth/google-login`, {
                name,
                email,
                picture,
                accessToken,
            });

            if (res.data.success) {

                setAuth({ ...auth, user: res.data.user, token: res.data.token });
                localStorage.setItem("auth", JSON.stringify(res.data));
                toast.success(res.data.message);
                window.location.reload()

                // Perform any further actions, e.g., redirect to a different page
            } else {
                toast.error(res.data.error);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <LoginSocialGoogle
            client_id={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
            fetch_basic_profile={true}
            scope="profile email"
            onResolve={handleGoogleLoginSuccess}
            onReject={(err) => {
                console.log(err);
            }}
        >

            <button className=" btn-theme-accent p-2 fw-regular custom-google-login-button">
                <img style={{ width: "30px" }} src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"></img> Login / Signup with Google
            </button>
        </LoginSocialGoogle>
    )
}

export default OauthGoogle