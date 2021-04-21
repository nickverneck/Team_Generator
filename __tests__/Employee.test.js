const Employee = require("../lib/Employee");

describe("Employee", ()=>{
    const employee = new Employee("John",3,"john@doe.com");
    it("should Instantiate a new object ",()=>{
        
        expect(typeof(employee)).toEqual("object");
    })
    it("should return getRole() as Employee",()=>{
       
        expect(employee.getRole()).toBe("Employee");
    })
    it("should return getID() as 3",()=>{
        
        expect(employee.getID()).toBe(3);
    })
    it("should return getEmail() as john@doe.com",()=>{
        
        expect(employee.getEmail()).toBe("john@doe.com");
    })
})