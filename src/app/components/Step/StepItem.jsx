import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as stepAction from "../../actions/stepAction";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StepItem = (props) => {
  const [stepTitle, setStepTitle] = useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setStepTitle(props.step.title);
  }, [props.step.title]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (stepTitle === "") {
      return;
    }
    const stepUpdate = {
      id: props.step.id,
      title: stepTitle,
      taskId: props.step.taskId,
      isComplete: props.step.isComplete,
    };
    dispatch(stepAction.update(stepUpdate));
  };

  const handleChangeStatusStep = (step) => {
    step.isComplete = !step.isComplete;
    dispatch(stepAction.update(step));
  };

  const handleDelete = (id) => {
    dispatch(stepAction.remove(id));
    setOpen(false);
  };

  return (
    <div className="step-item">
      <input
        type="checkbox"
        className="mr-3"
        title="Đánh dấu là đã hoàn thành"
        checked={props.step.isComplete}
        onChange={() => handleChangeStatusStep(props.step)}
      />
      <form onSubmit={handleUpdate}>
        {props.step.isComplete ? (
          <input
            type="text"
            className="step-title"
            value={stepTitle || ""}
            onChange={(e) => setStepTitle(e.target.value)}
            style={{ textDecorationLine: "line-through" }}
          />
        ) : (
          <input
            type="text"
            className="step-title"
            value={stepTitle || ""}
            onChange={(e) => setStepTitle(e.target.value)}
          />
        )}
      </form>
      <button className="btn-deleteStep" onClick={handleClickOpen}>
        <FontAwesomeIcon icon="times" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          "{props.step.title}" sẽ bị xóa vĩnh viễn.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn sẽ không thể hoàn tác hành động này.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="btn btn-default">
            Hủy bỏ
          </button>
          <button
            onClick={() => handleDelete(props.step.id)}
            className="btn btn-danger"
          >
            Xóa bước
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StepItem;
