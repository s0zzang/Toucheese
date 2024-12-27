import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      로그인 페이지
      <Link to="/user/signup">회원가입</Link>
    </>
  );
};

export default Login;
