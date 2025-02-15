"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useWalletBalances() {
    return [
        { currency: "Ethereum", amount: 10 },
        { currency: "Osmosis", amount: 20 },
        { currency: "Arbitrum", amount: 30 },
        { currency: "Zilliqa", amount: 40 },
        { currency: "Neo", amount: 50 },
    ];
}
;
function usePrices() {
    return [
        { currency: "Ethereum", price: 2711 },
        { currency: "Osmosis", price: 0.33 },
        { currency: "Arbitrum", price: 0.5 },
        { currency: "Zilliqa", price: 0.00155 },
        { currency: "Neo", price: 11.5 },
    ];
}
;
var WalletPage = function (props) {
    // Remove unnecessary variable type declaration (props: Props) because React.FC<Props> already do this job.
    var children = props.children, rest = __rest(props, ["children"]);
    var balances = useWalletBalances();
    var prices = usePrices();
    console.log("balances", balances);
    console.log("prices", prices);
    var getPriority = function (currency) {
        switch (currency) {
            case 'Osmosis': return 100;
            case 'Ethereum': return 50;
            case 'Arbitrum': return 30;
            case 'Zilliqa': return 20;
            case 'Neo': return 20;
            default: return -99;
        }
    };
    var sortedBalances = (0, react_1.useMemo)(function () {
        return balances.filter(function (balance) {
            var balancePriority = getPriority(balance.currency);
            if (balancePriority > -99 && balance.amount > 0) {
                return true;
            }
            return false;
        }).sort(function (lhs, rhs) {
            var leftPriority = getPriority(lhs.currency);
            var rightPriority = getPriority(rhs.currency);
            // complicated and not handle when leftPriority = rightPriority
            return rightPriority - leftPriority; // return positive value when right > left
        });
    }, [balances, prices]);
    // Ensure there is an array of FormattedWalletBalance
    // each iteration of .map() must return an object that matches the FormattedWalletBalance structure.
    var formattedBalances = sortedBalances.map(function (balance) {
        return __assign(__assign({}, balance), { formatted: balance.amount.toFixed() });
    });
    // rows must display formattedBalance not walletBallance
    var rows = formattedBalances.map(function (balance, index) {
        // Prices is an array so we must find that matched currency to calculate USD value
        var priceData = prices.find(function (price) { return price.currency === balance.currency; });
        var usdValue = priceData ? priceData.price * balance.amount : 0;
        return className = { classes: classes, : .row };
        key = { index: index };
        amount = { balance: balance, : .amount };
        usdValue = { usdValue: usdValue };
        formattedAmount = { balance: balance, : .formatted }
            /  >
        ;
    });
};
return (__assign({}, rest) >
    { rows: rows }
    < /div>);
