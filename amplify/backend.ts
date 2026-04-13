import { defineBackend } from '@aws-amplify/backend';
import { auth, postConfirmation } from './auth/resource';
import { data } from './data/resource';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  postConfirmation,
});

backend.postConfirmation.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["cognito-idp:AdminAddUserToGroup"],
    resources: [backend.auth.resources.userPool.userPoolArn],
  })
);
