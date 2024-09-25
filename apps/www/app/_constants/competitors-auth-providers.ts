export enum CompetitorsAuthProviders {
  None = 'none',
  Auth0 = 'auth0',
  Firebase = 'firebase',
  AWSCognito = 'aws-cognito',
  AzureAD = 'azure-ad',
  Clerk = 'clerk',
  Kinde = 'kinde',
  Frontegg = 'frontegg',
  NextAuth = 'next-auth',
  Other = 'other',
}

export const competitorsAuthProvidersMapper = {
  [CompetitorsAuthProviders.None]: {
    label: 'I have no provider',
  },
  [CompetitorsAuthProviders.Auth0]: {
    label: 'Auth0',
  },
  [CompetitorsAuthProviders.Firebase]: {
    label: 'Firebase',
  },
  [CompetitorsAuthProviders.AWSCognito]: {
    label: 'AWS Cognito',
  },
  [CompetitorsAuthProviders.AzureAD]: {
    label: 'Azure AD',
  },
  [CompetitorsAuthProviders.Clerk]: {
    label: 'Clerk',
  },
  [CompetitorsAuthProviders.Kinde]: {
    label: 'Kinde',
  },
  [CompetitorsAuthProviders.Frontegg]: {
    label: 'Frontegg',
  },
  [CompetitorsAuthProviders.NextAuth]: {
    label: 'NextAuth',
  },
  [CompetitorsAuthProviders.Other]: {
    label: 'Other',
  },
};
