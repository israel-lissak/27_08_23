"use strict";
class Person {
    constructor(firstName, lastName, age, address) {
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
    constructor(firstName, lastName, age, address, patientId, phoneNumber, emergencyContact, medicalHistory = []) {
        super(firstName, lastName, age, address);
        this.patientId = patientId;
        this.phoneNumber = phoneNumber;
        this.emergencyContact = emergencyContact;
        this.medicalHistory = medicalHistory;
    }
    details() {
        super.details();
        console.log(`patient id: ${this.patientId} \nphone number: ${this.phoneNumber} \nemergency contact: ${this.emergencyContact} \n\nmedical history:\n`);
        this.medicalHistory.forEach((appointment, index) => {
            console.log(`appointment number ${index + 1}: \nappointed doctor: ${appointment.doctor.firstName} ${appointment.doctor.lastName} \nappointment date: ${appointment.date} on ${appointment.time} \n`);
        });
    }
    getId() {
        return this.patientId;
    }
    updateMedicalHistory(lastAppointment) {
        this.medicalHistory.push(lastAppointment);
        console.log('medical history updated successfully');
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
class MedicalStaff extends Person {
    constructor(firstName, lastName, age, address, staffId, position, department) {
        super(firstName, lastName, age, address);
        this.staffId = staffId;
        this.position = position;
        this.department = department;
    }
}
class Doctor extends MedicalStaff {
    constructor(firstName, lastName, age, address, staffId, position, department, doctorId, specialization, availability, ageOfPatient) {
        super(firstName, lastName, age, address, staffId, position, department);
        this.doctorId = doctorId;
        this.specialization = specialization;
        this.availability = availability;
        this.ageOfPatient = ageOfPatient;
    }
    details() {
        super.details();
        console.log(`doctor id: ${this.doctorId} \nspecialization: ${this.specialization}`);
    }
    getId() {
        return this.doctorId;
    }
    getScheduleByDay(date) {
        const scheduleOfDay = [];
        this.availability.forEach(appointment => {
            if (appointment.date === date) {
                scheduleOfDay.push(appointment);
            }
        });
        return scheduleOfDay;
    }
    getAvailableAppointments(date) {
        const availableAppointmentsOfDay = [
            { date: date, time: '10:00 AM' },
            { date: date, time: '11:00 AM' },
            { date: date, time: '12:00 AM' },
            { date: date, time: '13:00 AM' },
            { date: date, time: '14:00 AM' },
            { date: date, time: '15:00 AM' },
            { date: date, time: '16:00 AM' },
            { date: date, time: '17:00 AM' },
        ];
        const takenAppointments = this.getScheduleByDay(date);
        availableAppointmentsOfDay.forEach((element, index) => {
            takenAppointments.forEach(appointment => {
                if (appointment.time === element.time) {
                    availableAppointmentsOfDay.splice(index, 1);
                }
            });
        });
        return availableAppointmentsOfDay;
    }
}
class Appointment {
    constructor(patient, doctor, date, time, status) {
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time = time;
        this.status = status;
        if (this.status === 'planned') {
            doctor.availability.push({ date, time });
        }
    }
    appointmentDetails() {
        console.log('appointed doctor:');
        this.doctor.details();
        console.log('patient:');
        this.patient.details();
        console.log(`appointment date: ${this.date} in ${this.time} \n`);
    }
    changeStatus(newStatus) {
        this.status = newStatus;
        console.log('status updated successfully');
        //צריך להוסיף בדיקה לסטטוס ולפי זה לעדכן את הזמינות אצל הדוקטור
    }
}
class MedicalRecord {
    constructor(patient, doctor, diagnosis, prescription) {
        this.patient = patient;
        this.doctor = doctor;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
    }
}
class Hospital {
    constructor(hospitalName, doctors, patients, appointments, medicalRecord) {
        this.hospitalName = hospitalName;
        this.doctors = doctors;
        this.patients = patients;
        this.appointments = appointments;
        this.medicalRecord = medicalRecord;
    }
    addNewPatient(firstName, lastName, age, address, patientId, phoneNumber, emergencyContact, medicalHistory) {
        const newPatient = new Patient(firstName, lastName, age, address, patientId, phoneNumber, emergencyContact, medicalHistory);
        this.patients.push(newPatient);
        console.log('patient added successfully');
    }
    addNewDoctor(firstName, lastName, age, address, staffId, position, department, doctorId, specialization, availability, ageOfPatient) {
        const newDoctor = new Doctor(firstName, lastName, age, address, staffId, position, department, doctorId, specialization, availability, ageOfPatient);
        this.doctors.push(newDoctor);
        console.log('doctor added successfully');
    }
    addNewAppointment(patient, doctor, date, time, status) {
        doctor.getScheduleByDay(date).forEach(appointment => {
            if (appointment.time === time) {
                console.log(`doctor ${doctor.firstName} ${doctor1.lastName} is not avilable in ${time}`);
                return;
            }
        });
        if (doctor.ageOfPatient === '0-18' && patient.age > 18 ||
            doctor.ageOfPatient === '18-40' && patient.age < 18 ||
            doctor.ageOfPatient === '18-40' && patient.age > 40 ||
            doctor.ageOfPatient === '40-99' && patient.age < 40) {
            console.log(`doctor ${doctor.firstName} ${doctor1.lastName} treats only patients at the age of ${doctor.ageOfPatient}`);
            return;
        }
        const newAppointment = new Appointment(patient, doctor, date, time, status);
        this.appointments.push(newAppointment);
        console.log('appointment added successfully');
    }
    appointmentsDetails() {
        this.appointments.forEach(element => {
            element.appointmentDetails();
        });
    }
    appointmentsDetailsByDoctorId(doctorId) {
        this.appointments.forEach(element => {
            if (element.doctor.getId() === doctorId) {
                element.appointmentDetails();
            }
        });
    }
    appointmentsDetailsByPatientId(patientId) {
        this.appointments.forEach(element => {
            if (element.patient.getId() === patientId) {
                element.appointmentDetails();
            }
        });
    }
    appointmentsDetailsToday() {
        const today = new Date();
        const todayStr = today.toLocaleDateString();
        console.log(todayStr);
        this.appointments.forEach(element => {
            if (element.date === todayStr) {
                element.appointmentDetails();
            }
        });
    }
    getDoctorBySpecialization(specialization) {
        const doctorsBySpecialization = [];
        this.doctors.forEach(doctor => {
            if (doctor.specialization === specialization) {
                doctorsBySpecialization.push(doctor);
            }
        });
        return doctorsBySpecialization;
    }
    createMedicalRecord(patient, doctor, diagnosis, prescription) {
        const newMedicalRecord = new MedicalRecord(patient, doctor, diagnosis, prescription);
        this.medicalRecord.push(newMedicalRecord);
        console.log('medical record created and added successfully to the hospital DB');
    }
    getMedicalRecords(patientName) {
        const patientMedicalRecord = [];
        this.medicalRecord.forEach(record => {
            if (record.patient.getFullName() === patientName) {
                patientMedicalRecord.push(record);
            }
        });
        return patientMedicalRecord;
    }
}
// Create instances of Doctor
const doctor1 = new Doctor("John", "Doe", 35, "123 Main St", 1001, 'doctor', 'Cardiology', 1, "Cardiology", [], '0-18');
const doctor2 = new Doctor("Jane", "Smith", 40, "456 Elm St", 1002, 'doctor', 'Pediatrics', 2, "Pediatrics", [], 'all');
// Create instances of Patient
const patient1 = new Patient("Alice", "Johnson", 28, "789 Oak St", 101, 5551234, 555 - 5678, []);
const patient2 = new Patient("Bob", "Williams", 45, "321 Pine St", 102, 5555678, 555 - 1234, []);
// Create instances of Hospital
const hospital = new Hospital("St. Mary's Hospital", [doctor1, doctor2], [patient1, patient2], [], []);
// Add new patients and doctors to the hospital
hospital.addNewPatient("Eve", "Brown", 30, "654 Maple St", 103, 5551111, 5552222, []);
console.log('1');
hospital.addNewDoctor("Michael", "Davis", 50, "987 Birch St", 1003, 'doctor', 'Orthopedics', 3, "Orthopedics", [], '18-40');
console.log('2');
// Schedule appointments between patients and doctors
hospital.addNewAppointment(patient1, doctor1, "2023-08-28", "10:00 AM", 'planned');
hospital.addNewAppointment(patient2, doctor1, "8/28/2023", "11:00 AM", 'completed');
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
console.log(doctor1.getAvailableAppointments("2023-08-28"));
