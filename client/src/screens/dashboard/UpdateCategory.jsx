import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { useFetchCategoryQuery } from "../../store/services/categoryServices";
import Wrapper from "./Wrapper";
const CreateCategory = () => {
  const { id } = useParams();
  const [state, setState] = useState("");
  const { data, isFetching } = useFetchCategoryQuery(id);

  console.log(data);
  const dispatch = useDispatch();
  //   const errors = response?.error?.data?.errors
  //     ? response?.error?.data?.errors
  //     : [];
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     createCategory({ name: state });
  //   };
  useEffect(() => {
    data?.category && setState(data?.category?.name);
  }, [data?.category]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i>
          categories list
        </Link>
      </ScreenHeader>
      {!isFetching ? (
        <form className="w-full md:w-8/12">
          <h3 className="text-lg capitalize mb-3">Update category</h3>
          {/* {errors.length > 0 &&
      errors.map((error, key) => (
        <p className="alert-danger" key={key}>
          {error.msg}
        </p>
      ))} */}
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
