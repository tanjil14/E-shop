import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
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
                <th className="table-header ">edit</th>
                <th className="table-header">delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map(product=>(
                <tr className="odd:bg-gray-800" key={product._id}>
                  <td className="table-data">{product.title}</td>
                  <td className="table-data">{product.price}.00</td>
                  <td className="table-data">{product.stock}</td>
                  <td className="table-data">
                    <img src={`/images/${product.image1}`} alt="img name" className="w-10 h-10 object-cover rounded-full" />
                  </td>
                  <td className="table-data"><Link to={`/dashboard/update-product/${product._id}`} className="btn btn-warning">edit</Link></td>
                  <td className="table-data"><span className="btn btn-danger cursor-pointer">delete</span></td>
                </tr>
              ))}
            </tbody>
            </table>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/products"
            />
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
