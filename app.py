from flask import Flask, request, jsonify
import joblib  # or import your model loading library

app = Flask(__name__)

# Load your trained model (adjust path and loading as needed)
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # Extract features from the received JSON
    features = [
        data.get('Age'),
        data.get('MonthlyIncome'),
        data.get('TotalAssets'),
        data.get('NetWorth'),
        data.get('TotalLiabilities'),
        data.get('MonthlyDebtPayments'),
        data.get('LoanAmount'),
        data.get('BaseInterestRate'),
        data.get('LoanDuration'),
        data.get('MonthlyLoanPayment')
    ]
    # Make prediction (reshape as needed for your model)
    prediction = model.predict([features])
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)