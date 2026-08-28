import { test } from '@testBase';

test('frontend displays backend data', async ({ testBase }) => {
  // Go to the React app
  await testBase.navigation.navigateToHomePage();

  // Wait for the message to change from "Loading..." to the backend message
  await testBase.pages.onHomePage().verifyWelcomeMessage()
});