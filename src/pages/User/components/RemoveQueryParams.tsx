import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RemoveQueryParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.has('imp_uid') && searchParams.has('success')
      ? navigate(location.pathname, { replace: true })
      : '';
  }, [location.search, navigate]);

  return null;
};

export default RemoveQueryParams;
