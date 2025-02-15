import mongoose from "mongoose";

const typeOfStocks = ["stock", "crypto", "commodity", "forex"] as const;

// Create types option for interface
type StockType = typeof typeOfStocks[number];

interface Stock {
    name: string;
    code: string;
    type: StockType;
    price: number;
    description?: string;
}

// Define Mongoose Schema
const StockSchema = new mongoose.Schema<Stock>({
    name: { type: String, required: true , unique: true },
    code: { 
        type: String, 
        required: true, 
        unique: true,
        set: (value: string) => value.toUpperCase() // Ensures uppercase before saving
    },
    type: { type: String, enum: typeOfStocks, required: true },
    price: { type: Number, required: true },
    description: { type: String }
});

// Create model
const StockModel = mongoose.model<Stock>('Stock', StockSchema, 'stocks');

// CRUD Functions
export const getStocks = () => StockModel.find();
export const getStockByCode = (code: string) => StockModel.find({ code: code.toUpperCase() });
export const getStockById = (id: string) => StockModel.findById(id);

export const createStock = (stock: Stock) => StockModel.create(stock);

export const deleteStockById = (id: string) => StockModel.findByIdAndDelete(id);
export const deleteStockByCode = (code: string) => StockModel.deleteMany({ code: code.toUpperCase() });
export const deleteAllStocks = () => StockModel.deleteMany({});

export const updateStockById = (id: string, stock: Stock) => StockModel.findByIdAndUpdate(id, stock, { new: true });
export const updateStockByCode = (code: string, stock: Stock) => StockModel.updateMany({ code: code.toUpperCase() }, stock );



export default StockModel;