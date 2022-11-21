function HandleLogin(){
    const username = document.getElementById('loginName').value;// email
    const password = document.getElementById('loginPassword').value;// Password
    if(username=="admin@admin.com" && password=="admin"){// kiem tra tu trong database
        alert("Login sucessfully!");
        // chuyen huong toi trang chu
        return true;
    }
    else if(username=="" || password==""){// tai khoan hoac mat khau de trong
        document.getElementById("errorMsg").innerHTML="";
        document.getElementById("errorMsg").innerHTML="You must fill in all the information!";
        return false;
    }
    else{// sai tai khoan hoac mat khau
        document.getElementById("errorMsg").innerHTML="";
        document.getElementById("errorMsg").innerHTML="Invalid Username or password!";
        // clear and refocus
        document.getElementById('loginName').value="";
        document.getElementById('loginPassword').value="";
        document.getElementById('loginName').focus();

        return false;
    }
}