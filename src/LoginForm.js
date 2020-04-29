import React        from 'react';
import InputField   from './InputField';
import SubmitButton from './SubmitButton';
import UserStore    from './stores/UserStore';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }
    setInputValue(property, val) {
      val = val.trim();
      if (val.length > 12) {
          return;
      }
      this.setState({
          [property]: val
      })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }
  render() {
 return (
     <div className="loginForm">
        Login Form
     </div>
 )
  }
}
export default LoginForm;