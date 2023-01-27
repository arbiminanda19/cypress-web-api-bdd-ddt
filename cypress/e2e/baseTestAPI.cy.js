import * as env from "./config/env.js";
import * as schema from "./schema/company.js";

describe("API Staging Cicle", () => {
  it("Create Company", () => {
    cy.request({
      method: "POST",
      url: env.baseUrlAPI + "/companies",
      headers: {
        Authorization: env.token,
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
      env.companyId = response.body.newCompany._id;
      env.userId = response.body.user._id;
      expect(response.body).to.be.jsonSchema(schema.jsonSchemaCreateCompany);
    });
  });
  it("Create Team", () => {
    cy.request({
      method: "POST",
      url: env.baseUrlAPI + "/teams?companyId=" + env.companyId,
      headers: {
        Authorization: env.token,
        "Content-Type": "application/json",
      },
      body: {
        name: "teamtuerdf",
        desc: "desccccc",
        type: "team",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      env.teamId = response.body.newTeam._id;
    });
  });
  it("Update Team", () => {
    env.teamName = "teamtuerdf edited";
    cy.request({
      method: "PATCH",
      url: env.baseUrlAPI + "/teams/" + env.teamId,
      headers: {
        Authorization: env.token,
      },
      form: true,
      body: {
        name: env.teamName,
        desc: "desccccc edited",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.currentTeam.name).to.equal(env.teamName);
    });
  });
  it("Upload Profile Image", () => {
    cy.fixture(env.filePath, "binary")
      .then((file) => Cypress.Blob.binaryStringToBlob(file))
      .then((blob) => {
        var formdata = new FormData();
        formdata.append("file", blob, env.filePath);
        formdata.append("type", "image");
        cy.request({
          url: env.baseUrlAPI + "/users/" + env.userId + "/photo",
          method: "POST",
          headers: {
            Authorization: env.token,
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
      url: env.baseUrlAPI + "/companies/" + env.companyId,
      headers: {
        Authorization: env.token,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
