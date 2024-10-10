function showForm(formType) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
  
    if (formType === 'signIn') {
      signInForm.classList.remove('hidden');
      signUpForm.classList.add('hidden');
      signInTab.classList.add('active');
      signUpTab.classList.remove('active');
    } else {
      signInForm.classList.add('hidden');
      signUpForm.classList.remove('hidden');
      signInTab.classList.remove('active');
      signUpTab.classList.add('active');
    }
  }
  