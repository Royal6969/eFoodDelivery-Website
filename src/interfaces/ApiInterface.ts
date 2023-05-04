export default interface ApiResponse {
  data?: {
    statusCode?: number;
    success?: boolean;
    errorsList?: Array<string>;
    // we don't know what the result could be, basically in that result that will be a key and a value
    // we can be dynamic about it and we can just say that will be a key which will be type string and the response also will be in a tring
    // but we don't know because when we convert everything to JSON, it will be a string by itself
    result: {
      [key: string]: string
      // note that it will not give any suggestion for typing with what will be inside the result
      // so you will be responsible to find what exactly will be inside result when you call the API
      // but on the other hand, when you define that this a number, it's a boolean or aaray of string
      // typescript will be able to bind these suggestion and show you if youencounter any errors while you are writing the code
    }
  }

  error?: any;
}