import { useState } from "react";
import {hasMinLength, isEmail,isEqualToOtherValue,isNotEmpty} from "../util/validation"
import { useActionState } from "react";

export default function Signup() {
  const [data,setData] = useState({
    email:"",
    password:"",
    confirm_password:"",
    first_name:"",
    last_name:"",
    role:"",
    acquisition:"",
  })
  function sinupAction(prevFormState,formData){
    const email=formData.get('email');
    const password = formData.get('password');
    const confirm_password = formData.get('confirm-password');
    const first_name = formData.get('first-name');
    const last_name = formData.get('last-name');
    const role = formData.get('role');
    const acquisitionChannel = formData.getAll('acquisition');
    const terms= formData.get('terms');


    setData(prevData => ({
      ...prevData,
      first_name: first_name
    }));
    let errors = [];
    if(!isEmail(email)){
      errors.push("Invalid Email Address");
    }

    if(!isNotEmpty(password) || !hasMinLength(password,6)){
      errors.push("You must Provide a Password with at least six characters.");
    }

    if(!isEqualToOtherValue(password,confirm_password)){
      errors.push("Password do not match");
    }
    if(!isNotEmpty(first_name) || !isNotEmpty(last_name)){
      errors.push('please provide both fisrt and last name');
    }
    if(!isNotEmpty(role)){
      errors.push("Please select a role");
    }
    if(!terms){
      errors.push("You must agree to the terms and condition");
    }
    if(!acquisitionChannel.length>0){
      errors.push("Please Select at least one acquisitionChannel");
    }
    

    if(errors.length>0){
      return{errors,enteredValues:{
        email,
        password,
        confirm_password,
        first_name,
        last_name,
        role,
        acquisitionChannel,
        terms
      }};
    }

    return {errors:null}
    console.log(data);
  }

  const [formState, formAction] = useActionState(sinupAction,{errors:null});
  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.enteredValues?.email}/>
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredValues?.password}/>
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirm_password}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredValues?.first_name}/>
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredValues?.last_name}/>
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredValues?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.enteredValues?.acquisitionChannel.includes('other')}/>
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" defaultChecked={formState.enteredValues?.terms}/>I
          agree to the terms and conditions
        </label>
      </div>
     
     {formState.errors && <ul className="error">
      {formState.errors.map(error=> <li key={error}>{error}</li>)}
      </ul>}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
