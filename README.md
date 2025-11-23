# WorkSphere - Workspace Management System

## About This Project

WorkSphere is a web application I built to help manage employees in an office environment. It lets you add employees, assign them to different rooms/zones in the office, and keep track of their information and work experience.

## What It Does

### Main Features

#### Employee Management
- Add new employees with their personal info (name, email, phone, role)
- Add their work experience and previous jobs
- Edit employee information when needed
- View detailed employee profiles

#### Office Zone Management
- Visual office layout showing 6 different zones
- Assign employees to specific zones
- Each zone has a maximum capacity
- Some zones are restricted to certain job roles
- Remove employees from zones and put them back in the unassigned list

#### Data Storage
- All employee data is saved in the browser (localStorage)
- Data stays saved even if you close the browser
- No need for a database or server

## The Office Zones

The application has 6 different zones in the office:

1. **Conference Room** - Capacity: 3 people, Anyone can go here
2. **Reception** - Capacity: 10 people, Only for Receptionists (and Managers/Cleaning Staff)
3. **Server Room** - Capacity: 3 people, Only for IT Technicians (and Managers/Cleaning Staff)
4. **Security Room** - Capacity: 2 people, Only for Security Agents (and Managers/Cleaning Staff)
5. **Staff Room** - Capacity: 5 people, Anyone can go here
6. **Archives** - Capacity: 3 people, Anyone except Cleaning Staff

#### Special Rules:
- Managers can access any zone
- Cleaning Staff can access all zones except the Archives

## Available Job Roles

- Receptionist
- IT Technician
- Security Agent
- Manager
- Cleaning Staff
- General Staff

## How to Use

### Starting the Application

1. Download all the project files
2. Make sure you have this folder structure:
```
project folder/
├── index.html
├── styles/
│   └── style.css
├── scripts/
│   └── scripts.js
└── assets/
    └── images/
```
3. Open `index.html` in your web browser (Chrome, Firefox, Safari, etc.)

### Adding an Employee

1. Click the "Add New Worker" button
2. Fill in the required information:
   - Full Name (must be 2-50 characters)
   - Role (select from dropdown)
   - Email (must be a valid email)
   - Phone (valid phone number format)
   - Photo URL (optional - will use default if not provided)
3. Add at least one work experience:
   - Company name
   - Position
   - Start date
   - End date (must be after start date)
4. Click "Add" to add more experiences if needed
5. Click "Add Employee" to save

### Assigning Employees to Zones

1. Find the zone you want to assign someone to
2. Click the small "+" button on that zone
3. A list will pop up showing employees who can work in that zone
4. Click on an employee to assign them
5. The employee will move from "Unassigned Staff" to that zone
6. Empty zones show up in red, filled zones become transparent

### Editing Employee Information

1. Find the employee in the "Unassigned Staff" section (you can only edit unassigned employees)
2. Click the orange "Edit" button
3. The form will open with their current information
4. Make your changes
5. Click "Edit Employee" to save

### Removing from a Zone

1. Click the "×" button on the employee card in any zone
2. They will move back to "Unassigned Staff"

### Viewing Employee Profile

1. Click on any employee's photo anywhere in the app
2. A profile window will open showing:
   - Their photo
   - Personal information
   - All their work experience

## Technical Details

### Technologies I Used

- HTML5 - for the structure
- CSS3 - for styling and making it look good
- JavaScript (ES6) - for all the functionality
- localStorage - to save data in the browser

### Form Validation

The app checks that you enter information correctly:
- Names must be between 2-50 characters, only letters, spaces, and hyphens
- Email must be in proper email format (example@email.com)
- Phone numbers must be valid
- Experience end dates must come after start dates
- All required fields must be filled

### Responsive Design

The application works on different screen sizes:
- Works best on desktop computers
- Automatically adjusts for tablets and smaller screens
- On very small screens (phones), it rotates the layout for better viewing

## How the Code Works

### Main JavaScript Functions

#### Adding Employees
- `addEmployee()` - Creates a new employee and adds them to the array
- Generates a unique ID for each employee
- Saves to localStorage

#### Zone Management
- `assignEmployeeToZone()` - Moves an employee to a specific zone
- `canEmployeeBeAssigned()` - Checks if an employee is allowed in a zone based on their role and the zone's capacity
- `removeEmployeeFromZone()` - Moves employee back to unassigned

#### Display Functions
- `displayUnassignedStaff()` - Shows all employees not assigned to a zone
- `displayZones()` - Updates the visual display of all zones
- `openEmployeeProfile()` - Shows detailed employee information

#### Data Persistence
- `saveToLocalStorage()` - Saves all employee data to the browser
- `loadFromLocalStorage()` - Loads saved data when the page opens

### CSS Features

- Used CSS Grid for the office layout
- CSS variables for easy color customization
- Media queries for responsive design
- Hover effects and transitions for better user experience

## Challenges I Faced

1. **Making the zone restrictions work** - Had to write logic to check employee roles against zone requirements
2. **Managing the employee IDs** - Needed to make sure each employee gets a unique ID even after reloading the page
3. **Form validation** - Writing the regular expressions to validate email and phone numbers correctly
4. **Experience fields** - Making it so you can add multiple experiences and only remove the last one
5. **Responsive design** - Getting the layout to work on different screen sizes, especially the rotation on mobile

## What I Learned

- How to use localStorage to save data in the browser
- Working with JavaScript arrays and objects
- Form validation with regular expressions
- CSS Grid for complex layouts
- Event handling and DOM manipulation
- How to structure a larger JavaScript project
- Debugging with browser developer tools

## Possible Improvements

If I had more time, I would add:
- Search functionality to find employees quickly
- Ability to export employee data
- More detailed reporting features
- Drag and drop to move employees between zones
- Print function for employee lists
- More customization options for zones

## Browser Requirements

The application works on modern browsers:
- Google Chrome (recommended)
- Mozilla Firefox
- Safari
- Microsoft Edge

You need JavaScript enabled to use the application.

## Known Issues

- Data is only stored in your browser - if you clear browser data, all employees will be deleted
- Can't share data between different computers or browsers
- Limited to about 5MB of storage space (browser limitation)
- Some very old browsers might not work

## File Structure Explanation

**index.html** - The main HTML file with the page structure and all the modals (popup windows)

**style.css** - All the styling including colors, layout, responsive design, and animations

**scripts.js** - All the JavaScript code that makes the application work - handles adding employees, assigning them to zones, validation, and storage

**Images folder** - Contains the office floor plan background and default avatar image

## Credits

This project was created as part of my web development coursework. All code was written by me with help from course materials and online documentation.

---