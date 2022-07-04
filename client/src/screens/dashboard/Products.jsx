import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import { clearMessage } from "../../store/reducers/globalReducer";
import Wrapper from "./Wrapper";

const Products = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  console.log(page);
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
      </ScreenHeader>
      <Toaster position="top-right" />
    </Wrapper>
  );
};

export default Products;
