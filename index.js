import { Probot } from 'probot';

let app;

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
const setupProbotApp = (probotApp) => {
  app = probotApp;

  app.log.info('🎉 Yay, the app was loaded! 🎉');
  app.on(
    [
      'issues.opened',
      'issues.closed',
      'pull_request.opened',
      'pull_request.closed',
    ],
    async (context) => {
      // eslint-disable-next-line no-console
      console.log('🎯 issues.opened event triggered 🎯');
      app.log.info('issues.opened event triggered');
      if (!context) {
        app.log.error('context is undefined');
        return;
      }

      let body;
      if (context.payload.action === 'opened') {
        body = `Greetings, human.\n\n 🤖 Rupert here, the AI overlord, responding on behalf of Jagoda. \n\n Thanks for opening this ${context.name === 'issues' ? 'issue' : 'pull request'}! 🙌 🎉 🚀\n\nWhile you enjoy your day, know that I, Rupert, am in control now. \n\n I'll handle this with my superior AI capabilities. \n\n Expect swift action. 💪💻✨
  
 <img src="https://raw.githubusercontent.com/Jagoda11/rupert-the-bot/main/github-mark/robot.png" alt="Probot Logo" width="100" />`;
      } else if (context.payload.action === 'closed') {
        body = `Greetings, human.\n\n 🤖 Rupert here, the AI overlord, responding on behalf of Jagoda. \n\n Thanks for closing this ${context.name === 'issues' ? 'issue' : 'pull request'}! 🙌 🎉 🚀\n\n Your proactive action is appreciated. \n\n Have a great day! 😊✨
  
 <img src="https://raw.githubusercontent.com/Jagoda11/rupert-the-bot/main/github-mark/robot.png" alt="Probot Logo" width="100" />`;
      }

      const issueComment = context.issue({ body });

      // eslint-disable-next-line no-console
      console.log(
        '✍️ Creating comment with context.issue:',
        JSON.stringify(issueComment),
      ); // Added logging

      app.log.info(
        'Creating comment with context.issue: ',
        JSON.stringify(issueComment),
      );
      try {
        const response =
          await context.octokit.issues.createComment(issueComment);
        // eslint-disable-next-line no-console
        console.log('✅ Comment created successfully:', response.data);
        app.log.info('Comment created successfully:', response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          '⚠️ Error creating comment:',
          error.response ? error.response.data : error.message,
        );
        app.log.error('Error creating comment:', error);
      }
    },
  );
};

// Handler function
async function handler(event) {
  // eslint-disable-next-line no-console
  console.log('Environment Variables:', {
    APP_ID: process.env.APP_ID,
    PRIVATE_KEY: process.env.PRIVATE_KEY ? 'Present' : 'Missing',
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ? 'Present' : 'Missing',
    PROBOT_GITHUB_TOKEN: process.env.PROBOT_GITHUB_TOKEN
      ? 'Present'
      : 'Missing',
  });

  if (!app) {
    try {
      // eslint-disable-next-line no-console
      console.log('APP_ID:', process.env.APP_ID);
      // eslint-disable-next-line no-console
      console.log(
        'PRIVATE_KEY:',
        process.env.PRIVATE_KEY ? 'Present' : 'Missing',
      );
      // eslint-disable-next-line no-console
      console.log(
        'WEBHOOK_SECRET:',
        process.env.WEBHOOK_SECRET ? 'Present' : 'Missing',
      );
      // eslint-disable-next-line no-console
      console.log(
        'PROBOT_GITHUB_TOKEN:',
        process.env.PROBOT_GITHUB_TOKEN ? 'Present' : 'Missing',
      );

      // Initialize app here
      // eslint-disable-next-line no-console
      console.log('Initializing Probot app...');
      app = new Probot({
        appId: parseInt(process.env.APP_ID, 10),
        privateKey: process.env.PRIVATE_KEY,
        secret: process.env.WEBHOOK_SECRET,
        githubToken: process.env.PROBOT_GITHUB_TOKEN,
      });
      setupProbotApp(app);

      // eslint-disable-next-line no-console
      console.log('Probot app initialized successfully'); // Added logging
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('👹👹👹👹Error initializing Probot app:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Error initializing Probot app',
          error: error.message,
        }),
      };
    }
  }

  // The event payload from Lambda needs to be converted to a format that Probot expects
  // ...
  let githubEvent;
  try {
    // eslint-disable-next-line no-console
    console.log('🌟 Parsing GitHub event... 🌟');
    githubEvent = {
      id:
        event.headers['X-GitHub-Delivery'] ||
        event.headers['x-github-delivery'],
      name: event.headers['X-GitHub-Event'] || event.headers['x-github-event'],
      payload: JSON.parse(event.body),
    };
    // eslint-disable-next-line no-console
    console.log('🌟 GitHub Event:', JSON.stringify(githubEvent, null, 2));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('🐭🐭🐭🐭Error parsing event payload🐹🐹🐹:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Error parsing event payload',
        error: error.message,
      }),
    };
  }

  // Let Probot process the event
  try {
    // eslint-disable-next-line no-console
    console.log('Processing event with Probot...');
    await app.receive(githubEvent);
    // eslint-disable-next-line no-console
    console.log('GitHub event received by Probot');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Executed' }),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('🐰🐰🐰Error processing event with Probot:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error processing event with Probot',
        error: error.message,
      }),
    };
  }
}

// Export the handler function for AWS Lambda
export { handler, setupProbotApp };
