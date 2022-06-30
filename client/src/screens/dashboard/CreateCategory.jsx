import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";

const CreateCategory = () => {
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/categories" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i>
          categories list
        </Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12">
        <h3 className="text-lg capitalize mb-3">create category</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category Name..."
          />
        </div>
        <div className="mb-3">
          <input
            type="submit"
            className="btn-indigo"
            placeholder="Category Name..."
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
