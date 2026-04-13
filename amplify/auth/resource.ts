import { defineAuth, defineFunction } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
*/

export const postConfirmation = defineFunction({
  entry: "./post-confirmation/handler.ts",
});

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    givenName: {
      required: true,
      mutable: true,
    },
  },
  groups: ["admin", "agent"],
  triggers: {
    postConfirmation
  }
});