import React from 'react'


// in the parameters here, we will be receiving the event, that it's teh same event whenever we're updating anything
// if you remember in the onChange(), we used to pass that event
// also when a form submit, we pass that event and we say preventDefault() to avoid submitting that form
// so here, first we can get that event, and next we can get a data
const InputHelper = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, data: any) => { // so that way our change event will be functional for the input elements
  // first we want to spread out the data that we receive here
  const tempData: any = { ...data }; // destructuring technique
  
  // once we spread that data out, then based on the name that is given to the input element, we will assign the target value
  tempData[event.target.name] = event.target.value;

  // once we do that, we will return back the tempData
  return tempData;
};
// basically if we use the InputHelper on those input fields, if the field has a name of email, 
// it will automatically assign that value to an email field inside the initialDeliveryData


export default InputHelper