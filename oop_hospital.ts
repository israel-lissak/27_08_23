abstract class Person  {

    firstName 
    lastName
    age
    address

    constructor(firstName: string, lastName: string, age: number, address: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
    }

    details() {
        console.log(`name: ${this.firstName} ${this.lastName}`);
    }


}


class Patient extends Person {

    private patientId
    phoneNumber
    emergencyContact
    medicalHistory 

    constructor(firstName: string, lastName: string, age: number, address: string ,patientId: number, phoneNumber: number, emergencyContact: number, medicalHistory: Appointment[] = []) {
        super(firstName, lastName, age, address);
        this.patientId = patientId;
        this.phoneNumber = phoneNumber;
        this.emergencyContact = emergencyContact;
        this.medicalHistory = medicalHistory;
    }

    details(): void {
        super.details();
        console.log(`patient id: ${this.patientId} \nphone number: ${this.phoneNumber} \nemergency contact: ${this.emergencyContact} \n\nmedical history:\n`);
        this.medicalHistory.forEach((appointment, index) => {
            console.log(`appointment number ${index + 1}: \nappointed doctor: ${appointment.doctor.firstName} ${appointment.doctor.lastName} \nappointment date: ${appointment.date} on ${appointment.time} \n`);
        });
    }

    getId() : number {
        return this.patientId
    }
    
    updateMedicalHistory(lastAppointment: Appointment): void {
        this.medicalHistory.push(lastAppointment);
        console.log('medical history updated successfully');
    }

    getFullName():string {
        return `${this.firstName} ${this.lastName}`;
    }

}


class MedicalStaff extends Person {

    staffId
    position 
    department

    constructor(firstName: string, lastName: string, age: number, address: string, staffId: number, position: string, department: string) {
        super(firstName, lastName, age, address);
        this.staffId = staffId;
        this.position = position;
        this.department = department;
    }

}


class Doctor extends MedicalStaff {

    private doctorId
    specialization
    availability 

    constructor(firstName: string, lastName: string, age: number, address: string, staffId: number, position: string, department: string ,doctorId: number, specialization: string, availability: {date: string, time: string}[]) {
        super(firstName, lastName, age, address, staffId, position, department);
        this.doctorId = doctorId;
        this.specialization = specialization;
        this.availability = availability;
    }

    details(): void {
        super.details();
        console.log(`doctor id: ${this.doctorId} \nspecialization: ${this.specialization}`);
    }

    getId() : number {
        return this.doctorId
    }

    getScheduleByDay(date: string): {date: string, time: string}[] {
        const scheduleOfDay: {date: string, time: string}[] = [];
        this.availability.forEach(appointment => {
            if (appointment.date === date) {
                scheduleOfDay.push(appointment);
            }
        })
        return scheduleOfDay;
    }

    getAvailableAppointments(date: string): {date: string, time: string}[] {
        const availableAppointmentsOfDay: {date: string, time: string}[] = [
            {date: date, time: '10:00 AM'},
            {date: date, time: '11:00 AM'},
            {date: date, time: '12:00 AM'},
            {date: date, time: '13:00 AM'},
            {date: date, time: '14:00 AM'},
            {date: date, time: '15:00 AM'},
            {date: date, time: '16:00 AM'},
            {date: date, time: '17:00 AM'},
        ];
        const takenAppointments = this.getScheduleByDay(date);
        
        availableAppointmentsOfDay.forEach((element, index) => {
            takenAppointments.forEach(appointment => {
                if (appointment.time === element.time) {
                    availableAppointmentsOfDay.splice(index,1)
                }
            })
        })

        return availableAppointmentsOfDay;
    }

}


class Appointment  {

    patient
    doctor
    date
    time 
    status   

    constructor(patient: Patient, doctor: Doctor, date:string, time: string, status :'planned'|'completed'|'cancelled') {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
        this.status = status;
        if(this.status === 'planned'){
            doctor.availability.push({date, time});
        }
    }

    appointmentDetails() {
        console.log('appointed doctor:');
        this.doctor.details();
        console.log('patient:');
        this.patient.details();
        console.log(`appointment date: ${this.date} in ${this.time} \n`);
    }

    changeStatus(newStatus: 'planned'|'completed'|'cancelled') {
        this.status = newStatus;
        console.log('status updated successfully');
       //צריך להוסיף בדיקה לסטטוס ולפי זה לעדכן את הזמינות אצל הדוקטור
    }

}


