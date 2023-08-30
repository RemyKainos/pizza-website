import { Product } from "../model/product";
const {validateProduct} = require("../validator/productValidator");

const axios = require("axios");
const { Response } = require("express");

module.exports.getProducts = async (): Promise<Product> =>{
    try{
        const res = await axios.get("http://localhost:8080/api/products")
        
        return res.data
    } catch(e){
        throw new Error("Could not get products");
    }
}

module.exports.getProductsById = async (id: number): Promise<Product> =>{
    try{
        const res = await axios.get("http://localhost:8080/api/products/" + id);

        return res.data;
    } catch(e){
        throw new Error("Could not get product");
    }
}

module.exports.createProduct = async function (product: Product): Promise<number>{
    const error: string = validateProduct(product);

    if(error){
        throw new Error(error)
    }

    try{
        const response = await axios.post('http://localhost:8080/api/products', product);

        return response.data;
    } catch(e){
        throw new Error('Could not create product')
    }
}