//global elements declation
const addModal = document.getElementById("addModal");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const closeModalsBtn = document.querySelectorAll(".closeBtn");
const selectionModal = document.getElementById("selectionModal");
const profileModal = document.getElementById("profileModal");
const canselFormBtn = document.getElementById("canselFormBtn");
const experiencesContainer = document.getElementById("experiencesContainer");
const addExperienceBtn = document.getElementById("addExperienceBtn");
const url = document.getElementById("employeePhoto");
const preview = document.getElementById("photoPreview");


// Zone Configuration
const zoneConfig = {
    conference: { name: "Conference Room", capacity: 10, restrictions: [] },
    reception: { name: "Reception", capacity: 2, restrictions: ["Receptionist"] },
    server: { name: "Server Room", capacity: 3, restrictions: ["IT Technician"] },
    security: { name: "Security Room", capacity: 2, restrictions: ["Security Agent"] },
    staff: { name: "Staff Room", capacity: 15, restrictions: [] },
    archives: { name: "Archives Room", capacity: 3, restrictions: ["Cleaning"] }
};

// Global Data
let employees = [];
let employeeId = 1;
let experienceIdCounter = 2;
let currentZoneForSelection = null;

function openAddModal() {
    addModal.classList.remove("hidden");
}

addEmployeeBtn.addEventListener("click", openAddModal);
canselFormBtn.addEventListener("click", closeModals)

function closeModals() {
    addModal.classList.add("hidden");
    selectionModal.classList.add("hidden");
    profileModal.classList.add("hidden");
}

closeModalsBtn.forEach(e => {
    e.addEventListener("click", closeModals);
});

function addExperienceField() {
    const experienceDiv = document.createElement("div");
    experienceDiv.classList.add("experience-block");
    experienceDiv.dataset.expId = `${experienceIdCounter}`;
    experienceDiv.innerHTML = `<div class="experience-header">
                                    <span>Experience #${experienceIdCounter}</span>
                                    <button type="button" class="remove-experience-btn" data-remove-id=${experienceIdCounter}>Remove</button>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Company</label>
                                        <input type="text" class="exp-company">
                                    </div>
                                    <div class="form-group">
                                        <label>Position</label>
                                        <input type="text" class="exp-position">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label>Start Date</label>
                                        <input type="date" class="exp-start">
                                    </div>
                                    <div class="form-group">
                                        <label>End Date</label>
                                        <input type="date" class="exp-end">
                                    </div>
                                </div>`;
    experiencesContainer.appendChild(experienceDiv);

    //evenet lesstener for all remove btns
    const removeButtons = document.querySelectorAll(".remove-experience-btn");

    experienceIdCounter++;
    updateRemoveButtons();
}

function removeExperienceField(expId) {
    document.querySelector(`[data-exp-id="${expId}"]`).remove();
    experienceIdCounter--;
    updateRemoveButtons();
}

function updateRemoveButtons() {
    const removeButtons = document.querySelectorAll(".remove-experience-btn");

    // Disable all
    removeButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.backgroundColor = "gray";
        btn.onclick = null; // remove previous handlers
    });

    // Enable ONLY the last one
    if (removeButtons.length > 1) {
        const lastBtn = removeButtons[removeButtons.length - 1];
        lastBtn.disabled = false;
        lastBtn.style.backgroundColor = "#ff4444";

        lastBtn.onclick = () => {
            removeExperienceField(lastBtn.dataset.removeId);
        };
    }
}

addExperienceBtn.addEventListener("click", addExperienceField);


function loadImage(src) {
    const img = document.createElement("img");
    return new Promise((resolve, reject) => {
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
    });
}

function updatePhotoPreview() {
    const fallback = "./assets/images/18.png";

    loadImage(url.value)
        .then(() => {
            preview.src = url.value;
        })
        .catch(() => {
            loadImage(fallback)
                .then(() => {
                    preview.src = fallback;
                });
        });
}


url.addEventListener("input", updatePhotoPreview);