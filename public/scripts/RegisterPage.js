const RegisterForm = document.getElementById('RegisterForm');

RegisterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;

    await fetch('/user/register', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({name,email,password,phone,address})
    })
    .then(response => response.json())
    .then(data => {
		if(data.success){
            RegisterForm.reset();
			window.location.href = '/user/login';
		}
		else{
            console.log(`(RegisterPage.js) : ${JSON.stringify(data)}`);
            if(data.message === 'ERROR'){
                console.error(`(RegisterPage.js) : ${data.error}`);
            }
        }
    })
    .catch(error => {
        console.error(`(RegisterPage.js) : ${error}`);
    });
    
});