import moment from "moment";

export const convertDate = (date) => {
  return moment(date).format("DD-MM-YYYY, h:mm a");
};

export const formatMoney = (number) => {
  return new Intl.NumberFormat().format(number);
};
