function HandleSignUp(){
    // Lay thong tin nguoi dung nhap
    const registerName = document.getElementById('registerName').value;// Name
    const registerUsername = document.getElementById('registerUsername').value;// Username
    const registerEmail = document.getElementById('registerEmail').value;// Email
    const registerPassword = document.getElementById('registerPassword').value;//Password
    const registerRepeatPassword = document.getElementById('registerRepeatPassword').value;//Repeat password
    const errorMsg= document.getElementById("errorMsg");
    if(registerName=="" || registerUsername=="" || registerEmail=="" || registerPassword=="" || registerRepeatPassword==""){
        errorMsg.innerHTML="";
        errorMsg.innerHTML="You must fill in all the information";
        return false;
    }
    //Handle Duplicate Email
    else if(registerEmail=="admin@admin.com"){// Tim trong database de so sanh
        errorMsg.innerHTML="";
        errorMsg.innerHTML="Email has ben used!";
        document.getElementById('registerEmail').focus();
        return false;
    }
    //Handle Repeat password
    else if(registerPassword != registerRepeatPassword){
        errorMsg.innerHTML="";
        errorMsg.innerHTML="Password and repeat password must be the same!";
        document.getElementById('registerRepeatPassword').value="";
        document.getElementById('registerRepeatPassword').focus();
        return false;
    }
    //Handle checkbox
    else if(document.getElementById("registerCheck").checked!=true){
        errorMsg.innerHTML="";
        errorMsg.innerHTML="You must agree to  the term of service to continue!";
        document.getElementById("registerCheck").focus();
        return false;
    }
    else{
        alert("Sign Up successfully")
        // Update user's infor to database
        //window.location="../Login/Login.html";// Chuyen huong toi login\
        return true;
    }
}