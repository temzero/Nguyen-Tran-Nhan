import React, { Children, useMemo } from 'react';
import { FC } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
}

interface CurrencyData {
  currency: string;
  price: number;
}

// Creating wallet balance data
function useWalletBalances(): WalletBalance[] {
  return [
   { currency: "Ethereum", amount: 10 },
   { currency: "Osmosis", amount: 20 },
   { currency: "Arbitrum", amount: 30 },
   { currency: "Zilliqa", amount: 40 },
   { currency: "Neo", amount: 50 },
 ];
};

// Creating data of prices
function usePrices(): CurrencyData[] {
  return [
   { currency: "Ethereum", price: 2711 },
   { currency: "Osmosis", price: 0.33 },
   { currency: "Arbitrum", price: 0.5 },
   { currency: "Zilliqa", price: 0.00155 },
   { currency: "Neo", price: 11.5 },
 ];
};

// Create a react component
// WalletRow doesn't take children as variable then no need for React.FC
// React automatically recognize key, so I don't need to pass it in here
interface WalletRowProps {
  currency: string;
  amount: number;
  usdValue: number;
}

// ensure this return react element type
const WalletRow = ({ currency, amount, usdValue }: WalletRowProps): React.ReactElement => {
  return (
    <div className='wallet-row'>  // ClassName must be a string, additionally, there is no classes object to access classes.row
      <span>Currency: {currency}</span>
      <span>Amount: {amount ? amount.toFixed(2) : '0'}</span> {/* Formatted amount here */}
      <span>Value: ${usdValue ? usdValue.toFixed(2): '0'}</span>
    </div>
  );
};

type WalletPageProps = {
  children?: React.ReactNode;
  [key: string]: any; // allow ...rest
};

const WalletPage = (props: WalletPageProps) => {
  // Remove unnecessary variable type declaration (props: Props) because React.FC<Props> already do this job.
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (currency: string): number => {
    switch (currency) {
      case 'Osmosis': return 100
      case 'Ethereum': return 50
      case 'Arbitrum': return 30
      case 'Zilliqa': return 20
      case 'Neo': return 20
      default: return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.currency);
        if (balancePriority > -99 && balance.amount > 0) {
          return true;
        }
        return false
      }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.currency);
        const rightPriority = getPriority(rhs.currency);
        // complicated and not handle when leftPriority = rightPriority
        return rightPriority - leftPriority // return positive value when right > left
    });
  }, [balances, prices]);

  // This part is unnecessary because we already have amount to pass through, I'll format it in the component
  // const formattedBalances: FormattedWalletBalance[] = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed()
  //   }
  // })

  const rows = sortedBalances.map((walletBalance: WalletBalance, index: number) => {
    // Prices is an array so we must find that matched currency to calculate USD value
    let priceData = prices.find((price) => price.currency === walletBalance.currency)
    let usdValue = priceData ? priceData.price * walletBalance.amount : 0; 

    return (
      <WalletRow
        key={index}
        currency={walletBalance.currency} // pass currency name
        amount={walletBalance.amount}
        usdValue={usdValue}
      />
    )
  })

  return (
    <div {...rest}>
      {children} // pass any children that are in react node type to this component
      {rows}
    </div>
  )
}