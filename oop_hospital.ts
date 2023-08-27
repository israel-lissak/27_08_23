abstract class Person  {

    firstName 
    lastName

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    details() {
        console.log(`name: ${this.firstName} ${this.lastName}`);
    }


}

class Patient extends Person {

    private patientId

    constructor(firstName: string, lastName: string ,patientId: number) {
        super(firstName, lastName);
        this.patientId = patientId;
    }

    details(): void {
        super.details();
        console.log(`patient id: ${this.patientId}`);
    }

    
    getId() : number {
        return this.patientId
    }
    

}

class Doctor extends Person {

    private doctorId
    specialization

    constructor(firstName: string, lastName: string ,doctorId: number, specialization: string) {
        super(firstName, lastName);
        this.doctorId = doctorId;
        this.specialization = specialization;
    }

    details(): void {
        super.details();
        console.log(`doctor id: ${this.doctorId} \nspecialization: ${this.specialization}`);
    }

    getId() : number {
        return this.doctorId
    }

}


class Appointment  {

    patient
    doctor
    date
    time    

    constructor(patient: Patient, doctor: Doctor, date:string, time: string) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
    }

    appointmentDetails() {
        console.log('appointed doctor:');
        this.doctor.details();
        console.log('patient:');
        this.patient.details();
        console.log(`appointment date: ${this.date} in ${this.time} \n`);
    }

}



class Hospital  {

    hospitalName
    doctors
    patients
    appointments

    constructor(hospitalName:string, doctors: Doctor[], patients: Patient[], appointments: Appointment[]) {
        this.hospitalName = hospitalName;
        this.doctors = doctors;
        this.patients = patients;
        this.appointments = appointments;
    }

    addNewPatient(newPatient: Patient) {
        this.patients.push(newPatient);
        console.log('patient added successfully');
    }
    
    addNewDoctor(newDoctor: Doctor) {
        this.doctors.push(newDoctor);
        console.log('doctor added successfully');
    }
    
    addNewAppointment(newAppointment: Appointment) {
        this.appointments.push(newAppointment);
        console.log('appointment added successfully');
    }

    appointmentsDetails() {
        this.appointments.forEach(element => {
            element.appointmentDetails();
        })
    }

    appointmentsDetailsByDoctorId(doctorId: number) {
        this.appointments.forEach(element => {
            if (element.doctor.getId() === doctorId) {
                element.appointmentDetails();
            }
        })
    }

    appointmentsDetailsByPatientId(patientId: number) {
        this.appointments.forEach(element => {
            if (element.patient.getId() === patientId) {
                element.appointmentDetails();
            }
        })
    }
   
    appointmentsDetailsToday() {
        const today = new Date();
        const todayStr = today.toLocaleDateString();

        console.log(todayStr);
        

        this.appointments.forEach(element => {
            if (element.date === todayStr) {
                element.appointmentDetails();
            }
        })
    }

}





// Create instances of Doctor
const doctor1 = new Doctor("John", "Doe", 1, "Cardiology");
const doctor2 = new Doctor("Jane", "Smith", 2, "Pediatrics");

// Create instances of Patient
const patient1 = new Patient("Alice", "Johnson", 101);
const patient2 = new Patient("Bob", "Williams", 102);

// Create instances of Hospital
const hospital = new Hospital("St. Mary's Hospital", [doctor1, doctor2], [patient1, patient2], []);

// Add new patients and doctors to the hospital
const newPatient = new Patient("Eve", "Brown", 103);
hospital.addNewPatient(newPatient);

const newDoctor = new Doctor("Michael", "Davis", 3, "Orthopedics");
hospital.addNewDoctor(newDoctor);

// Schedule appointments between patients and doctors
const appointment1 = new Appointment(patient1, doctor1, "8/27/2023", "10:00 AM");
const appointment2 = new Appointment(patient2, doctor2, "8/28/2023", "11:00 AM");
const appointment3 = new Appointment(newPatient, newDoctor, "8/29/2023", "2:00 PM");
hospital.addNewAppointment(appointment1);
hospital.addNewAppointment(appointment2);
hospital.addNewAppointment(appointment3);

// Display appointment details
console.log("All Appointments:");
hospital.appointmentsDetails();

// Display appointment details for a specific doctor
console.log("\nAppointments for Doctor with ID 1:");
hospital.appointmentsDetailsByDoctorId(1);

// Display appointment details for a specific patient
console.log("\nAppointments for Patient with ID 101:");
hospital.appointmentsDetailsByPatientId(101);

// Display appointment details for today
console.log("\nAppointments for Today:");
hospital.appointmentsDetailsToday();
