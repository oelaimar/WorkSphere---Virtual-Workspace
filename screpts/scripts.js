

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


