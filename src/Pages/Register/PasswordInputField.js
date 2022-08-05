import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function PasswordInputField({handlePasswordChange, passwordValue, passwordStrength}){
     
       
    return(
        <div className="form-group">
        <label><strong>Password</strong> <label style={{color: 'red'}}>*</label></label>

        <input type="password" onChange={handlePasswordChange} required onInput={passwordStrength} value={passwordValue} name="password" placeholder="Password" className="form-control" />
        </div>
    )
}
export default PasswordInputField;