//global elements declation
const addModal = document.getElementById("addModal");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const closeModalsBtn = document.querySelectorAll(".closeBtn");
const selectionModal = document.getElementById("selectionModal");
const profileModal = document.getElementById("profileModal");
const canselFormBtn = document.getElementById("canselFormBtn");


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

function openAddModal(){
    addModal.classList.remove("hidden");
}

addEmployeeBtn.addEventListener("click", openAddModal);
canselFormBtn.addEventListener("click", closeModals)



function closeModals(){
    addModal.classList.add("hidden");
    selectionModal.classList.add("hidden");
    profileModal.classList.add("hidden");
}



closeModalsBtn.forEach(e => {
    e.addEventListener("click", closeModals);
});
