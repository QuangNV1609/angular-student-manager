export class Student {
    id?: string;
    firstName: string;
    lastName: string
    phoneNumber: string;
    email: string;
    gender: boolean;
    birthDay: Date;
    address: string;

    constructor(id: string, firstName: string, lastName: string, email: string, phone: string, gender: boolean, birthDay: Date, address: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phone;
        this.email = email;
        this.gender = gender;
        this.birthDay = birthDay;
        this.address = address
    }
}