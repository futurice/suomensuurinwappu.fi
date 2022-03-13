import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-300 to-pink-500 p-4">
      <h1 className="text-lg font-bold">Wappukalenteri 2022</h1>

      <Outlet />
    </div>
  );
};
