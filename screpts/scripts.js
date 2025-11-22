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
const profileContent = document.getElementById("profileContent");
const actionOfWorker = document.getElementById("actionOfWorker");
const addEmployeeBtnSubmit = document.getElementById("addEmployeeBtnSubmit");

// Zone Configuration
const zoneConfig = {
    conference: { name: "conference", capacity: 3, restrictions: [] },
    reception: { name: "reception", capacity: 10, restrictions: ["Receptionist"] },
    server: { name: "server", capacity: 3, restrictions: ["IT Technician"] },
    security: { name: "security", capacity: 2, restrictions: ["Security Agent"] },
    staff: { name: "staff", capacity: 5, restrictions: [] },
    archives: { name: "archives", capacity: 3, restrictions: ["Cleaning Staff"] }
};

// Global Data
let employees = [];
let experiences = [];
let employeeId = 1;
let experienceIdCounter = 2;
//this variable is for the editId
let EditingEmployeeId = 0;

function openAddModal() {
    addModal.classList.remove("hidden");
}

addEmployeeBtn.addEventListener("click", openAddModal);
canselFormBtn.addEventListener("click", closeModals)

function closeModals() {
    addModal.classList.add("hidden");
    selectionModal.classList.add("hidden");
    profileModal.classList.add("hidden");
    //reset the edit emp id
    EditingEmployeeId = 0;
    //reset the form
    addEmployeeForm.reset();
    //if it close after the title and the btn reset
    actionOfWorker.innerHTML = "ADD WORKER";
    addEmployeeBtnSubmit.innerHTML = "Add Employee"
    // reset the number of experiences   
    while(experienceIdCounter > 2){
        removeExperienceField(experienceIdCounter-1);
    }
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
addEmployeeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    errorMessageValidation.innerHTML = "";
    clearTimeout(errorTimeout);

    // Validate all required fields
    const isEmailValid = validateField(employeeEmail, "emailError");
    const isNameValid = validateField(employeeName, "nameError");
    const isPhoneValid = validateField(employeePhone, "phoneError");
    const isExperiencesValid = validateDates();

    if (isNameValid && isEmailValid && isPhoneValid && isExperiencesValid) {
        // All validations passed - proceed with form submission
        if (EditingEmployeeId != 0) {
            editEmployee(EditingEmployeeId);
        } else {
            addEmployee();
        }
        displayUnassignedStaff();
        lestenToProfileImages();
        saveToLocalStorage();
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
                    <img data-profile="${staff.id}" src="${staff.photo}" alt="Preview" style="width:50px; cursor: pointer;">
                </div>
                <div>
                    <span class="selectionName">${staff.name}</span>
                    <span>${staff.role}</span>
                </div>
                <div>
                    <button class="editBtn" data-btn-id="${staff.id}">edit</button>
                </div>
            </div>
        `
    });
    const editBtn = document.querySelectorAll(".editBtn");

    editBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            filedTheForm(btn.dataset.btnId);
            EditingEmployeeId = btn.dataset.btnId;
        });
    });
}

function removeEmployeeFromZone(employeeId) {
    const employee = employees.find(e => e.id == employeeId);
    employee.location = "unassigned";
    displayUnassignedStaff();
    displayZones();
    saveToLocalStorage();
    lestenToProfileImages();
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
                            <img data-profile="${e.id}" src="${e.photo}" alt="Preview" style="width:80px;">
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
    saveToLocalStorage();
    lestenToProfileImages()
}

//it will be used in displayZones
const zonesplaces = [conferenceZone, receptionZone, serverZone, securityZone, staffZone, archivesZone];
const zonesName = ["conference", "reception", "server", "security", "staff", "archives"];

function displayZones() {
    //for each zone we display the employees 
    //the index is used for the zonePlacesZ
    zonesName.forEach((zone, index) => {
        zonesplaces[index].innerHTML = "";
        employees.forEach((emp) => {
            if (emp.location == zone) {
                zonesplaces[index].innerHTML += `
            <div class="employee-card-onzone">
                <img data-profile="${emp.id}" src="${emp.photo}" alt="Preview" style="width:40px;">
                <div>
                    <h4>${emp.name}</h4>
                    <p>${emp.role}</p>
                </div>
                <div style="font-size: 25px;" class="btnToUnassignedEmp" data-id="${emp.id}">&times;</div>
            </div>
            `;
            }
        });
    });

    const btnsToUnassignedEmp = document.querySelectorAll(".btnToUnassignedEmp");

    if (btnsToUnassignedEmp) {
        btnsToUnassignedEmp.forEach((btn) => {
            btn.addEventListener("click", () => {
                removeEmployeeFromZone(btn.dataset.id);
            });
        });
    }

    zonesplaces.forEach((zone) => {
        const parent = zone.closest(`.${zone.id}`);
        if (zone.innerHTML !== "") {
            parent.style.backgroundColor = "transparent";

        } else {
            parent.style.backgroundColor = "rgba(255,68,68,0.4)";
        }
    });
}

function openEmployeeProfile(employeeId) {

    const theEmp = employees.find(e => e.id == employeeId);
    profileContent.innerHTML = "";
    profileModal.classList.remove("hidden")
    profileContent.innerHTML = `
    <div class="selectionEmployee-block" data-emp-id="${theEmp.id}">
        <div>
            <img src="${theEmp.photo}" alt="Preview" style="width:150px; cursor: pointer;">
        </div>
        <div>
            <h3>Personal Information</h3>
            <div>
                <span>Name:</span>
                <span>${theEmp.name}</span>
            </div>
            <div>
                <span>Role:</span>
                <span>${theEmp.role}</span>
            </div>
            <div>
                <span>Email:</span>
                <span>${theEmp.email}</span>
            </div>
            <div>
                <span>Phone:</span>
                <span>${theEmp.phone}</span>
            </div>
        </div> 
        <h3>Professional Experience</h3>
        
    `;

    theEmp.experiences.forEach(exp => {
        profileContent.innerHTML += `
        <div class="selectionEmployee-block">
            <div>
                <h4>position: ${exp.position}</h4>
                <p>company: ${exp.company}</p>
                <p>Date start: ${exp.start} - Date end: ${exp.end}</p>
            </div>
        </div>  
    `;
    })

    profileContent.innerHTML += `
        </div>
    `;
}

function lestenToProfileImages() {
    const allEmpInZonesImgs = document.querySelectorAll("[data-profile]");

    allEmpInZonesImgs.forEach(img => {
        img.addEventListener("click", () => {
            openEmployeeProfile(img.dataset.profile);
        })
    });
}

function filedTheForm(employeeId) {
    const theEmp = employees.find(e => e.id == employeeId);
    openAddModal();
    actionOfWorker.innerHTML = "EDIT THE WORKER"
    addEmployeeBtnSubmit.innerHTML = "Edit Employee"

    employeeName.value = theEmp.name;
    employeeRole.value = theEmp.role;
    url.value = theEmp.photo;
    employeeEmail.value = theEmp.email;
    employeePhone.value = theEmp.phone;

    const thEmpExperiences = theEmp.experiences;

    for (let i = 0; i < thEmpExperiences.length - 1; i++) {
        addExperienceField();
    }
    const expCompany = document.querySelectorAll(".exp-company");
    const expPosition = document.querySelectorAll(".exp-position");
    const expStart = document.querySelectorAll(".exp-start");
    const expEnd = document.querySelectorAll(".exp-end");

    theEmp.experiences.forEach((exp, index) => {
        expCompany[index].value = exp.company;
        expPosition[index].value = exp.position;
        expStart[index].value = exp.start;
        expEnd[index].value = exp.end;
    });

}

function editEmployee(employeeId) {

    const theEmp = employees.find(e => e.id == employeeId);

    theEmp.name = employeeName.value;
    theEmp.role = employeeRole.value;
    theEmp.photo = preview.src;
    theEmp.email = employeeEmail.value;
    theEmp.phone = employeePhone.value;
    theEmp.experiences = experiences;
}

function saveToLocalStorage() {
    localStorage.setItem("employeesData", JSON.stringify(employees));
}

function loadFromLocalStorage() {
    try {
        employees = JSON.parse(localStorage.getItem("employeesData")) || [];
    } catch (error) {
        employees = [];
    }

    const maxId = employees.length > 0 ? employees.reduce((max, emp) => emp.id > max ? emp.id : max, 0) : 0;

    employeeId = maxId + 1;

    displayUnassignedStaff();
    displayZones();
    lestenToProfileImages();
}

document.addEventListener("DOMContentLoaded", loadFromLocalStorage);