import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const DeleteCategoryModel = (props) => {
    const {
      modelTitle,
        show,
        handleClose,
        expandedArray,
        checkedArray,
        deleteCategories
    } = props;
    return (
      <Modal
        modelTitle={modelTitle}
        show={show}
        handleClose={handleClose}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };

  export default DeleteCategoryModel;