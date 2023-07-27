import { FC, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { selectIsLogin } from '../../redux/auth/auth-slice';
interface IPrivateRoutes {}

export const PrivateRoutes: FC<IPrivateRoutes> = () => {
  const [isLogin, setIsLogin] = useState(true);
  const auth: boolean = useAppSelector(selectIsLogin);

  useEffect(() => {
    setIsLogin(auth);
  }, [auth]);

  return <>{isLogin || auth ? <Outlet /> : <Navigate to="/login" />}</>;
};
