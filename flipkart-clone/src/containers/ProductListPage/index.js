import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getProductsBySlug } from "../../actions";
import Layout from "../../components/Layout";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

function ProductListPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const slug = window.location.pathname.split("/")[1];
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000
  });

  useEffect(() => {
    const slug = window.location.pathname.split("/")[1];
    dispatch(getProductsBySlug(slug));
  }, []);

  return (
    <Layout>
      <div className="card">
      <div className="cardHeader">
              <div>Latest {slug} mobile</div>
              <button>View All</button>
            </div>
      </div>
      {
        <div style={{display: "flex"}}>
          
          {
          product.products.slice(0,8).map((product) => (
                <div className="productContainer">
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div className="productTitle">
                      {product.name}
                    </div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>3434</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </div>
              ))
              }
        </div>
      }
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div> {slug} mobile under {priceRange[key]}</div>
              <button>View All</button>
            </div>
            <div style={{display: "flex"}}>
              {product.productsByPrice[key].map((product) => (
                <div className="productContainer">
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div className="productTitle">
                      {product.name}
                    </div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>3434</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </div>
              ))
              }
            </div>
          </div>
        );
      })}
    </Layout>
  );
}

export default ProductListPage;
