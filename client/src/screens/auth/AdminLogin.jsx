import { useState } from "react";
import { useAuthLoginMutation } from "../../store/services/authServices";

const AdminLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [login] = useAuthLoginMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(data);
  };
  return (
    <div className="bg-black1 h-screen flex justify-center items-center">
      <form
        onClick={handleSubmit}
        className="bg-black2 p-6 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12"
      >
        <h3 className="text-white capitalize mb-3 font-semibold text-lg">
          dashboard login
        </h3>
        <div className="mb-3 mt-3">
          <input
            type="email"
            name="email"
            className="w-full text-white bg-black1 p-3 rounded outline-none"
            placeholder="Enter email...."
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="w-full text-white bg-black1 p-3 rounded outline-none"
            placeholder="Enter Password.."
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="submit"
            value="Login &rarr;"
            className="w-full bg-indigo-600 p-3 rounded text-white uppercase font-semibold cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
