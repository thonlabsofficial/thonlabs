import ServerSessionService from './server-session-service';

const ServerAuthProvider = {
  getSession() {
    return ServerSessionService.getSession();
  },
};

export default ServerAuthProvider;
