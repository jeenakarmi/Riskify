from flask import Flask, request, jsonify
import joblib  # or import your model loading library
from flask_cors import CORS

app = Flask(__name__)

# Load your trained model (adjust path and loading as needed)
model = joblib.load('credit_risk_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        # Calculate TotalDebtToIncomeRatio
        monthly_income = float(data.get('MonthlyIncome'))
        monthly_loan_payment = float(data.get('MonthlyLoanPayment'))
        monthly_debt_payments = float(data.get('MonthlyDebtPayments'))

        total_debt_to_income_ratio = (monthly_debt_payments + monthly_loan_payment) / monthly_income

        features = [
            float(data.get('Age')),
            monthly_income,
            float(data.get('TotalAssets')),
            float(data.get('NetWorth')),
            float(data.get('TotalLiabilities')),
            monthly_debt_payments,
            float(data.get('LoanAmount')),
            float(data.get('BaseInterestRate')),
            float(data.get('LoanDuration')),
            monthly_loan_payment,
            total_debt_to_income_ratio
        ]

        # Make prediction (reshape as needed for your model)
        prediction = model.predict([features])
        return jsonify({'prediction': str(prediction[0])})
    except Exception as e:
            return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)