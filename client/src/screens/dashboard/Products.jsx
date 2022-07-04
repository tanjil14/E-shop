import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { clearMessage } from "../../store/reducers/globalReducer";
import { useGetProductsByPageQuery } from "../../store/services/productServices";
import Wrapper from "./Wrapper";

const Products = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { data = [], isFetching } = useGetProductsByPageQuery(page);
  console.log(data);
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.globalReducer);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
    return () => {
      dispatch(clearMessage());
    };
  }, []);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-product" className="btn-dark">
          create product<i className="bi bi-plus"></i>
        </Link>
        <Toaster position="top-right" />
      </ScreenHeader>
      {!isFetching ? (
        data?.products?.length > 0 ? (
          <div>
            <table className="w-full bg-gray-900 rounded-md">
            <thead>
              <tr className="table-row">
                <th className="table-header">name</th>
                <th className="table-header">price</th>
                <th className="table-header">stock</th>
                <th className="table-header">image</th>
                <th className="table-header">edit</th>
                <th className="table-header">delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map(product=>(
                <tr className="odd:bg-gray-800" key={product._id}>
                  <td className="table-data">{product.title}</td>
                  <td className="table-data">{product.price}</td>
                  <td className="table-data">{product.stock}</td>
                  <td className="table-data">{product.title}</td>
                  <td className="table-data">edit</td>
                  <td className="table-data">delete</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        ) : (
          "No products"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Products;
