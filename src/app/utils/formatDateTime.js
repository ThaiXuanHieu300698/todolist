function reduceDateTime(date) {
  let dateTime = new Date(date);
  let month = dateTime.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = dateTime.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let year = dateTime.getFullYear();

  return {
    day: day,
    month: month,
    year: year,
  };
}

export const GetDate = (date) => {
  const dateTime = reduceDateTime(date);
  return dateTime.month + "/" + dateTime.day + "/" + dateTime.year;
};

export const FormatDateTime = (date) => {
  const dateTime = reduceDateTime(date);
  return dateTime.day + "/" + dateTime.month + "/" + dateTime.year;
};

export const FormatDateInput = (date) => {
  const dateTime = reduceDateTime(date);
  return dateTime.year + "-" + dateTime.month + "-" + dateTime.day;
};

export const FormatHour = (date) => {
  return date.toString().split("T")[1].slice(0, 2);
};

export const FormatMinutes = (date) => {
  return date.toString().split("T")[1].slice(3, 5);
};

export const NewDateTime = (oldDateTime, hour, minute) => {
  let dateTime = reduceDateTime(oldDateTime);
  let newDateTime =
    dateTime.year +
    "-" +
    dateTime.month +
    "-" +
    dateTime.day +
    "T" +
    hour +
    ":" +
    minute +
    ":00.000Z";

  return newDateTime;
};
