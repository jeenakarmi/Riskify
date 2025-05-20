    // form validation
    function checkAge(){//18-70
        const age = parseInt($("#age").val());
        const $errorMsg = $("#age").next(".error-msg");
        if (isNaN(age) || age < 18 || age > 70) {
            $errorMsg.text("Please enter a valid age between 18 and 70.");
            return true;
        } else {
            $errorMsg.text(""); // Clear error if valid
            return false;
        }
    }

    function checkRates() { // 0-100
        const rate = parseFloat($("#baseInterestRate").val());
        const $errorMsg = $("#baseInterestRate").next(".error-msg");
        if(isNaN(rate) || rate < 0 || rate > 100){
            $errorMsg.text("Please enter a valid rate between 0 and 100.");
            return true;
        }else{
            $errorMsg.text(""); // Clear error if valid
            return false;
        }
    }

    function checkLoanDuration() { // 6-360
        const months = parseInt($("#loanDuration").val());
        const $errorMsg = $("#loanDuration").next(".error-msg");
        if(isNaN(months) || months < 6 || months > 360){
            $errorMsg.text("Please enter a valid number of months between 0 and 360.");
            return true;
        }else{
            $errorMsg.text(""); // Clear error if valid
            return false;
        }
    }

    function calculateLoanPayment() {
        let amount = parseFloat($("#loanAmount").val());
        let annualRate = parseFloat($("#baseInterestRate").val());
        let loanDuration = parseInt($("#loanDuration").val());

        if (
            isNaN(amount) || isNaN(annualRate) || isNaN(loanDuration) ||
            amount <= 0 || annualRate < 0 || loanDuration <= 0
        ) {
            $("#monthlyLoanPayment").val(""); // Clear if invalid
            return;
        }

        let monthlyRate = annualRate / 12 / 100;
        let n = loanDuration;

        let emi;
        if (monthlyRate === 0) {
            emi = amount / n;
        } else {
            emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        }
        console.log(emi);
        // Set the value rounded to 2 decimal places
        $("#monthlyLoanPayment").val(emi.toFixed(2));
    }

    function calculateLoanDuration() {
        let amount = parseFloat($("#loanAmount").val());
        let annualRate = parseFloat($("#baseInterestRate").val());
        let monthlyPayment = parseFloat($("#monthlyLoanPayment").val());

        if (
            isNaN(amount) || isNaN(annualRate) || isNaN(monthlyPayment) || amount <= 0 || annualRate < 0 || monthlyPayment <= 0
        ) {
            $("#loanDuration").val(""); // Clear if invalid
            return;
        }

        let monthlyRate = annualRate / 12 / 100;

        let n;
        if (monthlyRate === 0) {
            n = amount / monthlyPayment;
        } else {
            let numerator = Math.log(monthlyPayment / (monthlyPayment - amount * monthlyRate));
            let denominator = Math.log(1 + monthlyRate);
            if (denominator === 0) {
                $("#loanDuration").val("");
                return;
            }
            n = numerator / denominator;
        }
        console.log(n);
        // Set the value rounded to nearest integer
        $("#loanDuration").val(Math.ceil(n));
    }

    function checkFormValue() {
        let hasError = false;

        $("#riskForm input").each(function() {
            const min = 1;
            const max = 100000000000;
            const value = $(this).val();
            const $errorMsg = $(this).next(".error-msg");
            if (isNaN(value) || value < min || value >max || value === "") {
                $errorMsg.text("Please enter a valid value.");
                hasError = true;  // Mark error if input is invalid
            } else {
                $errorMsg.text("");
            }
        });

        // Collect custom validator errors
        if (checkAge()) hasError = true;
        if (checkRates()) hasError = true;
        if (checkLoanDuration()) hasError = true;

        if (!hasError) {
            submitToAPI();  // Only submit if there's no error
        }
    }

    function checkNumberRange(inputElement){
        const $input = $(inputElement);
        const value = $input.val();
        const $errorMsg = $input.next(".error-msg");
        if(value === '' || isNaN(value) || value<=10 || value >= 100000000000){
            $errorMsg.text("Please enter a valid value.");
        }else {
            $errorMsg.text("");
        }
    }

$(document).ready(() => {
    $("#age").on("blur", checkAge);
    $("#baseInterestRate").on('blur',checkRates);
    $("#loanDuration").on('blur',checkLoanDuration);

    // Trigger calculation when relevant fields change
    $("#loanAmount, #baseInterestRate, #monthlyLoanPayment").on("input", calculateLoanDuration);

    // Trigger calculation when relevant fields change
    $("#loanAmount, #baseInterestRate, #loanDuration").on("input", calculateLoanPayment);
});