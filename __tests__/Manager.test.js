const Manager = require("../lib/Manager");

describe("Manager", ()=>{
    const manager = new Manager("John",3,"john@doe.com","3123213");
    it("should be an object",()=> {
       
        expect(typeof(manager)).toBe("object");
    })
    it("should return getRole() as Manager",()=>{
     
        expect(manager.getRole()).toBe("Manager");
    })
    it("should return getOfficeNumber() as 3123213",()=>{
     
        expect(manager.getOfficeNumber()).toBe("3123213");
    })
})