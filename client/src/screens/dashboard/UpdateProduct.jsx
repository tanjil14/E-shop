import { useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Colors from "../../components/Colors";
import RichTextEditor from "../../components/RichTextEditor";
import ScreenHeader from "../../components/ScreenHeader";
import SizesList from "../../components/SizesList";
import Spinner from "../../components/Spinner";
import { useGetCategoryQuery } from "../../store/services/categoryServices";
import {
  useGetProductsByIdQuery,
  useUpdateProductMutation,
} from "../../store/services/productServices";
import { sizes } from "./CreateProduct";
import Wrapper from "./Wrapper";
const UpdateProduct = () => {
  const { id } = useParams();
  console.log(id);
  const { data: product, isFetching: fetching } = useGetProductsByIdQuery(id);
  console.log(product);
  const { data = [], isFetching } = useGetCategoryQuery();
  console.log(data);
  const [content, setContent] = useState("");
  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
  });
  const [sizeList, setSizeList] = useState([]);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const saveColors = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex, id: uuidv4() }],
    });
  };
  const deleteColor = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.color);
    setState({ ...state, colors: filtered });
  };
  const chooseSize = (sizeObject) => {
    const filtered = sizeList.filter((size) => size.name !== sizeObject.name);
    setSizeList([...filtered, sizeObject]);
  };
  const deleteSize = (name) => {
    const filtered = sizeList.filter((size) => size.name !== name);
    setSizeList(filtered);
  };
  const [updateProduct, response] = useUpdateProductMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...state,
      description: content,
      sizes: sizeList,
    };
    updateProduct(data);
    setState(data);
  };
  useEffect(() => {
    if (!fetching) {
      setState(product);
      setSizeList(product.sizes);
      setContent(product.description);
    }
  }, [product]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i>
          products list
        </Link>
      </ScreenHeader>
      {!fetching ? (
        <div className="flex flex-wrap -mx-3">
          <form className="w-full xl:w-8/12 p-3" onSubmit={handleSubmit}>
            <h3 className="pl-3 capitalize text-lg font-medium text-gray-400">
              edit product
            </h3>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="title" className="label">
                  title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="title"
                  placeholder="title..."
                  value={state.title}
                  onChange={handleInput}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="price" className="label">
                  price
                </label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  id="price"
                  placeholder="price..."
                  value={state.price}
                  onChange={handleInput}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="discount" className="label">
                  discount
                </label>
                <input
                  type="number"
                  name="discount"
                  className="form-control"
                  id="discount"
                  placeholder="discount..."
                  value={state.discount}
                  onChange={handleInput}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="stock" className="label">
                  stock
                </label>
                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  id="stock"
                  placeholder="stock..."
                  value={state.stock}
                  onChange={handleInput}
                />
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="categories" className="label">
                  categories
                </label>
                {!isFetching ? (
                  data?.categories?.length > 0 && (
                    <select
                      name="category"
                      id="categories"
                      className="form-control"
                      value={state.category}
                      onChange={handleInput}
                    >
                      <option value="">Choose category</option>
                      {data?.categories?.map((category) => (
                        <option value={category.name} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )
                ) : (
                  <Spinner />
                )}
              </div>
              <div className="w-full md:w-6/12 p-3">
                <label htmlFor="colors" className="label">
                  choose colors
                </label>
                <TwitterPicker onChangeComplete={saveColors} />
              </div>
              <div className="w-full p-3">
                <label htmlFor="sizes" className="label">
                  choose sizes
                </label>
                {sizes && (
                  <div className="flex flex-wrap -mx-3">
                    {sizes.map((size) => (
                      <div
                        key={size.name}
                        className="size"
                        onClick={() => chooseSize(size)}
                      >
                        {size.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-full p-3">
                <label htmlFor="description" className="label">
                  Description
                </label>
                <RichTextEditor content={content} setContent={setContent} />
              </div>
              <div className="w-full p-3">
                <input
                  type="submit"
                  //   value={response.isLoading ? "loading..." : "save product"}
                  //   disabled={response.isLoading ? true : false}
                  className="btn btn-indigo"
                />
              </div>
            </div>
          </form>
          <div className="w-full xl:w-4/12 p-3">
            <Colors colors={state.colors} deleteColor={deleteColor} />
            <SizesList list={sizeList} deleteSize={deleteSize} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default UpdateProduct;
