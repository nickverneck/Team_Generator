const Engineer = require("../lib/Engineer");

describe("Engineer",()=>{
    const engineer = new Engineer("John",3,"john@doe.com","johngit");
    it("Should be able to instantiate",()=>{
       
        expect(typeof(engineer)).toBe("object");
    })
    it("should return getRole() as Engineer",()=>{
       
        expect(engineer.getRole()).toBe("Engineer");
    })
    it("should return getGitHub() as johngit",()=>{
       
        expect(engineer.getGitHub()).toBe("johngit");
    })
})