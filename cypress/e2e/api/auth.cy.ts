import { ReqresClient } from '../../support/api/reqres.client';

describe('API - ReqRes Auth and Mutations', () => {
  const api = new ReqresClient();
  const hasReqresKey = Boolean(Cypress.env('reqresApiKey'));

  it('patches user job', () => {
    api.patchUser(2, 'architect').then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(200);
        expect(response.body).to.include({ job: 'architect' });
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });

  it('deletes user', () => {
    api.deleteUser(2).then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(204);
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });

  it('logs in with valid credentials @smoke', () => {
    api.login('eve.holt@reqres.in', 'cityslicka').then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });

  it('fails login without password', () => {
    api.login('peter@klaven', '').then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });

  it('fails register without password', () => {
    api.register('sydney@fife').then((response) => {
      if (hasReqresKey) {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });
});
