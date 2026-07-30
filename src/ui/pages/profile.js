import sessionManager from "../../core/session/session.manager.js";

class ProfilePage {
  init() {
    const session = sessionManager.getCurrentSession();
    console.log("UserProfile Initialized for:", session?.email || "Guest");
  }
}

export default new ProfilePage();
