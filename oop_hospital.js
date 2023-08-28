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
        console.log(`patient id: ${this.patientId} \nphone number: ${this.phoneNumber} \nemergency contact: ${this.emergencyContact} \nmedical history:`);
        this.medicalHistory.forEach(appointment => {
            console.log(`appointed doctor: ${appointment.doctor} \nappointment date: ${appointment.date} on ${appointment.time}`);
        });
    }
    getId() {
        return this.patientId;
    }
    updateMedicalHistory(lastAppointment) {
        this.medicalHistory.push(lastAppointment);
        console.log('medical history updated successfully');
    }
}
class Doctor extends Person {
    constructor(firstName, lastName, age, address, doctorId, specialization) {
        super(firstName, lastName, age, address);
        this.doctorId = doctorId;
        this.specialization = specialization;
    }
    details() {
        super.details();
        console.log(`doctor id: ${this.doctorId} \nspecialization: ${this.specialization}`);
    }
    getId() {
        return this.doctorId;
    }
}
class Appointment {
    constructor(patient, doctor, date, time) {
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
class Hospital {
    constructor(hospitalName, doctors, patients, appointments) {
        this.hospitalName = hospitalName;
        this.doctors = doctors;
        this.patients = patients;
        this.appointments = appointments;
    }
    addNewPatient(newPatient) {
        this.patients.push(newPatient);
        console.log('patient added successfully');
    }
    addNewDoctor(newDoctor) {
        this.doctors.push(newDoctor);
        console.log('doctor added successfully');
    }
    addNewAppointment(newAppointment) {
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
}
