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
const employeeName = document.getElementById("employeeName");
const employeeEmail = document.getElementById("employeeEmail");
const employeePhone = document.getElementById("employeePhone");
const employeeRole = document.getElementById("employeeRole")
const errorMessageValidation = document.querySelector(".error-message");
const addEmployeeForm = document.getElementById("addEmployeeForm");
const employeeContainer = document.getElementById("employeeContainer");
const selectionList = document.getElementById("selectionList");
const addZoneBtn = document.querySelectorAll(".add-zone-btn");
const conferenceZone = document.getElementById("conference");
const receptionZone = document.getElementById("reception");
const serverZone = document.getElementById("server");
const securityZone = document.getElementById("security");
const staffZone = document.getElementById("staff");
const archivesZone = document.getElementById("archives");

// Zone Configuration
const zoneConfig = {
    conference: { name: "conference", capacity: 10, restrictions: [] },
    reception: { name: "reception", capacity: 2, restrictions: ["Receptionist"] },
    server: { name: "server", capacity: 3, restrictions: ["IT Technician"] },
    security: { name: "security", capacity: 2, restrictions: ["Security Agent"] },
    staff: { name: "staff", capacity: 15, restrictions: [] },
    archives: { name: "archives", capacity: 3, restrictions: ["Cleaning Staff"] }
};

// Global Data
let employees = [];
let experiences = [];
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

const REGEX = {
    nameError: /^[a-zA-Z\s-]{2,50}$/,
    phoneError: /^\+?[1-9]\d{0,3}[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?[\d\s.-]{7,15}$/,
    emailError: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

// Error messages
const ERRORMESSAGES = {
    nameError: "Name must contain only letters, spaces, and hyphens (2-50 characters)",
    phoneError: "Please enter a valid international phone number (e.g., +1234567890)",
    emailError: "Please enter a valid email address",
};

let errorTimeout;

function validateField(field, fieldType) {

    clearTimeout(errorTimeout);

    // Check regex validation
    if (!REGEX[fieldType].test(field.value) || field.value.trim() == "") {
        errorMessageValidation.innerHTML += ERRORMESSAGES[fieldType] + `</br>`;
        errorTimeout = setTimeout(() => {
            errorMessageValidation.innerHTML = "";
        }, 3000);
        return false;
    }

    return true;
}

//validatiion experiences
function validateDates() {
    experiences = [];
    const experiencesThatExist = document.querySelectorAll(".experience-block");
    let isExperiences = true;

    experiencesThatExist.forEach((experience) => {
        const company = experience.querySelector('.exp-company').value;
        const position = experience.querySelector('.exp-position').value;
        const start = experience.querySelector('.exp-start').value;
        const end = experience.querySelector('.exp-end').value;
        clearTimeout(errorTimeout);
        if (start > end || !company || !position || !start || !end) {
            isExperiences = false;
            errorMessageValidation.innerHTML += `make sure the experiences are valid</br>`;
            errorTimeout = setTimeout(() => {
                errorMessageValidation.innerHTML = "";
            }, 3000);

        } else {
            experiences.push({ company, position, start, end });
        }
    });
    return isExperiences;
}

// Form submission validation
addEmployeeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    errorMessageValidation.innerHTML = "";
    clearTimeout(errorTimeout);

    // Validate all required fields
    const isEmailValid = validateField(employeeEmail, 'emailError');
    const isNameValid = validateField(employeeName, 'nameError');
    const isPhoneValid = validateField(employeePhone, 'phoneError');
    const isExperiencesValid = validateDates();

    if (isNameValid && isEmailValid && isPhoneValid && isExperiencesValid) {
        // All validations passed - proceed with form submission
        addEmployee();
        displayUnassignedStaff();
        addEmployeeForm.reset();
        closeModals();
    }
});

function addEmployee() {
    const employee = {
        id: employeeId++,
        name: employeeName.value,
        role: employeeRole.value,
        photo: preview.src,
        email: employeeEmail.value,
        phone: employeePhone.value,
        location: "unassigned",
        experiences: experiences,
    };
    employees.push(employee);
}

