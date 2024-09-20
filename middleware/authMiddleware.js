// middleware/authMiddleware.js
import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';


// JWT middleware to validate tokens
export const checkJwt = expressjwt({
  // Provide a function to retrieve the signing key
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: process.env.AUTH0_AUDIENCE, // Your Auth0 API identifier
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});
