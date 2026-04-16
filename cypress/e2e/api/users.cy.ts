import { ReqresClient } from '../../support/api/reqres.client';

describe('API - ReqRes Users', () => {
  const api = new ReqresClient();
  const hasReqresKey = Boolean(Cypress.env('reqresApiKey'));

  it('lists users for page 2 @smoke', () => {
    api.getUsers(2).then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });

  it('gets single existing user', () => {
    api.getUser(2).then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.nested.property('data.id', 2);
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });

  it('returns 404 for unknown user', () => {
    api.getUser(23).then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(404);
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });

  it('creates new user', () => {
    api.createUser('morpheus', 'leader').then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(201);
        expect(response.body).to.include({ name: 'morpheus', job: 'leader' });
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });

  it('updates user via put', () => {
    api.updateUser(2, 'morpheus', 'zion resident').then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(200);
        expect(response.body).to.include({ name: 'morpheus' });
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });
});
