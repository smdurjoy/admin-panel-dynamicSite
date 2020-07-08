<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <link rel="stylesheet" href="{{asset('css/style.css')}}">
        <link rel="stylesheet" href="{{asset('css/responsive.css')}}">
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@500;600;700;800&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <div class="row d-flex justify-content-center mt-5">
                <div class="col col-md-6 text-center">
                    <div class="card">
                        <div class="card-header">
                            <h4>Admin Login</h4>
                        </div>
                        <div class="card-body">
                            <input class="form-control" id="userName" type="text" placeholder="User Name"></input><br>
                            <input class="form-control" id="password" type="password" placeholder="Password"></input>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-block" onclick="adminLogin()">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script type="text/javascript">
            function adminLogin() {
                let userName = document.getElementById('userName').value;
                let password = document.getElementById('password').value;

                let xHttp = new XMLHttpRequest();
                xHttp.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        if(this.responseText == "1") {
                            window.location.href = "/"
                        } else {
                            alert('Login Failed !')
                        }
                    }
                }

                xHttp.open("GET", "/onLogin/"+userName+"/"+password, true);
                xHttp.send();
            }
        </script>
    </body>
</html>
