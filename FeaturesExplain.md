# User Data Attributes Explanation

## Personal & Employment Information

- **`Age`**: The user's age in years (e.g., 25, 40).
- **`Experience`**: Total years of professional work experience the user has.
- **`JobTenure`**: How long (in years) the user has been with their current employer.

## Income & Account Balances

- **`MonthlyIncome`**: The user’s total income received every month (e.g., salary, bonuses).
- **`SavingsAccountBalance`**: Amount of money currently in the user's savings account.
- **`CheckingAccountBalance`**: Amount of money currently in the user's checking account.

## Loan Information

- **`LoanAmount`**: The principal amount of loan taken by the user.
- **`LoanDuration`**: The length of the loan in months (e.g., 36 months = 3 years).
- **`MonthlyLoanPayment`**: The fixed monthly amount the user pays towards the loan.
- **`BaseInterestRate`**: The base or nominal interest rate on the loan (expressed as a decimal; 0.05 means 5%).
- **`InterestRate`**: The actual effective interest rate the user is paying (can differ from base rate if fees or adjustments apply).

## Debt & Liabilities

- **`MonthlyDebtPayments`**: Total amount paid monthly for all debts (including loans, credit cards, etc.).
- **`TotalLiabilities`**: Total outstanding debts and financial obligations.
- **`DebtToIncomeRatio`**: The ratio of monthly debt payments to monthly income (e.g., 0.3 means 30% of income goes to debt).
- **`TotalDebtToIncomeRatio`**: The ratio of all liabilities (debts) compared to income, showing overall debt burden.

## Credit Information

- **`CreditCardUtilizationRate`**: Ratio of current credit card balances to total credit limits (0 to 1 scale, e.g., 0.5 means 50% utilization).
- **`NumberOfOpenCreditLines`**: Number of active credit accounts or credit cards the user currently has.

## Assets & Net Worth

- **`TotalAssets`**: The total value of all assets owned by the user (cash, property, investments, etc.).
- **`NetWorth`**: The difference between total assets and total liabilities; a measure of overall financial health.

## Payment History

- **`PaymentHistory`**: A score or rating representing how timely and reliably the user has paid past debts (higher is better).
- **`UtilityBillsPaymentHistory`**: A score indicating the reliability of the user in paying regular bills (electricity, water, phone, etc.)---
(0.0 - 1.0, where 1 = best)
