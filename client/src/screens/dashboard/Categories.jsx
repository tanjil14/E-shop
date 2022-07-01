import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import Wrapper from "./Wrapper";
const Categories = () => {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.globalReducer);
  useEffect(() => {
    dispatch(setSuccess(success));
    return () => {
      dispatch(clearMessage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to="/dashboard/create-category">
          add categories<i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      {success && <div className="alert-success">{success}</div>}
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed cum magnam
      eos fugit consequatur atque quo ipsa accusamus molestias commodi aut
      eligendi deleniti, aspernatur pariatur ab odio, soluta illum iure at!
      Repellendus dolor explicabo veniam
    </Wrapper>
  );
};

export default Categories;
