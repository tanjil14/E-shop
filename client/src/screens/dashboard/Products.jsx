import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";

const Products = () => {
  return (
    <Wrapper>
      <ScreenHeader>
      <Link to="/dashboard/create-product" className="btn-dark">create product<i className="bi bi-plus"></i></Link>
      </ScreenHeader>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed cum magnam
      eos fugit consequatur atque quo ipsa accusamus molestias commodi aut
      eligendi deleniti, aspernatur pariatur ab odio, soluta illum iure at!
      Repellendus dolor explicabo veniam possimus voluptatibus velit veritatis
      enim doloribus, vel qui optio eum iusto fugit! Ea consequatur praesentium
      autem minima enim, quibusdam atque porro? Dignissimos, veritatis
      voluptatum omnis fugit perferendis ratione optio delectus, quidem
      repellendus consequuntur autem, ea quam nesciunt quis quia doloremque
      laudantium inventore repellat dolorum? Alias itaque iure saepe nemo
      nesciunt minus, perferendis distinctio sint excepturi quaerat deserunt
      modi aliquid voluptas optio quia dolores. Alias, eos!
    </Wrapper>
  );
};

export default Products;
