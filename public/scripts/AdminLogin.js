const LoginForm = document.getElementById('loginForm');

localStorage.setItem('userID', '');
localStorage.setItem('isLoggedIn', false);

LoginForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	await fetch('/admin/admin-login', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({email,password})
	})
	.then(response => response.json())
	.then(data => {
		if(data.success){
			localStorage.setItem('userID', data.userID);
			adminAuthentication()
			.then((isAdmin)=>{
				if(isAdmin){
					LoginForm.reset();
					window.location.href = '/admin/products';
				}
			})
			
		}
		else{
            console.log(`(AdminLogin.js) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`(AdminLogin.js) : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`(AdminLogin.js) : ${error}`);
    });

});