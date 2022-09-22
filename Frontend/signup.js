const signbtn = document.getElementById('signbtn')

signbtn.addEventListener('click', (e) => {

    e.preventDefault();

    const name = document.getElementById('nameid').value
    const email = document.getElementById('emailid').value
    const phoneNumber = document.getElementById('phoneid').value
    const password = document.getElementById('passid').value

    const signup ={
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: password
    }

    axios.post("http://localhost:9000/signup/signup", signup)
        
      .then(response => {
         // console.log(response)
         alert('Signed Up Successfully');
         window.location = 'login.html'
      })
      .catch(err => {
         // alert(err)
         console.log("something went wrong")
      })
})