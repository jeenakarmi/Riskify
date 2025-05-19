$(document).ready(function() {

    function showContainer(containerId) {
        $("#startContainer, #formContainer, #resultContainer").hide();
        $(containerId).show();
    }

    function updateAnalyzeButtonVisibility() {
        const activeTab = $(".tab-btn.active").data("tab");
        if (activeTab === "loan") {
            $("#analyzeButton").show();
        } else {
            $("#analyzeButton").hide();
        }
    }

    function handleStartButton() {
        showContainer("#formContainer");
        updateAnalyzeButtonVisibility();
    }

    function handleAnalyzeButton(e) {
        e.preventDefault();
        showContainer("#resultContainer");
    }

    function handleRedoButton(e) {
        e.preventDefault();
        // Clear all form inputs
        $("#riskForm")[0].reset();

        // Switch to Personal Details tab
        $(".tab-btn").removeClass("active");
        $(".tab-content").removeClass("active").hide();
        $(".tab-btn[data-tab='personal']").addClass("active");
        $("#tab-personal").addClass("active").show();

        // Show form container and update button visibility
        showContainer("#formContainer");
        updateAnalyzeButtonVisibility();
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
        updateAnalyzeButtonVisibility();
    }

    // Initial state
    showContainer("#startContainer");

    // Event bindings
    $("#startButton").on("click", handleStartButton);
    $("#analyzeButton").on("click", handleAnalyzeButton);
    $("#redoButton").on("click", handleRedoButton);
    $(".tab-btn").on("click", handleTabClick);

    // Initialize tabs and button visibility
    initTabs();
});