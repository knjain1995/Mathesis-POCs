// Signup form fields
export interface studentData {
    id: number,
    studentFirstName: string,
    studentLastName: string,
    studentEmail: string,
    studentPhoneNumber: number,
    studentDateOfBirth: Date,
    studentPresentAddress: string, // text area
    studentIDNumber: number,    // input: WAXXX
    studentAcademicYear: Date, // Date range
    studentNationality: string, // International, Domestic (radio)
    studentScholarshipStatus: boolean, // Yes, No
    studentScholarshipGained: string,   // One of Chevening, Dean's Award, Other and other is a input field
    studentScholarshipsGained_CheveningScholarship: boolean,
    studentScholarshipsGained_DeansScholarship: boolean,
    studentScholarshipsGained_Other: string,
    // Autopopulate core modules based on selected degree program and select elective modules
    studentDegreeProgram: string,  // Selection
    studentCoreModule1: string,    // Selection
    studentCoreModule2: string,
    studentElectiveModule1: string,
    studentElectiveModule2: string,
    studentElectiveModule3: string,
}

// ecFirstName: string,    // Emergency Contact Details
// ecLastName: string,
// ecRelationship: string, // Selection
// ecPhoneNumber: string,
// ecEmail: string,
// ecPresentAddress: string,   // text area