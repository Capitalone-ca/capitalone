// js/auth.js — Firebase auth handlers (compat)
(function(){
  // Elements
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Login
  if(loginForm){
    loginForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      try{
        showLoader('Signing in...');
        await firebase.auth().signInWithEmailAndPassword(email, password);
        hideLoader();
        window.location.href = 'dashboard.html';
      }catch(err){
        hideLoader();
        alert('Sign in error: ' + (err.message || err));
      }
    });
  }

  // Register
  if(registerForm){
    registerForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value;
      try{
        showLoader('Creating account...');
        const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if(userCred.user && name) await userCred.user.updateProfile({displayName: name});
        hideLoader();
        window.location.href = 'dashboard.html';
      }catch(err){
        hideLoader();
        alert('Registration error: ' + (err.message || err));
      }
    });
  }

  // Google sign-in
  window.googleLogin = async function(){
    try{
      showLoader('Signing in with Google...');
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      hideLoader();
      window.location.href = 'dashboard.html';
    }catch(err){
      hideLoader();
      alert('Google sign-in error: ' + (err.message || err));
    }
  };

  // Optional: sign out helper
  window.signOutUser = async function(){
    try{
      await firebase.auth().signOut();
      window.location.href = 'login.html';
    }catch(e){
      console.error(e);
    }
  };

})();
