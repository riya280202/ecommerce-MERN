import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import Layout from "../../components/layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoAdd,
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
  IoChevronDownSharp,
  IoChevronForwardSharp,
  IoTrash,
  IoCloudUpload
} from "react-icons/io5";
import UpdateCategoriesModel from "./components/UpdateCategoriesModel";
import DeleteCategoryModel from "./components/DeleteCategoryModel";
import AddCategoryModel from "./components/AddCategoryModel";
import "./style.css";

function Category(props) {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setparentCategoryId] = useState("");
  const [categoryImage, setcategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModel, setUpdateCategoryModel] = useState(false);
  const [deleteCategoryModel, setDeleteCategoryModel] = useState(false);

  const handleClose = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setparentCategoryId("");
    // const cat = {
    //     categoryName,
    //     parentCategoryId,
    //     categoryImage
    // };
    // console.log(cat);

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleCategoryImage = (e) => {
    setcategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModel(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModel(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    // const idsArray = checkedIdsArray;
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModel(false);
        }
      });
    }
    setDeleteCategoryModel(false);
  };

  const deleteHandleClose = () => {
    setDeleteCategoryModel(false);
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form));
    setUpdateCategoryModel(false);
  };

  const categoryList = createCategoryList(category.categories);
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12} style={{ margin: "20px 0" }}>
            <div style={{ display: "flex ", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <Button
                  variant="primary"
                  style={{margin:"0 10px", padding: "5px 35px" }}
                  onClick={handleShow}
                >
                 <IoAdd /> <span>Add</span>
                </Button>
                <Button variant="primary" onClick={deleteCategory} style={{margin:"0 10px", padding: "5px 35px" }}>
                 <IoTrash/> <span>Delete</span>
                </Button>
                <Button variant="primary" onClick={updateCategory} style={{margin:"0 10px", padding: "5px 35px" }}>
                 <IoCloudUpload/> <span>Edit</span>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoCheckmarkCircleSharp />,
                uncheck: <IoCheckmarkCircleOutline />,
                halfCheck: <IoCheckmarkCircleOutline />,
                expandClose: <IoChevronForwardSharp />,
                expandOpen: <IoChevronDownSharp />,
              }}
            />
          </Col>
        </Row>
      </Container>

      <AddCategoryModel
        modelTitle={"Add New Category"}
        show={show}
        handleClose={handleClose}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setparentCategoryId={setparentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
      />

      <UpdateCategoriesModel
        modelTitle={"Update Categories"}
        size="lg"
        show={updateCategoryModel}
        handleClose={updateCategoriesForm}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />

      <DeleteCategoryModel
        show={deleteCategoryModel}
        handleClose={deleteHandleClose}
        modelTitle={"Confirm"}
        deleteCategories={deleteCategories}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
}

export default Category;
