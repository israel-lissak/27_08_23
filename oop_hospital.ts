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
        console.log(`patient id: ${this.patientId} \nphone number: ${this.phoneNumber} \nemergency contact: ${this.emergencyContact} \nmedical history:`);
        this.medicalHistory.forEach(appointment => {
            console.log(`appointed doctor: ${appointment.doctor} \nappointment date: ${appointment.date} on ${appointment.time}`);
        });
    }

    getId() : number {
        return this.patientId
    }
    
    updateMedicalHistory(lastAppointment: Appointment): void {
        this.medicalHistory.push(lastAppointment);
        console.log('medical history updated successfully');
    }

}

class Doctor extends Person {

    private doctorId
    specialization

    constructor(firstName: string, lastName: string, age: number, address: string ,doctorId: number, specialization: string) {
        super(firstName, lastName, age, address);
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