function displayUnassignedStaff() {
    employeeContainer.innerHTML = "";

    //return array to only the unssingned staff
    const UnassignedStaff = employees.filter((emp) => {
        return emp.location == "unassigned";
    });

    //display it in the asid bar
    UnassignedStaff.forEach((staff) => {

        employeeContainer.innerHTML += `
            <div class="selection-list">
                <div>
                    <img src="${staff.photo}" alt="Preview" style="width:80px;">
                </div>
                <div>
                    <span class="selectionName">${staff.name}</span>
                    <span>IT Technician</span>
                </div>
            </div>
        `
    });
}

function removeEmployeeFromZone(employeeId) {
    const employee = employees.find(e => e.id === employeeId);
    if (employee[0]) {
        employee[0].location = "unassigned";
        displayUnassignedStaff();
        displayZones();
    }
}

function canEmployeeBeAssigned(employee, zoneName) {
    const zone = zoneConfig[zoneName];

    // Check capacity
    const currentCount = employees.filter(e => e.location === zoneName).length;
    if (currentCount >= zone.capacity) return false;

    // Manager can go anywhere
    if (employee.role === 'Manager') return true;

    // Cleaning staff can go everywhere except archives
    if (employee.role === 'Cleaning Staff' && zoneName === 'archives') return false;
    if (employee.role === 'Cleaning Staff') return true;

    // Check zone restrictions
    if (zone.restrictions.length === 0) return true;
    return zone.restrictions.includes(employee.role);
}

function openZoneSelection(zoneName) {
    selectionList.innerHTML = "";

    const zoneNameAllowed = employees.filter((emp) => {
        return canEmployeeBeAssigned(emp, zoneName);
    });

    if (zoneNameAllowed.length === 0) {
        selectionList.innerHTML = "No eligible employee";
    } else {
        zoneNameAllowed.forEach((e) => {
            selectionList.innerHTML += `<div class="selection-list" style="cursor: pointer;" onclick="assignEmployeeToZone(${e.id}, ${zoneName});" data-id=${e.id}>
                        <div>
                            <img src="${e.photo}" alt="Preview" style="width:80px;">
                            </div>
                            <div>
                            <span class="selectionName">${e.name}</span>
                            <span>${e.role}</span>
                            </div>
                            </div>`;
        });
    }
}
addZoneBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        selectionModal.classList.remove("hidden");
        openZoneSelection(btn.dataset.zone);
    });
});

function assignEmployeeToZone(employeeId, zoneName) {
    employees.map((emp) => {
        if (employeeId == emp.id) {
            emp.location = zoneName.id;
        }
    });
    displayUnassignedStaff();
    closeModals();
    displayZones();
}

//it will be used in displayZones
const zonesplaces = [conferenceZone, receptionZone, serverZone, securityZone, staffZone, archivesZone];
const zonesName = ["conference", "reception", "server", "security", "staff", "archives"];

console.log(conference.innerHTML);


function displayZones() {
    //for each zone we display the employees 
    //the index is used for the zonePlacesZ
    zonesName.forEach((zone, index) => {
        zonesplaces[index].innerHTML = "";
        employees.forEach((emp) => {
            if (emp.location == zone) {
                zonesplaces[index].innerHTML += `
            <div class="employee-card-onzone">
                <img src="${emp.photo}" alt="Preview" style="width:40px;">
                <div>
                    <h4>${emp.name}</h4>
                    <p>${emp.role}</p>
                </div>
                <div style="font-size: 25px;" class="btnToUnassignedEmp" data-id="${emp.id}">&times;</div>
            </div>
            `
            }
        });
    });

    zonesplaces.forEach((zone) => {
        const parent = zone.closest(`.${zone.id}`);
        if (zone.innerHTML !== "") {
            parent.style.backgroundColor = "transparent";
        } else {
            parent.style.backgroundColor = "rgba(255,68,68,0.)";
        }
    });
}