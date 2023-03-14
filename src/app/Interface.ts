export const errorInterface = {
    nameEr: "",
    emailEr: "",
    passwordEr: "",
    cpasswordEr: "",
  }
  export const signupInterface = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  }
  export interface authResponse {
  messages: {
    success: string,
    message:string,
    id:number,
    name:string,
    email:string,
  }
}
export interface newEmail {
  status:number,
  error:string,
  messages: {
    success: string,
    message:string,
  }}
  export interface mailRes {
    

      date:string,
      id:number,
      message:string,
      readStatus:string,
      sender:string,receiver:string,senderId:number,sentStatus:string,subject:string,file:string
    
    }
  export interface mailRess {
    data:mailRes[],
    emailCount:number
    }
