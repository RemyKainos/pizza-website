import { Order } from "../model/order";

const axios = require("axios");
const { response } = require("express");

module.exports.getOrders = async () =>{
    try{
        const res = await axios.get("http://localhost:8080/api/orders")
        
        return res.data
    } catch(e){
        return new Error("Could not get orders");
    }
}

module.exports.getOrdersById = async (id: number) =>{
    try{
        const res = await axios.get("http://localhost:8080/api/orders/" + id);

        return res.data;
    } catch(e){
        return new Error("Could not get order");
    }
}

module.exports.addOrder = async (order: Order) =>{
    try{
        const res = await axios.post("http://localhost:8080/api/orders/", order);

        return res.data;
    } catch(e){
        throw new Error("Could not add order");
    }
}