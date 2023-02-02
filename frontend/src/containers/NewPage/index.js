import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";
import { Row, Col, Container } from "react-bootstrap";
import linearCategories from "../../helpers/linearCategories";

function NewPage(props) {
  const [createModel, setCreateModel] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);


  const handleBannerImages =(e) => {
    console.log(e);
  }


  const handleProductImages =(e) => {
    console.log(e);
  }

  const renderCreatePageModel = () => {
    return (
      <NewModal
        show={createModel}
        modelTitle={"Create New Page"}
        handleClose={() => setCreateModel(false)}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-contol form-control-sm"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
                className="form-control-sm"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input 
               value= {desc}
               onChange={(e) => setDesc(e.target.vale)}
               placeholder={"Page Description"}
               className="form-control-sm"
              />
            </Col>
          </Row>
          <Row>
            <Col>
                <Input 
                 type="file"
                 name="banners"
                 onChange={handleBannerImages()}
                 className="form-control-sm"
                />
            </Col>
          </Row>
          <Row>
            <Col>
                <Input 
                 type="file"
                 name="products"
                 onChange={handleProductImages()}
                 className="form-control-sm"
                />
            </Col>
          </Row>
        </Container>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      {renderCreatePageModel()}
      <button onClick={() => setCreateModel(true)}>Launch</button>
    </Layout>
  );
}

export default NewPage;
