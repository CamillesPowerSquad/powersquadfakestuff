$.ajax({
  method: "POST",
  url: "/login",
  data: {
    email: "flava@flav.io",
    password: "bigclock"
  }
}).then(function(res){
  console.log(res);
});

var logout = function(){
  $.ajax({
    method: "GET",
    url: "/users"
  }).then(function(res){
    console.log(res);
    console.log("crash");
  });
}
