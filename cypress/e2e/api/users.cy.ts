import { ReqresClient } from '../../support/api/reqres.client';

describe('API - ReqRes Users', () => {
  const api = new ReqresClient();

  beforeEach(function () {
    if (!Cypress.env('reqresApiKey')) this.skip();
  });

  it('lists users for page 2 @smoke', () => {
    api.getUsers(2).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
    });
  });

  it('gets single existing user', () => {
    api.getUser(2).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.nested.property('data.id', 2);
    });
  });

  it('returns 404 for unknown user', () => {
    api.getUser(23).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('creates new user', () => {
    api.createUser('morpheus', 'leader').then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include({ name: 'morpheus', job: 'leader' });
    });
  });

  it('updates user via put', () => {
    api.updateUser(2, 'morpheus', 'zion resident').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include({ name: 'morpheus' });
    });
  });
});
