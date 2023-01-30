import React, { useState } from "react";
import Layout from "../../components/layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { addProduct } from "../../actions";
import NewModal from "../../components/UI/Modal";
import "./style.css"
import {generatePublicUrl} from "../../urlConfig"

function Products() {
  const category = useSelector ((state) => state.category);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const[description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModel, setProductDetailModel] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

  console.log(product);

  const handleClose = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);
    for(let pic of productPictures){
      form.append('productPicture', pic)
    }

    dispatch(addProduct(form));
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };


  const handleProductPicture = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ])
  }


  const renderProducts = () => {
    return (
      <Table style={{fontSize: 12}} responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {
          product.products.length > 0 ?
          product.products.map(product => <tr onClick={() => showProductDetailModel(product)} key= {product._id}>
            <td>1</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.category.name}</td>
          </tr> 
            ) : null
        }
        
        
        
      </tbody>
    </Table>
    )
  }


  const renderAddProductModel = () => {
    return (
      <NewModal
      modelTitle = {"Add New Product"}
      show = {show}
      handleClose = {handleClose}
    >
    <Input
          placeholder="Product Name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Enter the Quantity"
          value={quantity}
          type="text"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          placeholder="Price"
          value={price}
          type="text"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="Product Description"
          value={description}
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

            {productPictures.length > 0 ?
            productPictures.map((pic,index) => <div key={index}> {pic.name}</div>) : null
          }


        <Input type="file" name="productPicture" onChange={handleProductPicture}>

        </Input>
    </NewModal>
    )
  }

  const handleCloseProductDetailsModel = () => {
    setProductDetailModel(false);
  }


  const showProductDetailModel = (product) => {
    setProductDetails(product);
    setProductDetailModel(true);
  }
  const renderProductDetailModel = () => {
    if(!productDetails){
      return null;
    }

    return ( 
      <NewModal
        show = {productDetailModel}
        handleClose = {handleCloseProductDetailsModel}
        modelTitle = {"Product Details"} 
        size= "lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col >
            <label className="key"> Product Pictures </label>
            <div style={{display: 'flex'}}>
            {productDetails.productPictures.map(picture =>
              <div className="productImgContainer">
                <img src={generatePublicUrl(picture.img)} />
              </div>
            )}
            </div>
          </Col>
        </Row>
      </NewModal>
    )
  }

  return (
    <Layout sidebar>
      <Container>
      <Row>
        <Col md={12}>
          <div style={{ display: "flex ", justifyContent: "space-between" }}>
            <h3>Products</h3>
            <button onClick={handleShow}>Add</button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
            {renderProducts()}
        </Col>
      </Row>
      </Container>
    {renderAddProductModel()}
    {renderProductDetailModel()}
    </Layout>
  );
}

export default Products;
