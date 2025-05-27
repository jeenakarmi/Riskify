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
            if (validateInput.call(this)) {
                hasError = true;
            }
        });

        if (!hasError) {
            submitToAPI();  // Only submit if there's no error
        } else {
            alert("Please Make Sure All Input Are Valid!");
        }
    }
    
    function getMinMax(id){
        let minimum, maximum;
        switch (id){
            case 'age':
                minimum = 18;
                maximum = 70;
                break
            case 'baseInterestRate':
                minimum = 0;
                maximum = 100;
                break
            case 'loanDuration':
                minimum = 6;
                maximum = 360;
                break
            case "loanAmount":
            case "monthlyIncome":
                minimum = 1000;
                maximum = 1000000000;
                break
            default:
                minimum = 0;
                maximum = 1000000000;
                break;
        }
        return {minimum, maximum};
    }
    function validateInput(){
        const $input = $(this);
        const value = $input.val();
        const id = $input.attr("id");
        const $errorMsg = $input.next(".error-msg");
        const {minimum, maximum} = getMinMax(id);

        if (isNaN(value) || value < minimum || value > maximum || value === "") {
            $errorMsg.text(`Please enter a valid value. (${minimum}-${maximum})`);
            return true;  // has error
        } else {
            $errorMsg.text("");
            return false;   // has no error
        }
    }

$(document).ready(() => {
    $("#riskForm input").each(function() {
        const $input = $(this);
        const id = $input.attr("id");
        const {minimum, maximum} = getMinMax(id);
        const currentPlaceholder = $input.attr('placeholder') || '';
        $input.attr('placeholder',(`Eg.: (${minimum} - ${maximum}) ${currentPlaceholder}`));
    })
    $("#riskForm input").on("change", validateInput);

    // Trigger calculation when relevant fields change
    $("#loanAmount, #baseInterestRate, #monthlyLoanPayment").on("input", calculateLoanDuration);

    // Trigger calculation when relevant fields change
    $("#loanAmount, #baseInterestRate, #loanDuration").on("input", calculateLoanPayment);
});