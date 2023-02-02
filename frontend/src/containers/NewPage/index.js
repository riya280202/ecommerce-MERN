import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";
import { Row, Col, Container } from "react-bootstrap";
import linearCategories from "../../helpers/linearCategories";
import { createPage } from "../../actions";

function NewPage(props) {
  const [createModel, setCreateModel] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModel(false);
      setTitle("");
      setDesc("");
      setProducts([]);
      setBanners([]);
      setCategoryId("");
    }
  }, [page]);

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    if (title === "") {
      alert("title is required");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });

    dispatch(createPage(form));
  };

  const renderCreatePageModel = () => {
    return (
      <NewModal
        show={createModel}
        modelTitle={"Create New Page"}
        handleClose={() => setCreateModel(false)}
        onSubmit= {submitPageForm}
      >
        <Container>
          <Row>
            <Col>
            <Input 
              type="select"
              value={categoryId}
              onChange={onCategoryChange}
              options={categories}
              placeholder="Select Category"
            />
              {/* <select
                className="form-contol form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select> */}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Description"}
                className="form-control-sm"
              />
            </Col>
          </Row>
          {banners.length > 0
            ? banners.map((banner, index) => (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                type="file"
                name="banners"
                onChange={handleBannerImages}
                className="form-control-sm"
              />
            </Col>
          </Row>

          {products.length > 0
            ? products.map((product, index) => (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ))
            : null}
          <Row>
            <Col>
              <Input
                type="file"
                name="products"
                onChange={handleProductImages}
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
      {page.loading ? (
        <p>Creating Page... Please Wait</p>
      ) : (
        <>
          {renderCreatePageModel()}
          <button onClick={() => setCreateModel(true)}>Launch</button>
        </>
      )}
    </Layout>
  );
}

export default NewPage;
