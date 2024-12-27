import Header from '@components/Header/Header';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Header title="로그인/회원가입" />
      <Link to="/user/signup">회원가입</Link>
    </>
  );
};

export default Login;
