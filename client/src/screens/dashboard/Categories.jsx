import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";

const Categories = () => {
  return (
    <Wrapper>
      <ScreenHeader>
        <Link className="btn-dark" to="/dashboard/create-category">
          add categories<i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed cum magnam
      eos fugit consequatur atque quo ipsa accusamus molestias commodi aut
      eligendi deleniti, aspernatur pariatur ab odio, soluta illum iure at!
      Repellendus dolor explicabo veniam
    </Wrapper>
  );
};

export default Categories;
