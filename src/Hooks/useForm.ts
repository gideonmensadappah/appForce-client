import { useState, useCallback, useEffect } from "react";

const useForm = <Values = {}, Errors = {}>(prop: Values, e: Errors) => {
  //Form values
  const [values, setValues] = useState<Values>({} as Values);
  //Errors
  const [errors, setErrors] = useState<Errors>(e);

  const { validate } = useValidation({ setErrors });

  // A method to handle form reset
  const resetForm = (resetVal: {}) => {
    setErrors(resetVal as any);
    setValues(resetVal as any);
  };

  //A method to handle form inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(name, val);

    setValues({
      ...values,
      [name]: val,
    });
  };

  return {
    values,
    errors,
    resetForm,
    handleChange,
  };
};

export default useForm;

enum TestCases {
  firstName = "firstName",
  lastName = "lastName",
  title = "title",
  email = "email",
  country = "country",
  city = "city",
  street = "street",
}

const MAX_NAME = 10;
const MIN_NAME = 3;

type UseValidationProp<T> = {
  setErrors: React.Dispatch<React.SetStateAction<T>>;
};

const useValidation = <T = {}>(porps: UseValidationProp<T>) => {
  const { setErrors } = porps;
  //A function to validate each input values
  const validate = useCallback((name: string, value: string) => {
    const regularTest = /[\d\/@$#!&^%<>(){}""~.+-=-_]/gi;
    const title = /[\d\/@$#!&^%<>(){}""~.+-=-_]/gi;
    const emailTest =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    switch (name) {
      case TestCases.firstName:
        if (
          new RegExp(regularTest).test(value) ||
          value.length < MIN_NAME ||
          value.length > MAX_NAME
        ) {
          setErrors((errors) => ({
            ...errors,
            [TestCases.firstName]: `firstName atleast have ${MAX_NAME} letters`,
          }));
        } else {
          setErrors((errors) => ({ ...errors, [TestCases.firstName]: "" }));
        }
        break;
      case TestCases.lastName:
        if (
          new RegExp(regularTest).test(value) ||
          value.length < MIN_NAME ||
          value.length > MAX_NAME
        ) {
          setErrors((errors) => ({
            ...errors,
            [TestCases.lastName]: `last Name atleast have ${MAX_NAME} letters`,
          }));
        } else {
          setErrors((errors) => ({ ...errors, [TestCases.lastName]: "" }));
        }
        break;
      case TestCases.title:
        if (
          new RegExp(title).test(value) ||
          !value.length ||
          value.length > MAX_NAME
        ) {
          setErrors((errors) => ({
            ...errors,
            [TestCases.title]: `last Name atleast have ${MAX_NAME} letters`,
          }));
        } else {
          setErrors((errors) => ({ ...errors, [TestCases.title]: "" }));
        }
        break;

      case TestCases.email:
        if (!new RegExp(emailTest).test(value) || !value.trim().length) {
          setErrors((errors) => ({
            ...errors,
            [TestCases.email]: "Enter a valid email address",
          }));
        } else {
          setErrors((errors) => ({ ...errors, [TestCases.email]: "" }));
        }
        break;
      case TestCases.city:
        if (new RegExp(regularTest).test(value) || !value.trim().length) {
          setErrors((errors) => ({
            ...errors,
            [TestCases.city]: "Enter a valid city address",
          }));
        } else {
          setErrors((errors) => ({ ...errors, [TestCases.city]: "" }));
        }
        break;
      case TestCases.street:
        if (new RegExp(regularTest).test(value) || !value.trim().length) {
          setErrors((errors) => ({
            ...errors,
            [TestCases.street]: "Enter a valid street address",
          }));
        } else {
          setErrors((errors) => ({ ...errors, [TestCases.street]: "" }));
        }
        break;
      case TestCases.country:
        if (new RegExp(regularTest).test(value) || !value.trim().length) {
          setErrors((errors) => ({
            ...errors,
            [TestCases.country]: "Enter a valid country address",
          }));
        } else {
          setErrors((errors) => ({ ...errors, [TestCases.country]: "" }));
        }
        break;

      default:
        break;
    }
  }, []);
  return { validate };
};
