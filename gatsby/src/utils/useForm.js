import { useState } from 'react';

// CUSTOM HOOK
export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    //   Check if number and convert
    let { value } = e.target;

    // Number values come in as strings, so convert back to number
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }

    setValues({
      //   Copy the existing values into state
      ...values,
      // update the new value that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
