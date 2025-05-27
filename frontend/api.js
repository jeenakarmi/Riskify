function submitToAPI() {
    const data = {
        Age: parseInt($("#age").val()),
        MonthlyIncome: parseFloat($("#monthlyIncome").val()),
        TotalAssets: parseFloat($("#totalAssets").val()),
        NetWorth: parseFloat($("#netWorth").val()),
        TotalLiabilities: parseFloat($("#totalLiabilities").val()),
        MonthlyDebtPayments: parseFloat($("#monthlyDebtPayments").val()),
        LoanAmount: parseFloat($("#loanAmount").val()),
        BaseInterestRate: parseFloat($("#baseInterestRate").val()/100),
        LoanDuration: parseInt($("#loanDuration").val()),
        MonthlyLoanPayment: parseFloat($("#monthlyLoanPayment").val())
    };

    $.ajax({
        url: "http://localhost:5000/predict",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            if(response.prediction === "Not Risky"){
                $("#predictionResult").text(`Prediction: ${response.prediction}`);
                $("#explanationResult").text(`Based on the provided information, this application carries low financial risk.`).css('color', 'green');
            }else if(response.prediction === "Risky"){
                $("#predictionResult").text(`Prediction: ${response.prediction}`);
                $("#explanationResult").text(`Based on the provided information, this application carries high financial risk.`).css('color', 'red');

            }
            $("#formContainer").hide();
            $("#resultContainer").show();
        },
        error: function() {
            $("#predictionResult").text("Error connecting to prediction API.");
            $("#formContainer").hide();
            $("#resultContainer").show();
        }
    });
}
