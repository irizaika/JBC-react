import * as Yup from "yup";

const buildValidationSchema = (fields) => {
  const shape = {};

  fields.forEach((field) => {
    let schema;

    // 1. Type-based validation
    switch (field.type) {
      case "number":
        schema = Yup.number()
          .typeError(`${field.label} must be a number`);
        break;

      case "decimal":
        schema = Yup.number()
          .typeError(`${field.label} must be a valid decimal number`);
        break;

      case "select":
        schema = Yup.number()
          .nullable()
          .typeError(`${field.label} must be selected`);
        break;

      case "date":
        schema = Yup.date()
          .typeError(`${field.label} must be a valid date`);
        break;

      case "checkbox":
        schema  = Yup.boolean()
          .typeError(`${field.label} must be true/false`);
        break;
        
    case "multiselect":
        // For multiselect, we expect an array of selected values
        schema = Yup.array();
        break;

      default:
        schema = Yup.string();
    }

    // 2. Add required or optional/null
    if (field.required) {
      schema = schema.required(`${field.label} is required`);
    } else {
      schema = schema.nullable(true); // allow null/empty
    }

    // 3. Assign to schema object
    shape[field.name] = schema;
  });

  return Yup.object().shape(shape);
};
export default buildValidationSchema;