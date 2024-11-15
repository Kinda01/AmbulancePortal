document.addEventListener("DOMContentLoaded", function () {
    // Toggle form sections when section titles are clicked
    document.querySelectorAll(".section-title").forEach(title => {
        title.addEventListener("click", () => {
            const sectionDetails = title.nextElementSibling; // Get the corresponding section's details
            sectionDetails.classList.toggle("hidden"); // Toggle visibility
        });
    });

    // Show the combined form when the button is clicked
    const showFormBtn = document.getElementById("showFormBtn");
    if (showFormBtn) {
        showFormBtn.addEventListener("click", () => {
            document.getElementById("formSections").classList.toggle("hidden");
        });
    }

    // Search bar functionality
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", () => {
            const searchTerm = searchBar.value.toLowerCase().trim();

            // Loop through each form section and show or hide based on search term
            document.querySelectorAll(".form-section").forEach(section => {
                const title = section.querySelector(".section-title").textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    section.classList.remove("hidden"); // Show matching section
                } else {
                    section.classList.add("hidden"); // Hide non-matching section
                }
            });
        });
    }
});
