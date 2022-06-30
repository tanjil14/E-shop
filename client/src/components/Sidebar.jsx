import { Link } from "react-router-dom";

const Sidebar = ({side,closeSidebar}) => {
  return (
    <div className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all`}>
        <i className="bi bi-x-lg absolute top-4 right-4 sm:hidden block cursor-pointer text-lg" onClick={closeSidebar}></i>
      <div className="bg-white p-4">
        <img src="../../public/logo.svg" alt="logo" />
      </div>
      <ul className="mt-4">
        <li className="px-4 py-3 transition-all cursor-pointer text-white flex items-center gap-2 hover:bg-gray-600">
          <i className="bi bi-card-list inline-block text-lg"></i>
          <Link className="text-base font-semibold capitalize" to="/dashboard/products">products</Link>
        </li>
        <li className="px-4 py-3 transition-all cursor-pointer text-white flex items-center gap-2 hover:bg-gray-600">
          <i className="bi bi-bag-check inline-block text-lg"></i>
          <Link className="text-base capitalize font-semibold" to="/dashboard/products">orders</Link>
        </li>
        <li className="px-4 py-3 transition-all cursor-pointer text-white flex items-center gap-2 hover:bg-gray-600">
          <i className="bi bi-people-fill inline-block text-lg"></i>
          <Link className="text-base capitalize font-semibold" to="/dashboard/products">customers</Link>
        </li>
        <li className="px-4 py-3 transition-all cursor-pointer text-white flex items-center gap-2 hover:bg-gray-600">
          <i className="bi bi-bar-chart inline-block text-lg"></i>
          <Link className="text-base capitalize font-semibold" to="/dashboard/products">categories</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
