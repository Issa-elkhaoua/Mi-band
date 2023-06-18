import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

signupUsers: any[]=[];
signupObj:any={
  username:'',
  email:'',
  password:''
};
loginObj:any={
  username:'',
  password:''
};

  

  constructor(private router: Router , private authService:AuthService){};
  ngOnInit(): void {
    const localdata = localStorage.getItem('signupUsers')

    if(localdata!=null){
    this.signupUsers= JSON.parse(localdata);}

      
  }
onSignup(){
  this.signupUsers.push(this.signupObj);
  localStorage.setItem('signupUsers',JSON.stringify(this.signupUsers));
  this.signupObj={
    username:'',
    email:'',
    password:''
  }

}
onLogin(){
 
  const isUserExist= this.signupUsers.find(m =>m.email == this.loginObj.email && m.password == this.loginObj.password);
   if(isUserExist == undefined){
    alert('Entrer les information correcte')
 
   } else{
    this.authService.isLoggedIn = true;
    this.router.navigate(['dashbord']);

   }
}








  
  
}