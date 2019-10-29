const useForm = ({ initialValues, onSubmit, validate }) => {
    //...
    const handleChange = event => {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      setValues({
        ...values,
        [name]: value
      });
    };

    const handleBlur = event => {
      const target = event.target;
      const name = target.name;
      setTouchedValues({
        ...touchedValues,
        [name]: true
      });
      const e = validate(values);
      setErrors({
        ...errors,
        ...e
      })
    };

    const handleSubmit = event => {
      event.preventDefault();
      const e = validate(values);
      setErrors({
        ...errors,
        ...e
      });
      onSubmit({ values, e });
    };
    return { ... };
  };