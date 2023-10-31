import './LoginPage.scss';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage () {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    return (
        <>
      <div>Login</div>
      <input type='button' onClick={() => {
        setAuth(true)
        navigate(from, { replace: true });
      }}>Login</input>
    </>
    )
}