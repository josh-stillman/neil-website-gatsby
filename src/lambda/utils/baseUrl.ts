export const reactGetBaseUrl = () =>
  process.env.GATSBY_CONTEXT === 'deploy-preview'
    ? process.env.GATSBY_DEPLOY_URL
    : process.env.GATSBY_URL;
