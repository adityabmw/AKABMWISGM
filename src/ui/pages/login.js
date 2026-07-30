import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import sessionManager from "../../core/session/session.manager.js";

class LoginPage {
  init() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const btn = document.getElementById("btnLogin");

      if (!email || !password) {
        alert("Email dan Password wajib diisi, Pak Bos!");
        return;
      }

      try {
        if (btn) {
          btn.disabled = true;
          btn.innerText = "AUTHENTICATING...";
        }

        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        sessionManager.createSession({
          uid: user.uid,
          email: user.email,
          loginAt: new Date().toISOString()
        });

        window.location.href = "/";
      } catch (error) {
        alert("Akses Ditolak: " + error.message);
        if (btn) {
          btn.disabled = false;
          btn.innerText = "LOGIN";
        }
      }
    });
  }
}

export default new LoginPage();
