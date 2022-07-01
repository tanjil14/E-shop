import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import { setSuccess } from "../../store/reducers/globalReducer";
import { useCreateCategoryMutation } from "../../store/services/categoryServices";
import Wrapper from "./Wrapper";
const CreateCategory = () => {
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createCategory, response] = useCreateCategoryMutation();
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];
  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({ name: state });
  };
  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/categories");
    }
  }, [response?.isSuccess]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i>
          categories list
        </Link>
      </ScreenHeader>
      <form onSubmit={handleSubmit} className="w-full md:w-8/12">
        <h3 className="text-lg capitalize mb-3">create category</h3>
        {errors.length > 0 &&
          errors.map((error, key) => (
            <p className="alert-danger" key={key}>
              {error.msg}
            </p>
          ))}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name..."
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="submit"
            className="btn-indigo"
            value={response?.isLoading ? "loading..." : "create category"}
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
