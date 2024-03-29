import nock from 'nock';
import myProbotApp from '../index.js';
import { Probot, ProbotOctokit } from 'probot';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
config();

const issuePayloadPath = path.join(
  __dirname,
  '..',
  'test',
  'fixtures',
  'issues.opened.json',
);
const issuePayload = JSON.parse(fs.readFileSync(issuePayloadPath, 'utf-8'));

const issueCreatedBody = { body: '👋 Thanks for opening this issue! 🙌 🎉 🚀' };

describe('My Probot app', () => {
  let probot;

  beforeEach(() => {
    nock.disableNetConnect();
    probot = new Probot({
      appId: 123,
      privateKey: process.env.PRIVATE_KEY,
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    });
    probot.load(myProbotApp);
  });

  test('🎉 creates a comment when an issue is opened 🚀', async () => {
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test', permissions: { issues: 'write' } });

    nock('https://api.github.com')
      .post('/repos/hiimbex/testing-things/issues/1/comments', (body) => {
        expect(body).toEqual(issueCreatedBody);
        return true;
      })
      .reply(200);

    await probot.receive({ name: 'issues', payload: issuePayload });
    expect(nock.isDone()).toBeTruthy();
  });

  test('❌🚀 handles issue creation failure 🚀❌', async () => {
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test', permissions: { issues: 'write' } });

    nock('https://api.github.com')
      .post('/repos/hiimbex/testing-things/issues/1/comments')
      .reply(500); // Simulate an API failure

    await expect(async () => {
      await probot.receive({ name: 'issues', payload: issuePayload });
    }).rejects.toThrow(Error);

    expect(nock.isDone()).toBeTruthy();
  });

  test('🕵️‍♀️ handles issue not found error 🕵️‍♀️', async () => {
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test', permissions: { issues: 'write' } });

    nock('https://api.github.com')
      .post('/repos/hiimbex/testing-things/issues/1/comments')
      .reply(404); // Simulate a "Not Found" error

    await expect(async () => {
      await probot.receive({ name: 'issues', payload: issuePayload });
    }).rejects.toThrow(Error);

    expect(nock.isDone()).toBeTruthy();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
