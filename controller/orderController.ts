import { Application, Request, Response } from "express";
import { Order } from "../model/order";

const orderService = require('../service/orderService')
const customerService = require('../service/customerService');

module.exports = (app: Application) =>{
    
    app.get('/orders', async (req: Request, res: Response) =>{
        let data = [];
        
        try{
            data = await orderService.getOrders();
        } catch(e){
            console.error(e);
        }
        
        res.render('list-orders', {orders: data})
    })

    app.get("/orders/:id", async (req, res) =>{
        let data = []

        try{
            data = await orderService.getOrdersById(req.params.id);
        } catch(e){
            console.log(e);
        }

        res.render('view-order', {order: data});
    })

    app.get("/add-order", async(req: Request, res: Response) =>{
        let customers;

        try{
            customers = await customerService.getCustomers();
        } catch(e){
            throw new Error("Could not get customers.");
        }
        
        res.render("add-order.html", {customers,});
    })

    app.post("/add-order", async(req: Request, res: Response) =>{
        let data: Order = req.body;
        let id: Number;
        let customers;

        console.log(data)

        try{
            customers = await customerService.getCustomers();
            id = await orderService.addOrder(data);

            res.redirect("/orders/" + id);
        } catch(e){
            console.log(e);

            res.locals.errormessage = e.message;

            res.render('add-order', {...req.body, customers: customers,})
        }
    })
}