import React, { useState } from 'react'
import { checkAdminAuth } from '../../HOC'
import { InputHelper, toastNotifyHelper } from '../../helperMethods';


function ProductForm() {
  // useState for the input fields to create/edit a product... copied/paste from Register.tsx
  const [productInputs, setProductInputs] = useState({
    name: '',
    description: '',
    tag: '',
    category: '',
    price: ''
  });

  // if the product image uploaded is valid, we have to store that in the local storage, because we don't want to directly call the server
  const [imageFileStored, setImageFileStored] = useState<any>(); // first one is the image that we want to store in the DB
  const [imageFileDisplayed, setImageFileDisplayed] = useState<string>(''); // and next one, what is the image that we want to display?
  // what we want to do is when we upload a new image, we want to change the image to be stored

  // now we have to use our helper method called InputHandler... copied/pasted from Register.tsx
  const handleProductInputs = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const tempData = InputHelper(event, productInputs);
    setProductInputs(tempData);
  }

  // we need a helper method to handle the image uploaded
  const handleProductImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // we want to get the first image file, so we will add a condition and that will retrieve the first image file that we've uploaded in our contant
    const imageFile = event.target.files && event.target.files[0];

    if (imageFile) {
      // console.log(imageFile);
      // with this console.log(imageFile) when we upload an image, we realize its type is "image/png"
      // so we can split this type here and get the value at first index to get the file extension
      const imageType = imageFile.type.split('/')[1];
      // then we can add an array of what are the valid image types that we want
      const validImageTypes = ['jpeg', 'jpg', 'png'];
      // after that, we can add a filter on the valid imageType and if the value that we have for each one of the type
      // if that matches the imageType that we're looking for, then we will store that in a constant called isImageFileTypeValid
      const isImageFileTypeValid = validImageTypes.filter((event) => {
        return event === imageType;
      });
      // also we can valid the image file size, if we check again the log, we realize it has a size, which is a multiplication
      // we can make a little condition to avoid admins to upload image files with bigger sizes
      if (imageFile.size > 1000 * 1024) {
        setImageFileStored('');
        toastNotifyHelper('La imagen debe pesar menos de 1MB', 'error');
        
        return null;
      }
      // we can also check if type is valid or not
      else if (isImageFileTypeValid.length === 0) {
        setImageFileStored('');
        toastNotifyHelper('La imagen debe estar en formato jpeg, jpg o png', 'error');
        
        return null;
      }

      // now what we have to do is validations are working, so if everything is valid, we need to upload that image and store that locally for now
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile); // what that expects is the blob inside there that we have in the constant file
      setImageFileStored(imageFile);
      // so basically when we load, we want to set the image taht needs to be displayed as well when fileReader on load is triggered
      fileReader.onload = (event) => {
        // when the fileReader has the new file here, we can extract that image
        const fileImageURL = event.target?.result as string;
        // what we want to do is we want to set the image URL inside the set image to be displayed
        setImageFileDisplayed(fileImageURL);
      }
    }
  }


  return (
    <div className='container p-3'>
      <h3 className='offset-2 px-2 text-warning'>Añadir producto</h3>
      
      <form method='post' encType='multipart/form-data'>
        <div className='row mt-3'>
          <div className='col-md-5 offset-2'>
            <input
              type='text'
              className='form-control'
              placeholder='Nombre'
              required
              name='name'
              value={productInputs.name}
              onChange={handleProductInputs}
            />
            
            <textarea
            style={{ resize: 'none' }}
              className='form-control mt-3'
              placeholder='Descripción'
              rows={5}
              name='description'
              value={productInputs.description}
              onChange={handleProductInputs}
            ></textarea>
            
            <input
              type='text'
              className='form-control mt-3'
              placeholder='Etiqueta'
              name='tag'
              value={productInputs.tag}
              onChange={handleProductInputs}
            />
            
            <input
              type='text'
              className='form-control mt-3'
              placeholder='Categoría'
              name='category'
              value={productInputs.category}
              onChange={handleProductInputs}
            />
            
            <input
              type='number'
              className='form-control mt-3'
              required
              placeholder='Precio'
              name='price'
              value={productInputs.price}
              onChange={handleProductInputs}
            />
            
            <input 
              type='file' 
              className='form-control mt-3'
              onChange={handleProductImage}
            />
            
            <div className='text-center'>
              <button
                style={{ width: '50%' }}
                className='btn btn-warning mt-5'
                type='submit'
              >
                Guardar
              </button>
            </div>
          </div>
          
          <div className='col-md-5 text-center'>
            <img
              style={{ width: '100%', borderRadius: '30px' }}
              src={imageFileDisplayed}
              alt=''
            />
          </div>
        </div>
      </form>
    </div>
  )
}


export default checkAdminAuth(ProductForm)