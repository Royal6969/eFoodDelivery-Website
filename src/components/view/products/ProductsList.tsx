import React, { useEffect, useState } from 'react'
import { ProductInterface } from '../../../interfaces';
import ProductCard from './ProductCard';
import { useGetProductsQuery } from '../../../APIs/ProductAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../../store/redux/ProductSlice';
import { BigLoader } from '../common';
import { RootState } from '../../../store/redux/ReduxStorage';
import { StaticDetails_ProductSortCriteria } from '../../../Utils/StaticDetails';


function ProductsList() {
  // I will create a local state here with the name of my products and the function that will set it will be setProducts
  // we can define the type here for ProductInterface
  const [products, setProducts] = useState<ProductInterface[]>([]); // let's uncomment this that we had before to make the filter search
  // this state will be storing all the products that we retrieve

  // for manage the categories, we have to add two states more
  // first one will be to load list of all the categories and second one will be to know which category is selected
  const [selectCategory, setSelectCategory] = useState('Todo');
  const [categoriesList, setCategoriesList] = useState(['']);

  // define a useState() hook for sorting and set the default one to be 'Nombre: A-Z'
  const [sortCriteria, setSortCriteria] = useState(StaticDetails_ProductSortCriteria.SORT_PRODUCTS_BY_NAME_A_TO_Z);

  // for that we will have to add the import for dispath hook and we will have to create a constant for dispatch
  const dispatch = useDispatch(); // with dispatch we can call actions in the reducers

  // after we created and configure our first Redux Query to fetch the products,
  // now we want to extract the data, and we're going to extract the "isLoading" flag from useGetProductsQuery
  const { data, isLoading } = useGetProductsQuery(null); // remember we had not parameters so we can set it as null, and this line will automatically be execute
  // what we want to do is when isLoading is false, then we want to set the product in our store where we have the product slice so we want to invoke the setProduct
  // so now we don't need the local state before (comment it for the moment) and let's remove the actual useEffect() content

  // so for filter the products, we basically need to retrieve the value from product store because in there now we have the search that will be set by banner
  const searchProduct = useSelector((state: RootState) => state.productStore.bannerSearch);

  // create a constant here for sorting which will have an array of all the sort types that we want
  const sortOptions: Array<StaticDetails_ProductSortCriteria> = [
    StaticDetails_ProductSortCriteria.SORT_PRODUCTS_BY_NAME_A_TO_Z,
    StaticDetails_ProductSortCriteria.SORT_PRODUCTS_BY_NAME_Z_TO_A,
    StaticDetails_ProductSortCriteria.SORT_PRODUCTS_BY_PRICE_LOW_TO_HIGH,
    StaticDetails_ProductSortCriteria.SORT_PRODUCTS_BY_PRICE_HIGH_TO_LOW
  ];

  useEffect(() => {
    if (!isLoading) { // that means the data is populated using the redux query, it has fetched it from our API
      // so if that is populated then, we want to dispatch an event to populate or rather call the setProduct
      dispatch(setProduct(data.result)); // when we're dispatching, we need the payload, and that payload will be reiceived in data.result
      setProducts(data.result);

      // when we're loading the data right here, we want to create an array of categories and we want to populate that inside teh setCategoriesList
      const tempCategoriesList = ['Todo'];
      // then other categories, we want to get them dynamically from our data we have those categories
      data.result.forEach(
        (product: ProductInterface) => {
          if (tempCategoriesList.indexOf(product.category) === -1) { // that means that it doesn't exists in our temp array
            tempCategoriesList.push(product.category); // and then we can push that in tempCategoriesList
          }
        }
      );
      // populate categoriesList
      setCategoriesList(tempCategoriesList);
    } 
    // now with this new useEffect() that we have, we don't want it to load every time the component is rendered
  }, [isLoading]); // we only want it to be execute when the value os isLoading is updated

  // we can add a useEffect() based on the value of serachProduct
  // so whenever that is updated, we want to set the local product
  useEffect(() => {
    if (data && data.result) {
      // define a constant to save and call the result for our filtered search
      const tempProductsArray = handleFilteredSearch(searchProduct, selectCategory, sortCriteria);
      // then we want to set the local products with the tempProductsArray
      setProducts(tempProductsArray);
    }
  }, [searchProduct]);
  
  // define a helper method to handle the filtered search
  const handleFilteredSearch = (search: string, category: string, sortCriteria: StaticDetails_ProductSortCriteria) => {
    // let tempProducts = [...data.result];
    // we need to handle the functionality so it handles both, the category and the search that we have
    let tempProducts = category === 'Todo'
      ? [...data.result]
      : data.result.filter((product: ProductInterface) => 
        product.category.toUpperCase() === category.toUpperCase()
      );
    // basically if category is 'Todo', we will select all the products, 
    // but if that isn't the case, we will filter based on the category,
    // and we will store that in a temporary array

    // now we implement the search functionality
    if (search) { // if search is populated...
      // ... then we want to search for that particular field in our products and filter that
      // we're going to filter only for product name
      const tempSearchedProducts = [...tempProducts];
      tempProducts = tempSearchedProducts.filter(
        (product: ProductInterface) => product.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    // now we implement the sort functionality
    if (sortCriteria === StaticDetails_ProductSortCriteria.SORT_PRODUCTS_BY_NAME_A_TO_Z) {
      tempProducts.sort(
        (product1: ProductInterface, product2: ProductInterface) => product1.name.toUpperCase().charCodeAt(0) - product2.name.toUpperCase().charCodeAt(0)
      )
    }
    if (sortCriteria === StaticDetails_ProductSortCriteria.SORT_PRODUCTS_BY_NAME_Z_TO_A) {
      tempProducts.sort(
        (product1: ProductInterface, product2: ProductInterface) => product2.name.toUpperCase().charCodeAt(0) - product1.name.toUpperCase().charCodeAt(0)
      )
    }
    if (sortCriteria === StaticDetails_ProductSortCriteria.SORT_PRODUCTS_BY_PRICE_LOW_TO_HIGH) {
      tempProducts.sort(
        (product1: ProductInterface, product2: ProductInterface) => product1.price - product2.price
      )
    }
    if (sortCriteria === StaticDetails_ProductSortCriteria.SORT_PRODUCTS_BY_PRICE_HIGH_TO_LOW) {
      tempProducts.sort(
        (product1: ProductInterface, product2: ProductInterface) => product2.price - product1.price
      )
    }
    
    return tempProducts;
  }

  // define a helper method to handle the category that user selects
  const handleCategorySelected = (index: number) => {
    // we want to get all the buttons based on that class 'category-buttons'
    const categoryButtons = document.querySelectorAll('.category-buttons');
    let category; // category will basically populate which category is currently selected

    categoryButtons.forEach(
      (button, indexAUX) => {
        if (indexAUX === index) { // in that case we want to add the active class
          button.classList.add('active');
          
          if (indexAUX === 0) { // in that case we have to set the category
            category = 'Todo';
          }
          else {
            category = categoriesList[indexAUX];
          }
          // once we get that, then we can populate our local state for the selected category
          setSelectCategory(category);

          // when we're updating the category, we should call the handleFilteredSearch
          const tempFilters = handleFilteredSearch(searchProduct, category, sortCriteria);
          // once we get teh result back here, we have to set the products
          setProducts(tempFilters);
        }
        else { // in else part here, we have to remove the active class from all teh other buttons
          button.classList.remove('active');
        }
      }
    )
  }

  // define a helper method to handle the sort criteria that user selects
  const handleSortCriteriaSelected = (index: number) => {
    setSortCriteria(sortOptions[index]); // that way we will know what is the sort option that user has selected
    // after that we want to invoke the handle filter with the sort type and let that one function handle everything
    //now we need to populate the handleSortCriteriaSelected
    // then we have the sortOption right here, so we can call handleFilteredSearch
    const tempProductsFilteredAndSorted = handleFilteredSearch(searchProduct, selectCategory, sortOptions[index]);
    setProducts(tempProductsFilteredAndSorted);
  }

  // note that initially, data will not have all the value because it's still loading that using the query right now, so data will be undefined
  // one way to handle this exception that we have, is we can add a condition here
  if (isLoading) {
    return (
      <BigLoader />
    )
  }

  
  return (
    <div className='container row'>
      <div className='my-3'>
        <ul className='nav w-100 d-flex justify-content-center'>
          {categoriesList.map(
            (category, index) => (
              <li className='nav-item' key={index}>
                <button 
                  className={`nav-link p-0 pb-2 category-buttons fs-5 ${index === 0 && 'active'}`}
                  onClick={() => handleCategorySelected(index)}
                  // basically index will be if we have five categories... so whatever category is selected we will pass that index
                >
                  {category}
                </button>
              </li>
            )
          )}

          <li style={{ marginLeft: 'auto' }} className='nav-item dropdown'>
            <div className='nav-link dropdown-toggle text-dark fs-6 border' data-bs-toggle='dropdown' aria-expanded='false' role='button'>
              {sortCriteria}
            </div>

            <ul className='dropdown-menu'>
              {sortOptions.map(
                (criteria, index) => (
                  <li 
                    style={{ cursor: 'pointer' }}
                    className='dropdown-item' 
                    key={index} 
                    onClick={() => handleSortCriteriaSelected(index)}
                  >
                    {criteria}
                  </li>
                )
              )}
            </ul>
          </li>
        </ul>
      </div>

      {/* we want to work if the products length is greater that 0, and in that case, we want the conditional rendering and iterate through the products */}
  
      {/* {data.result.length > 0 && data.result.map(
        // but now Typescript doesn't know what is the type here
        (product: ProductInterface, index: number) => ( // so it says you can write any here, but we know product will be of type ProductInterface and the index will be a Number
          <ProductCard product={product} key={index} />
        )
      )} */} 

      {products.length > 0 && products.map(
        // but now Typescript doesn't know what is the type here
        (product: ProductInterface, index: number) => ( // so it says you can write any here, but we know product will be of type ProductInterface and the index will be a Number
          <ProductCard product={product} key={index} />
        )
      )}
    </div>
  )
}


export default ProductsList