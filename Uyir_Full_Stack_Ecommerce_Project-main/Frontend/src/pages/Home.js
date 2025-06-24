import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import wish from "../images/wish.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/products/productSlilce";
import ReactStars from "react-rating-stars-component";
import { addToWishlist } from "../features/products/productSlilce";

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product?.product);
  console.log(productState)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getblogs();
    getProducts();
  }, []);
  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="main-banner position-relative">
            <img
              src="https://d1sl07a7h3d3fr.cloudfront.net/admin/store/a3398e93-abfa-46e2-9262-b01a3f7037f9-WhatsAppImage2024-04-17at3.55.40PM(1).jpeg"
              className="img-fluid"
              alt="main banner"
            />
          </div>
        </div>
      </div>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                          <img
                            src={wish}
                            alt="wishlist"
                            onClick={(e) => {
                              addToWish(item?._id);
                            }}
                          />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images[0]?.url}
                          alt="product image"
                          height={"250px"}
                          width={"260px"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                        <img
                          src={item?.images[0]?.url}
                          alt="product image"
                          height={"250px"}
                          width={"260px"}
                          onClick={() => navigate("/product/" + item?._id)}
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalrating.toString()}
                          edit={false}
                          activeColor="#ffd700"
                        />

                        <p className="price">Rs. {item?.price}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <Link to={'/product'}>
              <div className="famous-card position-relative">
                <img
                  src="https://d1sl07a7h3d3fr.cloudfront.net/admin/product/1675c625-23a7-435f-9fcd-f56e44266b61-blob"
                  className="img-fluid"
                  alt="famous"
                />
              </div>
            </Link>
          </div>
          <div className="col-3">
            <Link to={'/product'}>
              <div className="famous-card position-relative">
                <img
                  src="https://d1sl07a7h3d3fr.cloudfront.net/admin/product/eea8a016-ed29-4291-b752-b6c92dacacfc-blob"
                  className="img-fluid"
                  alt="famous"
                />
              </div>
            </Link>
          </div>
          <div className="col-3">
            <Link to={'/product'}>
              <div className="famous-card position-relative">
                <img
                  src="https://d1sl07a7h3d3fr.cloudfront.net/admin/product/ea7c0cdc-e043-4b85-a2ed-798ef04ab75e-blob"
                  className="img-fluid"
                  alt="famous"
                />
              </div>
            </Link>
          </div>
          <div className="col-3">
            <Link to={'/product'}>
              <div className="famous-card position-relative">
                <img
                  src="https://d1sl07a7h3d3fr.cloudfront.net/admin/product/4c932e67-22ea-4741-b8f1-0b91e90ce9ae-blob"
                  className="img-fluid"
                  alt="famous"
                />
              </div>
            </Link>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    totalrating={item?.totalrating.toString()}
                    price={item?.price}
                    img={item?.images[0].url}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row g-3">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "popular") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button className="border-0 bg-transparent">
                          <img
                            src={wish}
                            alt="wishlist"
                            onClick={(e) => {
                              addToWish(item?._id);
                            }}
                          />
                        </button>
                      </div>
                      {item?.images?.length > 0 && (
  <div className="product-image">
    <img
      src={item?.images[0].url}
      alt="product image"
      height="250px"
      width="100%"
      onClick={() => navigate("/product/" + item?._id)}
    />
    <img
      src={item?.images[0].url}
      alt="product image"
      height="250px"
      width="100%"
      onClick={() => navigate("/product/" + item?._id)}
    />
  </div>
)}

                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">
                          {item?.title?.substr(0, 70) + "..."}
                        </h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={item?.totalrating.toString()}
                          edit={false}
                          activeColor="#ffd700"
                        />

                        <p className="price">Rs. {item?.price}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState &&
            blogState?.map((item, index) => {
              if (index < 4) {
                return (
                  <div className="col-3 " key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              }
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;
