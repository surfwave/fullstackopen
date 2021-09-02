describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Rennie Crown",
      username: "surfwave",
      password: "xixihaha",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Notes");
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
  });

  it("user can log in", function () {
    cy.contains("log in").click();
    cy.get("#username").type("surfwave");
    cy.get("#password").type("xixihaha");
    cy.get("#login-button").click();
    cy.contains("Rennie Crown logged-in");
  });

  it("login fails with wrong password", function () {
    cy.contains("log in").click();
    cy.get("#username").type("surfwave");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "Rennie Crown logged-in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("log in").click();
      cy.get("#username").type("surfwave");
      cy.get("#password").type("xixihaha");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.contains("new note").click();
        cy.get("input").type("another note cypress");
        cy.contains("save").click();
      });

      it("it can be made important", function () {
        cy.contains("another note cypress").contains("make important").click();
        cy.contains("another note cypress").contains("make not important");
      });
    });
  });
});
