import { Application } from "express";
const axios = require("axios");

module.exports.getCustomers = async () =>{
    try{
        const res = await axios.get("http://localhost:8080/api/customers")
        
        return res.data
    } catch(e){
        return new Error("Could not get orders");
    }
}