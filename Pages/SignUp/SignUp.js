function HandleSignUp(){
    // Lay thong tin nguoi dung nhap
    const registerName = document.getElementById('registerName').value;// Name
    const registerUsername = document.getElementById('registerUsername').value;// Username
    const registerEmail = document.getElementById('registerEmail').value;// Email
    const registerPassword = document.getElementById('registerPassword').value;//Password
    const registerRepeatPassword = document.getElementById('registerRepeatPassword').value;//Repeat password

    //Handle Duplicate Email
    if(registerEmail=="admin@admin.com"){// Tim trong database de so sanh
        alert("Email has ben used!");
        document.getElementById('registerEmail').focus();
    }
    //Handle Repeat password
    else if(registerPassword != registerRepeatPassword){
        alert("Password and repeat password must be the same!");
        document.getElementById('registerRepeatPassword').value="";
        document.getElementById('registerRepeatPassword').focus();
    }
    //Handle checkbox
    else if(document.getElementById("registerCheck").checked!=true){
        alert("You must agree to  the term of service to continue!");
        document.getElementById("registerCheck").focus();
    }
    else{
        alert("Sign Up successfully")
        window.location="../Login/Login.html";// Chuyen huong toi login\
    }
}