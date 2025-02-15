const express = require('express');
const router = express.Router();
import { Request, Response } from "express";
import stockControllers from './stockControllers';

router.get('/', (req: Request, res: Response) => {
    res.send(`
        <h1>Welcome to the Broker's Backend Server!</h1>
        <p><a href="/stocks">Display all stocks</a></p>
        <p><a href="/stocks/stock-name">Display a stock by name</a> (Replace "stock-name" with actual name)</p>
        <p><a href="/stocks/id">Display a stock by ID</a> (Replace "id" with actual ID)</p>
        <p><a href="/stocks/create">Create a stock</a></p>
        <p><a href="/stocks/update/id">Update stock data by ID </a> (Replace "id" with actual ID)</p>
        <p><a href="/stocks/delete/id">Delete a stock by ID</a> (Replace "id" with actual ID)</p>
    `);
});

router.get('/stock', stockControllers.getStocks);
router.get('/stock/code/:code', stockControllers.getStockByCode);
router.get('/stock/id/:id', stockControllers.getStockById);

router.post('/stock/create', stockControllers.createStock);
router.post('/stock/create/apple', stockControllers.createApple);

router.put('/stock/update/id/:id', stockControllers.updateStockById);
router.put('/stock/update/code/:code', stockControllers.updateStockByCode);

router.delete('/stock/delete/id/:id', stockControllers.deleteStockById);
router.delete('/stock/delete/code/:code', stockControllers.deleteStockByCode);
router.delete('/stock/delete/all', stockControllers.deleteAllStocks);

module.exports = router;
