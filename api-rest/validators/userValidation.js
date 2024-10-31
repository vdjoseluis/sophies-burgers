const { body } = require("express-validator");

const userValidation = [
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Correo electrónico inválido")
    .normalizeEmail()
    .custom((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        throw new Error("Correo inválido");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("firstname")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .trim()
    .escape(),
  body("lastname")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .trim()
    .escape(),
  body("address")
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .trim()
    .escape(),
  body("phone")
    .notEmpty()
    .isMobilePhone("es-ES")
    .withMessage("El número de contacto debe ser válido para España")
    .trim()
    .escape(),
  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("El rol debe ser admin o user"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Correo inválido").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

const searchValidation = [
  body("id").optional().isInt().withMessage("Id debe ser un entero"),
  body("phone")
    .optional()
    .isMobilePhone("es-ES")
    .withMessage("El número debe ser un teléfono válido")
    .trim()
    .escape(),
];

const createValidationExcluding = (fieldsToExclude) =>
  userValidation.filter(
    (rule) => !fieldsToExclude.includes(rule.builder.fields[0])
  );

const contactValidation = createValidationExcluding([
  "password",
  "firstname",
  "lastname",
  "address",
  "phone",
]);

contactValidation.push(
  body("name")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/)
    .withMessage("El nombre debe tener al menos un nombre y un apellido"),
  body("phone")
    .optional()  
);

const applyJobValidation = createValidationExcluding(["password"]);

module.exports = {
  userValidation,
  loginValidation,
  searchValidation,
  contactValidation,
  applyJobValidation,
};
