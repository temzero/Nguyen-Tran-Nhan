import { Request, Response } from "express";
import {getStocks, getStockByCode, getStockById, createStock, deleteStockById, updateStockByCode, deleteStockByCode, updateStockById, deleteAllStocks} from "./stockSchema";

const stockControllers = {
    getStocks: async (req: Request, res: Response) => {     
        try {
            const stocks = await getStocks();
            res.status(200).send(stocks);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    getStockByCode: async (req: Request, res: Response) => {
        try {
            const stock = await getStockByCode(req.params.code);
            res.status(200).send(stock);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    
    getStockById: async (req: Request, res: Response) => {    
        try {
            const stock = await getStockById(req.params.id);
            res.status(200).send(stock);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    createStock: async (req: Request, res: Response) => {      
        try {
            const stock = await createStock(req.body);
            res.status(201).send(stock);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    updateStockById: async (req: Request, res: Response) => {      
        try {
            const stock = await updateStockById(req.params.id, req.body);
            res.status(200).send(stock);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    updateStockByCode: async (req: Request, res: Response) => { 
        try {
            const stock = await updateStockByCode(req.params.code, req.body);
            res.status(200).send(stock);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    deleteStockById: async (req: Request, res: Response) => {          
        try {
            const stock = await deleteStockById(req.params.id);
            console.log('Deleted stock:', stock);
            res.status(200).send(stock);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    deleteStockByCode: async (req: Request, res: Response) => {
        try {
            const stocks = await deleteStockByCode(req.params.code);
            console.log('Deleted stocks:', stocks);
            res.status(200).send(stocks);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    deleteAllStocks: async (req: Request, res: Response) => {
        try {
            const result = await deleteAllStocks();
            res.status(200).send({ message: `stocks deleted: ${result} ` }); // Send number of deleted stocks
        } catch (error) {
            res.status(500).send(error);
        }
    },

    createApple: async (req: Request, res: Response) => {
        try {
            const stock = await createStock({
                name: "Apple",
                code: "aapl",
                type: "stock",
                price: 150,
                description: "Top tech company"
            });
            console.log(stock);
            res.status(200).send(stock);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default stockControllers;
