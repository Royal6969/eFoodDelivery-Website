import React, { useState, useEffect } from 'react'
import { checkAdminAuth } from '../../HOC'
import { InputHelper, toastNotifyHelper } from '../../helperMethods';
import { useCreateProductMutation, useGetProductByIdQuery, useUpdateProductByIdMutation } from '../../APIs/ProductAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { BigLoader } from '../../components/view/common';
import { StaticDetails_ProductCategory } from '../../Utils/StaticDetails';
import { useCreateLogMutation } from '../../APIs/LoggerAPI';


// define local array with product categories
const productCategories = [
  StaticDetails_ProductCategory.CATEGORY_BREAKFAST,
  StaticDetails_ProductCategory.CATEGORY_LUNCH,
  StaticDetails_ProductCategory.CATEGORY_DINNER,
  StaticDetails_ProductCategory.CATEGORY_DESSERT,
  StaticDetails_ProductCategory.CATEGORY_DRINK
]

function ProductForm() {
  // define useState() hook to set loading when this page needs
  const [isLoading, setIsLoading] = useState(false);
  // define useNavigate() hook to redirect admin user to AdminProductsList page once the new product object has been created
  const navigate = useNavigate();
  // define the mutation for POST endpoint to create a new product
  const [createProduct] = useCreateProductMutation();
  // define the mutation for PUT endpoint to update a product
  const [updateProduct] = useUpdateProductByIdMutation();
  // define mutation to create new logs
  const [createLog] = useCreateLogMutation();
  // define useParams() hook to receive the productId through the route
  const { productId } = useParams();
  // once we have the productId, we need to call the query for GetProductById(productId)
  const { data } = useGetProductByIdQuery(productId);

  // whenever the data is populated here, we want to useEffect() on that and we want to load all the state,
  // which will be the local state for all the input parameters and that is the setProductInputs we will invoke that
  useEffect(() => {
    if (data && data.result) {
      // if data is populated then we basically can create a temp data with all the values that we need, and we can assign that
      const productTempData = {
        name: data.result.name,
        description: data.result.description,
        tag: data.result.tag,
        category: data.result.category,
        price: data.result.price
      }

      setProductInputs(productTempData);
      // finally, when we're setting the data, we also need to populate the image with the URL inside image field that we get in the response
      setImageFileDisplayed(data.result.image);
    }
  
  }, [data]); // this useEffect() will be called when the data is modified
  

  // useState for the input fields to create/edit a product... copied/paste from Register.tsx
  const [productInputs, setProductInputs] = useState({
    name: '',
    description: '',
    tag: '',
    category: productCategories[0], // breakfast category selected by default
    price: ''
  });

  // useState for the category field to create/edit a product, to select one of them in a dropdown button
  // const [categoryInput, setCategoryInput] = useState();

  // if the product image uploaded is valid, we have to store that in the local storage, because we don't want to directly call the server
  const [imageFileStored, setImageFileStored] = useState<any>(); // first one is the image that we want to store in the DB
  const [imageFileDisplayed, setImageFileDisplayed] = useState<string>(''); // and next one, what is the image that we want to display?
  // what we want to do is when we upload a new image, we want to change the image to be stored

  // now we have to use our helper method called InputHelper... copied/pasted from Register.tsx
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

  // define a helper method to handle the submit button to create a new product
  const handleCreateOrUpdateProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // check if there is no image uploaded and check that productId should not be present
    if (!imageFileStored && !productId) {
      toastNotifyHelper('Por favor, tienes que subir una imagen del producto', 'error');
      setIsLoading(false);
      return null;
    }

    // then we have to construct the FormData
    const productFormData = new FormData();
    productFormData.append('Name', productInputs.name);
    productFormData.append('Description', productInputs.description);
    productFormData.append('Tag', productInputs.tag ?? ''); // if tag is null, we store an empty string
    productFormData.append('Category', productInputs.category);
    productFormData.append('Price', productInputs.price);
    // when we're updating, if the imageFileStored is empty, the we don't want to append that file
    if (imageFileDisplayed) 
      productFormData.append('Image', imageFileStored);

    // define a variable to save the response
    let productResponse;
    
    // to check in what scenario we are, we can check if the productId is present or not
    if (productId) { // update scenario
      productFormData.append('Id', productId);
      // once we have the productId appended, we need to invoke the mutation for update products
      productResponse = await updateProduct({
        data: productFormData,
        productId
      });
      // we can also check response to see if it was success or error, and notify accordingly
      toastNotifyHelper('El producto ha sido modificado correctamente', 'success');
      createLog({ log: "Se ha actualizado el producto --> Nombre: \"" + productInputs.name + "\" Precio: \"" + productInputs.price + "\"", level: "info" });
    }
    else { // create scenario
      // now once we have the form data populated, we need to invoke the mutation for create products
      productResponse = await createProduct(productFormData);
      // we can also check response to see if it was success or error, and notify accordingly
      toastNotifyHelper('El nuevo producto ha sido creado correctamente', 'success');
      createLog({ log: "Se ha creado el producto --> Nombre: \"" + productInputs.name + "\" Precio: \"" + productInputs.price + "\"", level: "info" });
    }

    // check if response is present to redirect admin user to AdminProductsList page
    if (productResponse) {
      setIsLoading(false);
      navigate('/product/AdminProductsList');
    }

    setIsLoading(false);
  }


  return (
    <div className='container mt-3 p-3 bg-light'>
      {isLoading && (
        <BigLoader />
      )}

      <h3 className='px-2 text-warning'>
        {productId
          ? 'Editar producto'
          : 'Añadir producto'
        }
      </h3>
      
      <form method='post' encType='multipart/form-data' onSubmit={handleCreateOrUpdateProduct}>
        <div className='row mt-3'>
          <div className='col-md-7'>
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
            
            <select
              className='form-control mt-3 form-control'
              placeholder='Categoría'
              name='category'
              value={productInputs.category}
              onChange={handleProductInputs}
            >
              {productCategories.map(
                (category) => (
                  <option value={category}>{category}</option>
                ))
              }
            </select>
            
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

            <div className="row">
              <div className="col-6">
                <button
                  className='btn btn-warning mt-3 form-control'
                  type='submit'
                >
                  {productId
                    ? 'Editar'
                    : 'Crear'
                  }
                </button>
              </div>

              <div className="col-6">
                <a 
                  className='btn btn-secondary mt-3 form-control' 
                  onClick={() => navigate('/product/AdminProductsList')}
                >
                  Volver a los productos
                </a>
              </div>
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