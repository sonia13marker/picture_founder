import './LoginPage.scss';
// import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function LoginPage () {
    // const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const {singIn} = useAuth();

    /*просто пример, его надо делать на странице аккаунта */
    const {singOut} = useAuth();

    /* проверка пути, откуда пришел пользователь на стр логина. 
    тут идет проверка на передачу у location стейта, у которого 
    должны присутствовать след. значения. 
    если их нет, передаем, что юзер пришел с главной страницы.*/
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        /* чтобы форма не отправлялась */
        event.preventDefault();

        /* получаем форму */
        const form = event.target;
        /* проверка что там не пусто ?.*/
        const user = form.username.value;

        singIn(user, () => navigate(from, { replace: true }));



    }

    return (
        <>
      <div>Login</div>
      {/* <input type='button' onClick={() => {
        setAuth(true)
        navigate(from, { replace: true });
      }}>Login</input> */}
      <form onSubmit={handleSubmit}>
      <label>
        Name: <input name="username" />
      </label>
      <button type="submit">
      Login
      </button>
{/*replace: true не оставляет возможности вернуться назад */}
      <button onClick={() => singOut(() => navigate('/', {replace: true}))} >
      Logout
      </button>
      </form>
      {from}
    </>
    )
}