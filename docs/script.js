$(document).ready(function() {

    function showContainer(containerId) {
        $("#startContainer, #formContainer, #resultContainer").hide();
        $(containerId).show();
    }

    function updateButtonVisibility() {
        $("#analyzeButton, #nextButton, #backButton").hide();
        const activeTab = $(".tab-btn.active").data("tab");
        if (activeTab === "personal") {
            $("#analyzeButton").hide();
            $("#nextButton").show();
            $("#backButton").hide();
        } else if (activeTab === "financial") {
            $("#analyzeButton").hide();
            $("#nextButton").show();
            $("#backButton").show();
        } else if(activeTab === "loan") {
            $("#analyzeButton").show();
            $("#nextButton").hide();
            $("#backButton").show();
        }
    }

    function updateAnalyzeButtonVisibility() {
        const activeTab = $(".tab-btn.active").data("tab");
        if (activeTab === "loan") {
            $("#analyzeButton").show();
            $("#nextButton").hide();
        } else {
            $("#analyzeButton").hide();
            $("#nextButton").show();
        }
    }

    function handleStartButton() {
        showContainer("#formContainer");
        updateButtonVisibility();
    }

    function handleAnalyzeButton(e) {
        e.preventDefault();
        showContainer("#resultContainer");
    }

    function handleNextButton(e) {
        e.preventDefault();
        const activeTab = $(".tab-btn.active").data("tab");
        let changeTab = '';
        // Switch to the previous tab
        $(".tab-btn").removeClass("active");
        $(".tab-content").removeClass("active").hide();
        switch (activeTab) {
            case "personal":
                changeTab = "financial";
                break;
            case "financial":
                changeTab = "loan";
                break;
            default:
                changeTab = "loan";
                break;
        }
        $(`.tab-btn[data-tab=${changeTab}]`).addClass("active"); // for tab
        $(`#tab-${changeTab}`).addClass("active").show(); // for content
        updateButtonVisibility();
    }

    function handleBackButton(e) {
        e.preventDefault();
        const activeTab = $(".tab-btn.active").data("tab");
        let changeTab = '';
        // Switch to the previous tab
        $(".tab-btn").removeClass("active");
        $(".tab-content").removeClass("active").hide();
        switch (activeTab) {
            case "financial":
                changeTab = "personal";
                break;
            case "loan":
                changeTab = "financial";
                break;
            default:
                changeTab = "personal";
                break;
        }
        $(`.tab-btn[data-tab=${changeTab}]`).addClass("active"); // for tab
        $(`#tab-${changeTab}`).addClass("active").show(); // for content
        updateButtonVisibility();
    }

    function handleRedoButton(e) {
        e.preventDefault();
        // Clear all form inputs
        $("#riskForm")[0].reset();

        // Switch to Personal Details tab
        $(".tab-btn").removeClass("active");
        $(".tab-content").removeClass("active").hide();
        $(".tab-btn[data-tab='personal']").addClass("active"); //for tab
        $("#tab-personal").addClass("active").show(); // for content

        // Show form container and update button visibility
        showContainer("#formContainer");
        updateButtonVisibility();
    }

    function handleTabClick() {
        // Remove active class from all buttons and contents
        $(".tab-btn").removeClass("active");
        $(".tab-content").removeClass("active").hide();

        // Add active class to clicked button and show corresponding content
        $(this).addClass("active");
        $("#tab-" + $(this).data("tab")).addClass("active").show();

        updateAnalyzeButtonVisibility();
    }

    function initTabs() {
        $(".tab-btn").first().addClass("active");
        $(".tab-content").first().addClass("active").show();
        
    }

    // Initial state
    showContainer("#startContainer");

    // Event bindings
    $("#startButton").on("click", handleStartButton);
    $("#analyzeButton").on("click", handleAnalyzeButton);
    $("#redoButton").on("click", handleRedoButton);
    $(".tab-btn").on("click", handleTabClick);
    $("#nextButton").on("click", handleNextButton);
    $("#backButton").on("click", handleBackButton);

    // Initialize tabs and button visibility
    initTabs();
});