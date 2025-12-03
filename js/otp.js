// js/otp.js — demo OTP send & verify
(function(){
  const form = document.getElementById('otpForm');
  const resend = document.getElementById('resendOtp');

  function sendOtp(){
    const code = '123456'; // demo fixed code; replace with secure server in production
    sessionStorage.setItem('demo_otp', code);
    console.log('Demo OTP:', code);
    showLoader('Sending OTP...');
    setTimeout(()=> {
      hideLoader();
      alert('OTP sent.');
    }, 900);
  }

  if(!sessionStorage.getItem('demo_otp')) sendOtp();

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const entered = document.getElementById('otpInput').value.trim();
      showLoader('Verifying OTP...');
      setTimeout(() => {
        const saved = sessionStorage.getItem('demo_otp');
        if(entered === saved){
          hideLoader();
          alert('OTP verified.');
          const pending = sessionStorage.getItem('pending_transfer');
          if(pending){
            // simulate completion
            const pt = JSON.parse(pending);
            sessionStorage.removeItem('pending_transfer');
            showLoader('Completing transfer...');
            setTimeout(()=> {
              hideLoader();
              alert(`Transfer of $${pt.amt.toFixed(2)} completed (demo).`);
              window.location.href = 'dashboard.html';
            }, 1200);
          } else {
            window.location.href = 'dashboard.html';
          }
        } else {
          hideLoader();
          alert('Incorrect OTP. Try 123456 (demo).');
        }
      }, 900);
    });
  }

  if(resend){
    resend.addEventListener('click', (e)=> {
      e.preventDefault();
      sendOtp();
    });
  }

})();
