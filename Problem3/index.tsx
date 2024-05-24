// interface WalletBalance {
//   currency: string
//   amount: number
// }
// interface FormattedWalletBalance {
//   currency: string
//   amount: number
//   formatted: string
// }

// interface Props extends BoxProps {}
// const WalletPage: React.FC<Props> = (props: Props) => {
//   const { children, ...rest } = props
//   const balances = useWalletBalances()
//   const prices = usePrices()

//   const getPriority = (blockchain: any): number => {
//     switch (blockchain) {
//       case 'Osmosis':
//         return 100
//       case 'Ethereum':
//         return 50
//       case 'Arbitrum':
//         return 30
//       case 'Zilliqa':
//         return 20
//       case 'Neo':
//         return 20
//       default:
//         return -99
//     }
//   }

//   const sortedBalances = useMemo(() => {
//     return balances
//       .filter((balance: WalletBalance) => {
//         const balancePriority = getPriority(balance.blockchain)
//         if (lhsPriority > -99) {
//           if (balance.amount <= 0) {
//             return true
//           }
//         }
//         return false
//       })
//       .sort((lhs: WalletBalance, rhs: WalletBalance) => {
//         const leftPriority = getPriority(lhs.blockchain)
//         const rightPriority = getPriority(rhs.blockchain)
//         if (leftPriority > rightPriority) {
//           return -1
//         } else if (rightPriority > leftPriority) {
//           return 1
//         }
//       })
//   }, [balances, prices])

//   const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
//     return {
//       ...balance,
//       formatted: balance.amount.toFixed(),
//     }
//   })

//   const rows = sortedBalances.map(
//     (balance: FormattedWalletBalance, index: number) => {
//       const usdValue = prices[balance.currency] * balance.amount
//       return (
//         <WalletRow
//           className={classes.row}
//           key={index}
//           amount={balance.amount}
//           usdValue={usdValue}
//           formattedAmount={balance.formatted}
//         />
//       )
//     }
//   )

//   return <div {...rest}>{rows}</div>
// }

// useMemo() dependency chi nen de duy nhat `balances` de ca 2 co the rerender nhieu lan
// BalancePriority > -99 && Balance.amount > 0 trong một điều kiện duy nhất để lọc số dư không cần thiết.
// The map function for formattedBalances now calculates both formattedAmount and usdValue directly, eliminating the need for a separate map for rows.

interface WalletBalance {
  currency: string
  amount: number
  blockchain: string // them thuoc tinh de toi uu hoa
}

interface FormattedWalletBalance {
  currency: string
  amount: number
  formatted: string
  usdValue: number // them thuoc tinh de toi uu hoa
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props
  const balances = useWalletBalances()
  const prices = usePrices()

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const formattedBalances = useMemo(() => {
    return balances.map((balance: WalletBalance) => {
      const priority = getPriority(balance.blockchain)
      const formattedAmount = balance.amount.toFixed()
      const usdValue = prices[balance.currency] * balance.amount
      return {
        ...balance,
        formatted: formattedAmount,
        usdValue,
      }
    })
  }, [balances, prices])

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }
  )

  return <div {...rest}>{rows}</div>
}
