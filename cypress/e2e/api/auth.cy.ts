import { ReqresClient } from '../../support/api/reqres.client';

describe('API - ReqRes Auth and Mutations', () => {
  const api = new ReqresClient();

  beforeEach(function () {
    if (!Cypress.env('reqresApiKey')) this.skip();
  });

  it('patches user job', () => {
    api.patchUser(2, 'architect').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include({ job: 'architect' });
    });
  });

  it('deletes user', () => {
    api.deleteUser(2).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('logs in with valid credentials @smoke', () => {
    api.login('eve.holt@reqres.in', 'cityslicka').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('fails login without password', () => {
    api.login('peter@klaven', '').then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('fails register without password', () => {
    api.register('sydney@fife').then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });
});
