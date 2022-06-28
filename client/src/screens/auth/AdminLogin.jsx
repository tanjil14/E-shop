
const AdminLogin = () => {
    return (
        <div className="bg-black1 h-screen flex justify-center items-center">
            <form className="bg-black2 p-6 w-10/12 sm:w-8/12 md:w-6/12 lg:w-3/12">
                <h3 className="text-white capitalize mb-3 font-semibold text-lg">dashboard login</h3>
                <div className="mb-3 mt-3">
                    <input type="email" name="" className="w-full text-white bg-black1 p-3 rounded outline-none" placeholder="Enter email...." />
                </div>
                <div className="mb-3">
                    <input type="password" name="" className="w-full text-white bg-black1 p-3 rounded outline-none" placeholder="Enter Password.." />
                </div>
                <div className="mb-3">
                    <input type="submit" value="Login &rarr;" className="w-full bg-indigo-600 p-3 rounded text-white uppercase font-semibold cursor-pointer" />
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;