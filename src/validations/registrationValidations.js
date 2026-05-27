import * as Yup from "yup";

const today = new Date();
today.setHours(23, 59, 59, 999);

export const step1Schema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .matches(/[0-9]/, "Password must contain at least 1 number"),
});

export const step2Schema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s]+$/, "First name cannot contain numbers or special characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]+$/, "Last name cannot contain numbers or special characters"),
});

export const step4Schema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least 1 uppercase letter")
    .matches(/[0-9]/, "Must contain at least 1 number")
    .matches(/[^a-zA-Z0-9]/, "Must contain at least 1 special character"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  dateOfBirth: Yup.date()
    .transform((value, originalValue) => {
      if (!originalValue) return null;
      return value;
    })
    .typeError("Please select a valid date of birth")
    .required("Date of birth is required")
    .max(today, "Date of birth cannot be in the future"),
  contactNumber: Yup.string()
    .transform((value) => (value || "").replace(/\D/g, ""))
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms and conditions"),
});
