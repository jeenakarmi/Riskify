function submitToAPI() {
    // Gather form data
    const data = {
        Age: $("#age").val(),
        MonthlyIncome: $("#monthlyIncome").val(),
        TotalAssets: $("#totalAssets").val(),
        NetWorth: $("#netWorth").val(),
        TotalLiabilities: $("#totalLiabilities").val(),
        MonthlyDebtPayments: $("#monthlyDebtPayments").val(),
        LoanAmount: $("#loanAmount").val(),
        BaseInterestRate: $("#baseInterestRate").val(),
        LoanDuration: $("#loanDuration").val(),
        MonthlyLoanPayment: $("#monthlyLoanPayment").val()
    };

    $.ajax({
        url: "http://localhost:5000/predict", // Adjust if deploying
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            // Handle the prediction result
            $("#predictionResult").text("Prediction: " + response.prediction);
        },
        error: function() {
            $("#predictionResult").text("Error connecting to prediction API.");
        }
    });
}