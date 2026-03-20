Cypress.Commands.add("reqresLogin", () => {
  const apiKey = Cypress.env("reqresApiKey");

  return cy.request({
    method: "POST",
    url: "https://reqres.in/api/login",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: {
      email: "eve.holt@reqres.in",
      password: "pistol",
    },
  });
});
