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
                            <input class="form-control" type="text" placeholder="User Name"></input><br>
                            <input class="form-control" type="password" placeholder="Password"></input>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary btn-block" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
