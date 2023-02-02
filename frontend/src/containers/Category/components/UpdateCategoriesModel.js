import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const UpdateCategoriesModel = (props) => {
  const {
    size,
    handleClose,
    modelTitle,
    show,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
  } = props;
  return (
    <Modal
      modelTitle={modelTitle}
      size={size}
      show={show}
      handleClose={handleClose}
    >
      <Row>
        <Col>Expanded</Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                placeholder="Add Category"
                value={item.name}
                type="text"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
              >
                <option>Select category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select className="form-control"
              value={item.type}
              onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
              >
                <option value=""> Select Type </option>
                <option value="store"> Store </option>
                <option value="product"> Product </option>
                <option value="page"> Page </option>
              </select>
            </Col>
          </Row>
        ))}

      <Row>
        <Col>Checked Categories</Col>
      </Row>

      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                placeholder="Category Name"
                value={item.name}
                type="text"
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.parentId}
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              >
                <option>Select category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select className="form-control"
              value={item.type}
              onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
              >
                <option value=""> Select Type </option>
                <option value="store"> Store </option>
                <option value="product"> Product </option>
                <option value="page"> Page </option>
              </select>
            </Col>
          </Row>
        ))}
    </Modal>
  );
};

export default UpdateCategoriesModel;
