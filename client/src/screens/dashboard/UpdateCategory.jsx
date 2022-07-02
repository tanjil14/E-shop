import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { setSuccess } from "../../store/reducers/globalReducer";
import {
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
} from "../../store/services/categoryServices";

import Wrapper from "./Wrapper";
const CreateCategory = () => {
  const { id } = useParams();
  const [state, setState] = useState("");
  const { data, isFetching } = useFetchCategoryQuery(id);
  const [saveCategory, response] = useUpdateCategoryMutation();
  //1st element is function and called any name

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = response?.error?.data?.errors
    ? response?.error?.data?.errors
    : [];
  const handleSubmit = (e) => {
    e.preventDefault();
    saveCategory({ name: state, id });
  };
  useEffect(() => {
    data?.category && setState(data?.category?.name);
  }, [data?.category]);
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
      {!isFetching ? (
        <form className="w-full md:w-8/12" onSubmit={handleSubmit}>
          <h3 className="text-lg capitalize mb-3">Update category</h3>
          {errors.length > 0 &&
            errors.map((error, key) => (
              <p className="alert-danger" key={key}>
                {error.msg}
              </p>
            ))}
          <div className="mb-3">
            <input
              type="text"
              className="form-control capitalize"
              placeholder="Category Name..."
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input type="submit" className="btn btn-indigo" value="Update" />
          </div>
        </form>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default CreateCategory;
