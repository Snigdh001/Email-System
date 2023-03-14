import { errorInterface, } from "./Interface";
export class regValidation {
    constructor() { }
    
    emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{1,5}$/i;
    passregex = /^[A-Za-z0-9!@#$%^&*()_]{6,16}$/i;
    nameregex = /^[a-zA-Z]{3,16}$/i;

    checkEmail(email: string) {
        if (email === "") {
            errorInterface.emailEr = "Email is Required";
            return false
        }
        else {
            if (this.emailregex.test(email) === false) {
                errorInterface.emailEr = "Please Enter Valid Email Address i.e xyz@abc.in";
                return false
            }
            else {
                errorInterface.emailEr = ""
                return true
            }
        }
    }
    checkName = (Name: string) => {
        if (Name === "") {
            errorInterface.nameEr = "First Name is Required";
            return false
        }
        else {
            if (this.nameregex.test(Name) === false) {
                errorInterface.nameEr = "Please Enter Valid Name (min 3 characters)";
                return false;
            }
            else {
                errorInterface.nameEr = ("")
                return true;
            }
        }
    }
  
    checkPass = (password: string) => {
        if (password === "") {
            errorInterface.passwordEr = "Password is Required";
            return false
        }
        else {
            if (this.passregex.test(password) === false) {
                errorInterface.passwordEr = "Please Enter Valid Password (min 6 characters)";
                return false;
            }
            else {
                errorInterface.passwordEr = ""
                return true;
            }
        }
    }
    checkCpass = (cpassword: string, password: string) => {
        if (cpassword === "") {
            errorInterface.cpasswordEr = "Confirm Password is Required";
            return false
        }
        else {
            if (cpassword !== password) {
                errorInterface.cpasswordEr = "Both Password Must be Same";
                return false
            }
            else {
                errorInterface.cpasswordEr = ""
                return true;

            }
        }
    }
    

    validateAll = (data: any) => {
        let count = 0
        if (data.email!=undefined &&this.checkEmail(data.email))
        count+=1
        if (data.password!=undefined &&this.checkPass(data.password))
        count+=1
        if (data.name!=undefined && this.checkName(data.name))
        count+=1
        if (data.cpassword!=undefined &&this.checkCpass(data.cpassword, data.password))
        count+=1
        // console.log(count)
        console.log(data)
        return count
    }
}
