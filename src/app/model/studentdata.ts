// Signup form fields
export interface studentData {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    dateOfBirth: Date,
    presentAddress: string, // text area
    studentIDNumber: number,    // input: WAXXX
    academicYear: Date, // Date range
    degreeProgram: string,  // Selection
    studentType: string, // International, Domestic (radio)
    scholarshipStatus: boolean, // Yes, No
    // Autopopulate core modules based on selected degree program and select elective modules
    coreModule1: string,    // Selection
    coreModule2: string,
    electiveModule1: string,
    electiveModule2: string,
    electiveModule3: string,
}

// ecFirstName: string,    // Emergency Contact Details
// ecLastName: string,
// ecRelationship: string, // Selection
// ecPhoneNumber: string,
// ecEmail: string,
// ecPresentAddress: string,   // text area