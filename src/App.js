import React         from 'react';
import UserStore     from './stores/UserStore';
import { observer }  from 'mobx-react';
import LoginForm     from './LoginForm';
import SubmitButton  from './SubmitButton';
import './App.css';

class App extends React.Component {

  async componentDidMount() {

     try {

        let res = await fetch('/isLoggedIn', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
        }) //close fetch

      let result = await res.json();

      if (result&&result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }

     } //close try
     catch(e) {
       UserStore.loading = false;
       UserStore.isLoggedIn = false;

     } //close catch
  } //close componentDidMount

  async doLogout() {

    try {

       let res = await fetch('/logout', {
           method: 'post',
           headers: {
             'Accept': 'application/json',
             'Content-type': 'application/json'
           }
       }) //close fetch

     let result = await res.json();

     if (result&&result.success) {
       UserStore.isLoggedIn = false;
       UserStore.username = '';
       
     }

     

    } //close try
    catch(e) {
      console.log(e)

    } //close catch
 } //close doLogout

  render() {

    if(UserStore.loading) {
      return( 
         <div className="app">
           <div className="container">
             Loading, please wait...
           </div>
         </div>
      )
    }

    else { //user is actually logged in
      if(UserStore.isLoggedIn) {

        if(UserStore.loading) {
          return( 
             <div className="app">
               <div className="container">
                  Welcome, {UserStore.username}

                  <SubmitButton 
                       text={'Log out'}
                       disabled={false}
                       onClick={ () => this.doLogout() }

                  />
               </div>
             </div>
          )
        }

      }

    
 return (
     <div className="app">
        <div className="container">
          
        <SubmitButton 
                       text={'Log out'}
                       disabled={false}
                       onClick={ () => this.doLogout() }
         />
         
           <LoginForm />
     </div>
    </div>
     );
    } //close else
  }
}
export default observer(App);
