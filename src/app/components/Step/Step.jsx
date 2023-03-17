import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as stepAction from "../../actions/stepAction";
import StepItem from "./StepItem";

const Step = (props) => {
  const { taskId } = props;
  const { steps } = useSelector((state) => state.step);
  const [titleStep, setTitleStep] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      dispatch(stepAction.getByTaskId(taskId));
    }
  }, [dispatch, taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleStep === "") {
      return;
    }
    const step = {
      title: titleStep,
      taskId: taskId,
    };

    dispatch(stepAction.create(step));
    setTitleStep("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-step"
          placeholder="Thêm bước"
          value={titleStep || ""}
          onChange={(e) => setTitleStep(e.target.value)}
        />
      </form>
      <div style={{ color: "#4f4f50" }}>
        {!!steps && steps.map((item) => <StepItem key={item.id} step={item} />)}
      </div>
    </div>
  );
};

export default Step;
