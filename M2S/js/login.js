function login(usern,pass){
	  $.ajax({
          type: "GET",
          crossDomain: true,
          url: "http://m2s.es/app/api/connect/login.php",
          data: "user="+usern+"&passmd5="+pass,
          cache:false,
          dataType: 'jsonp',
          beforeSend: function() {
          console.log('Connecting...');
          $('#formsd').css('display','none');
          var sending = '<div id="sending-load"><img src="css/load-login.gif"></div>';
          $('.form').append(sending);
          },
          success: function(result) {
            if(result.mensaje == 'OK'){
             if (localStorage) {
              keyuser = result.key;
              keyuser = keyuser.replace('==','');
              localStorage.setItem("keyuser", keyuser); 
              localStorage.setItem("user", usern);  
              localStorage.setItem("passwd", pass); 
              setInterval(function(){
              window.location.href="index.html";
              },4000);
             }else{
	           alert('This app needs localstorage!')
             };
             console.log('Completed session');
             };
            if(result.mensaje == 'e2'){
              var Android;
              if(Android===undefined){
               errormod('Data not entered');
              }else{
              Android.showDialog('Data not entered');
              }
              if(type == 'login'){
              $('#formsd').css('display','block');
              $('#sending-load').remove();
              }
              console.log('Data not entered');
            }
            if(result.mensaje == 'e3'){
             if(type == 'login'){
             var Android;
              if(Android===undefined){
	            errormod('The username or password are incorrect.');
              }else{
              Android.showDialog('The username or password are incorrect.');
              }
              $('#formsd').css('display','block');
              $('#sending-load').remove();
              $('input[name="user"]').val('');
              $('input[name="pass"]').val('');
              }else{
	              localStorage.removeItem('user');
	              localStorage.removeItem('passwd');
	              window.location.href="login.html"
              }
              console.log('The username or password are incorrect.');
            }
          }   
     })
	}