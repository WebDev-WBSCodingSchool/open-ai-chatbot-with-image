import { ToastContainer } from 'react-toastify';
import { NavBar } from '@/components';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <>
      <ToastContainer theme='colored' autoClose={1000} />
      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
