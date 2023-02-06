/* eslint-disable import/prefer-default-export */
export const formatGender = (genderId: "M" | "F") => {
  switch (genderId) {
    case "M":
      return "Male";
    case "F":
      return "Female";
    default:
      return "";
  }
};
