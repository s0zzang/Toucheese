import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useRemoveQueryParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.has('imp_uid') && searchParams.has('success')
      ? navigate('/user/profile', { replace: true })
      : '';
  }, [location.search, navigate]);

  return null;
};

export default useRemoveQueryParams;
