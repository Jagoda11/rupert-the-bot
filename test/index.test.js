import nock from 'nock';
import myProbotApp from '../index.js';
import { Probot, ProbotOctokit } from 'probot';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, beforeEach, afterEach, test } from 'node:test';
import assert from 'node:assert';
import { config } from 'dotenv';
config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const privateKey = process.env.PRIVATE_KEY;

const issuePayload = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'fixtures/issues.opened.json'), 'utf-8')
);

const issueCreatedBody = { body: '👋 Thanks for opening this issue! 🙌 🎉 🚀' };

describe('My Probot app', () => {
  let probot;

  beforeEach(() => {
    nock.disableNetConnect();
    probot = new Probot({
      appId: 123,
      privateKey,
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    });
    probot.load(myProbotApp);
  });

  test('🎉 creates a comment when an issue is opened 🚀', async () => {
    const mock = nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test', permissions: { issues: 'write' } })
      .post('/repos/hiimbex/testing-things/issues/1/comments', (body) => {
        assert.deepEqual(body, issueCreatedBody);
        return true;
      })
      .reply(200);

    await probot.receive({ name: 'issues', payload: issuePayload });

    assert.deepStrictEqual(mock.pendingMocks(), []);
  });

  test('❌🚀 handles issue creation failure 🚀❌', async () => {
    const issueCreatedBody = {
      body: '👋 Thanks for opening this issue! 🙌 🎉 🚀',
    };

    const mock = nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test', permissions: { issues: 'write' } })
      .post('/repos/hiimbex/testing-things/issues/1/comments', (body) => {
        assert.deepEqual(body, issueCreatedBody);
        return true;
      })
      .reply(500); // Simulate an API failure

    // Declare errorWasThrown variable
    let errorWasThrown = false;

    // Receive a webhook event
    try {
      await probot.receive({ name: 'issues', payload: issuePayload });
    } catch (error) {
      errorWasThrown = true;
    }
    assert.strictEqual(errorWasThrown, true);
    assert.deepStrictEqual(mock.pendingMocks(), []);
  });

  test('🕵️‍♀️ handles issue not found error 🕵️‍♀️', async () => {
    const issueCreatedBody = {
      body: '👋 Thanks for opening this issue! 🙌 🎉 🚀',
    };

    const mock = nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test', permissions: { issues: 'write' } })
      .post('/repos/hiimbex/testing-things/issues/1/comments', (body) => {
        assert.deepEqual(body, issueCreatedBody);
        return true;
      })
      .reply(404); // Simulate an API failure with a "Not Found" error

    // Declare errorWasThrown variable
    let errorWasThrown = false;

    // Receive a webhook event
    try {
      await probot.receive({ name: 'issues', payload: issuePayload });
    } catch (error) {
      errorWasThrown = true;
    }

    assert.strictEqual(errorWasThrown, true);
    assert.deepStrictEqual(mock.pendingMocks(), []);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
