import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const AddCategoryModel = (props) => {
  const {
    show,
    handleClose,
    modelTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setparentCategoryId,
    categoryList,
    handleCategoryImage,
  } = props;

  return (
    <Modal modelTitle={modelTitle} show={show} handleClose={handleClose}>
      <Row>
        <Col>
          <Input
            placeholder="Add Category"
            value={categoryName}
            type="text"
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>

        <Col>
          <select
            className="form-control form-control-sm"
            value={parentCategoryId}
            onChange={(e) => setparentCategoryId(e.target.value)}
          >
            <option>Select category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <Row>
        <Col>
          <Input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
            className="form-control-sm"
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCategoryModel;
