/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
export default (app) => {
  // Your code here
  app.log.info('🎉 Yay, the app was loaded! 🎉');

  app.on('issues.opened', async (context) => {
    const issueComment = context.issue({
      body: '👋 Thanks for opening this issue! 🙌 🎉 🚀',
    });
    return context.octokit.issues.createComment(issueComment);
  });

  // Handler function
  async function handleEvent(event) {
    // The event payload from Lambda needs to be converted to a format that Probot expects
    const githubEvent = {
      id: event.headers['X-GitHub-Delivery'],
      name: event.headers['X-GitHub-Event'],
      payload: JSON.parse(event.body),
    };

    // Let Probot process the event
    await app.receive(githubEvent);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Executed' }),
    };
  }
  exports.handler = handleEvent;
  return {
    handleEvent,
  };
};

// For more information on building apps:
// https://probot.github.io/docs/

// To get your app running against GitHub, see:
// https://probot.github.io/docs/development/
