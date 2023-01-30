import React, { useState } from "react";
import Layout from "../../components/layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { addProduct } from "../../actions/product.action";
import NewModal from "../../components/UI/Modal";

function Products() {
  const category = useSelector ((state) => state.category);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const[description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();

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
      <Table responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Product Pictures</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {
          product.products.length > 0 ?
          product.products.map(product => <tr key= {product._id}>
            <td>1</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.description}</td>
            <td>Pictures</td>
            <td>{product.category}</td>
          </tr> 
            ) : null
        }
        
        
        
      </tbody>
    </Table>
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
    </Layout>
  );
}

export default Products;
