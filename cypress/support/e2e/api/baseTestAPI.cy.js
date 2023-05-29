import * as globalVar from "./config/var.js";
import * as schema from "./schema/company.js";

describe("API Staging Cicle", () => {
  it("Create Company", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("baseUrlAPI") + "/companies/",
      headers: {
        Authorization: globalVar.token,
        "Content-Type": "application/json",
      },
      body: {
        name: "PT maju mundur",
        desc: "lorem ipsum dolor sit amet",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        "message",
        "Successfully create company user"
      );
      globalVar.companyId = response.body.newCompany._id;
      globalVar.userId = response.body.user._id;
      expect(response.body).to.be.jsonSchema(schema.jsonSchemaCreateCompany);
    });
  });
  it("Create Team", () => {
    cy.request({
      method: "POST",
      url:
        Cypress.env("baseUrlAPI") + "/teams?companyId=" + globalVar.companyId,
      headers: {
        Authorization: globalVar.token,
        "Content-Type": "application/json",
      },
      body: {
        name: "teamtuerdf",
        desc: "desccccc",
        type: "team",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      globalVar.teamId = response.body.newTeam._id;
    });
  });
  it("Update Team", () => {
    globalVar.teamName = "teamtuerdf edited";
    cy.request({
      method: "PATCH",
      url: Cypress.env("baseUrlAPI") + "/teams/" + globalVar.teamId,
      headers: {
        Authorization: globalVar.token,
      },
      form: true,
      body: {
        name: globalVar.teamName,
        desc: "desccccc edited",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.currentTeam.name).to.equal(globalVar.teamName);
    });
  });
  it("Upload Profile Image", () => {
    cy.fixture(globalVar.filePath, "binary")
      .then((file) => Cypress.Blob.binaryStringToBlob(file))
      .then((blob) => {
        var formdata = new FormData();
        formdata.append("file", blob, globalVar.filePath);
        formdata.append("type", "image");
        cy.request({
          url:
            Cypress.env("baseUrlAPI") + "/users/" + globalVar.userId + "/photo",
          method: "POST",
          headers: {
            Authorization: globalVar.token,
            "Content-type": "multipart/form-data",
          },
          body: formdata,
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
  });
  it("Delete Company", () => {
    cy.request({
      method: "DELETE",
      url: Cypress.env("baseUrlAPI") + "/companies/" + globalVar.companyId,
      headers: {
        Authorization: globalVar.token,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
