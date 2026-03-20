describe("ReqRes API Tests", () => {
  const apiKey = Cypress.env("reqresApiKey");

  it("GET users", () => {
    cy.request({
      method: "GET",
      url: "/api/users?page=2",
      headers: {
        "x-api-key": apiKey,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("page");
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");
      expect(response.body.data.length).to.be.greaterThan(0);

      expect(response.body.data[0]).to.have.property("id");
      expect(response.body.data[0]).to.have.property("email");
      expect(response.body.data[0]).to.have.property("first_name");
      expect(response.body.data[0]).to.have.property("last_name");
    });
  });

  it("POST login", () => {
    cy.request({
      method: "POST",
      url: "/api/login",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: {
        email: "eve.holt@reqres.in",
        password: "pistol",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      expect(response.body.token).to.be.a("string");
      expect(response.body.token.length).to.be.greaterThan(0);

      cy.wrap(response.body.token).as("token");
    });
  });

  it("Invalid login", () => {
    cy.request({
      method: "POST",
      url: "/api/login",
      failOnStatusCode: false,
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: {
        email: "eve.holt@reqres.in",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.be.a("string");
    });
  });

  it("Token validation", () => {
    const apiKey = Cypress.env("reqresApiKey");

    cy.reqresLogin().then((loginResponse) => {
      const token = loginResponse.body.token;

      cy.request({
        method: "GET",
        url: "/api/users?page=2",
        headers: {
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(token).to.exist;
      });
    });
  });
});
