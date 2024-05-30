import { Probot } from 'probot';
import nock from 'nock';
import { setupProbotApp } from '../index.js';

describe('index.js', () => {
  let probot;

  beforeEach(() => {
    nock.disableNetConnect();
    probot = new Probot({
      id: 1234,
      privateKey: 'test',
      secret: 'test',
      githubToken: 'test',
    });

    setupProbotApp(probot);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test('📝creates a comment when an issue is opened', async () => {
    // Mock GitHub API
    nock('https://api.github.com')
      .post('/repos/test/test/issues/1/comments')
      .reply(200, {});

    // Mock 'issues.opened' event
    const event = {
      id: '1234',
      name: 'issues',
      payload: {
        action: 'opened',
        issue: {
          number: 1,
          title: 'Test issue',
          body: 'This is a test issue',
        },
        repository: {
          owner: {
            login: 'test',
          },
          name: 'test',
        },
      },
    };

    await probot.receive(event);

    expect(nock.isDone()).toBe(true);
  });

  test('🚪 creates a comment when an issue is closed', async () => {
    // Mock GitHub API
    nock('https://api.github.com')
      .post('/repos/test/test/issues/1/comments')
      .reply(200, {});

    // Mock 'issues.closed' event
    const event = {
      id: '1234',
      name: 'issues',
      payload: {
        action: 'closed',
        issue: {
          number: 1,
          title: 'Test issue',
          body: 'This is a test issue',
        },
        repository: {
          owner: {
            login: 'test',
          },
          name: 'test',
        },
      },
    };

    await probot.receive(event);

    expect(nock.isDone()).toBe(true);
  });

  test('📝 creates a comment when a pull request is opened', async () => {
    // Mock GitHub API
    nock('https://api.github.com')
      .post('/repos/test/test/issues/1/comments')
      .reply(200, {});

    // Mock 'pull_request.opened' event
    const event = {
      id: '1234',
      name: 'pull_request',
      payload: {
        action: 'opened',
        pull_request: {
          number: 1,
          title: 'Test pull request',
          body: 'This is a test pull request',
        },
        repository: {
          owner: {
            login: 'test',
          },
          name: 'test',
        },
      },
    };

    await probot.receive(event);

    expect(nock.isDone()).toBe(true);
  });
  test('🚪 creates a comment when a pull request is closed', async () => {
    // Mock GitHub API
    nock('https://api.github.com')
      .post('/repos/test/test/issues/1/comments')
      .reply(200, {});

    // Mock 'pull_request.closed' event
    const event = {
      id: '1234',
      name: 'pull_request',
      payload: {
        action: 'closed',
        pull_request: {
          number: 1,
          title: 'Test pull request',
          body: 'This is a test pull request',
        },
        repository: {
          owner: {
            login: 'test',
          },
          name: 'test',
        },
      },
    };

    await probot.receive(event);

    expect(nock.isDone()).toBe(true);
  });
});
