import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../store/services/categoryServices";
import Wrapper from "./Wrapper";
const Categories = () => {
  const dispatch = useDispatch();
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { data = [], isFetching } = useGetCategoryQuery(page);
  const [removeCategory, response] = useDeleteCategoryMutation();
  const { success } = useSelector((state) => state.globalReducer);
  const deleteItem = (id) => {
    if (window.confirm("Are you really want to delete the category?")) {
      removeCategory(id);
    }
  };
  useEffect(() => {
    dispatch(setSuccess(success));
    return () => {
      dispatch(clearMessage());
    };
  }, []);
  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
    }
  }, [response?.data?.msg]);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to="/dashboard/create-category">
          add categories<i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>
            <div>
              <table className="w-full bg-gray-900 rounded-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      name
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      edit
                    </th>
                    <th className="p-3 uppercase text-sm font-medium text-gray-500">
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.categories?.map((category) => (
                    <tr key={category._id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {category.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <Link
                          to={`/dashboard/update-category/${category._id}`}
                          className="btn btn-warning"
                        >
                          edit
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteItem(category._id)}
                        >
                          {" "}
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/categories"
            />
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;
