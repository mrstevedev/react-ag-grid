import * as Yup from "yup";

export const CreateItemSchema = Yup.object().shape({
    make: Yup.string().required("Make is required"),
    model: Yup.string().required("Model is required"),
    type: Yup.string().required("Type is required"),
    year: Yup.number().required("Year is required")
});