class MedicalRecord {

    patient
    doctor
    diagnosis 
    prescription

    constructor(patient: Patient, doctor: Doctor, diagnosis: string, prescription: string) {
        this.patient = patient;
        this.doctor = doctor;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
    }

}



class Hospital  {

    hospitalName
    doctors
    patients
    appointments
    medicalRecord

    constructor(hospitalName:string, doctors: Doctor[], patients: Patient[], appointments: Appointment[], medicalRecord: MedicalRecord[]) {
        this.hospitalName = hospitalName;
        this.doctors = doctors;
        this.patients = patients;
        this.appointments = appointments;
        this.medicalRecord = medicalRecord;
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

    getDoctorBySpecialization(specialization: string):Doctor[] {
        const doctorsBySpecialization: Doctor[] = []
        this.doctors.forEach(doctor => {
            if (doctor.specialization === specialization) {
                doctorsBySpecialization.push(doctor);
            }
        })
        return doctorsBySpecialization
    }

    createMedicalRecord(patient: Patient, doctor: Doctor, diagnosis: string, prescription: string): void{
        const newMedicalRecord = new MedicalRecord(patient, doctor, diagnosis, prescription);
        this.medicalRecord.push(newMedicalRecord);
        console.log('medical record created and added successfully to the hospital DB');
    }

    getMedicalRecords(patientName: string): MedicalRecord[] {
        const patientMedicalRecord: MedicalRecord[] = [];
        this.medicalRecord.forEach(record => {
            if (record.patient.getFullName() === patientName) {
                patientMedicalRecord.push(record);
            }
        })
        return patientMedicalRecord
    }


}




// Create instances of Doctor
const doctor1 = new Doctor("John", "Doe", 35, "123 Main St",1001, 'doctor', 'Cardiology', 1, "Cardiology", []);
const doctor2 = new Doctor("Jane", "Smith", 40, "456 Elm St", 1002,'doctor','Pediatrics', 2, "Pediatrics",[]);

// Create instances of Patient
const patient1 = new Patient("Alice", "Johnson", 28, "789 Oak St", 101, 5551234, 555-5678, []);
const patient2 = new Patient("Bob", "Williams", 45, "321 Pine St", 102, 5555678, 555-1234, []);

// Create instances of Hospital
const hospital = new Hospital("St. Mary's Hospital", [doctor1, doctor2], [patient1, patient2], [], []);

// Add new patients and doctors to the hospital
const newPatient = new Patient("Eve", "Brown", 30, "654 Maple St", 103, 5551111, 5552222, []);
hospital.addNewPatient(newPatient);
console.log('1');

const newDoctor = new Doctor("Michael", "Davis", 50, "987 Birch St", 1003, 'doctor', 'Orthopedics', 3, "Orthopedics", []);
hospital.addNewDoctor(newDoctor);
console.log('2');

// Schedule appointments between patients and doctors
const appointment1 = new Appointment(patient1, doctor1, "2023-08-28", "10:00 AM", 'planned');
const appointment2 = new Appointment(patient2, doctor2, "8/28/2023", "11:00 AM", 'completed');
const appointment3 = new Appointment(newPatient, newDoctor, "2023-08-29", "2:00 PM", 'cancelled');
hospital.addNewAppointment(appointment1);
hospital.addNewAppointment(appointment2);
hospital.addNewAppointment(appointment3);
console.log('3');

// Display appointment details
console.log("All Appointments:");
hospital.appointmentsDetails();
console.log('4');

// Display appointment details for a specific doctor
console.log("\nAppointments for Doctor with ID 1:");
hospital.appointmentsDetailsByDoctorId(1);
console.log('5');

// Display appointment details for a specific patient
console.log("\nAppointments for Patient with ID 101:");
hospital.appointmentsDetailsByPatientId(101);
console.log('6');

// Display appointment details for today
console.log("\nAppointments for Today:");
hospital.appointmentsDetailsToday();
console.log('7');


patient1.updateMedicalHistory(appointment1);
patient1.updateMedicalHistory(appointment2);
patient1.details();

console.log(appointment1.status);
appointment1.changeStatus('cancelled');
console.log(appointment1.status);
console.log(appointment1.doctor.availability);



console.log(doctor1.getAvailableAppointments("2023-08-28"));


