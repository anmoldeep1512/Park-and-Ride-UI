import React, {  useState } from 'react'
import { Wrapper } from './Register.styles'
import {
    Button,
    Form,
    Grid,
    Icon,
    Message,
    Modal
} from 'semantic-ui-react'
import { Title } from './Register.styles'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar'

const Register = () => {
    const history = useHistory();
    const [success, setSuccess] = useState(false);
    const [users, setUsers] = useState([]);
    const [parkingOwners, setParkingOwners] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [alreadyTaken, setAlreadyTaken] = useState("");
    const [selectedParking, setSelectedParking] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [parkingError, setParkingError] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [successErrorModalOpen, setSuccessErrorModalOpen] = useState(false);
    const [error, setError] = useState("");


    const handleFirstNameChange = (event, { value }) => {
        if ((/^[a-zA-Z]+$/.test(value) || value === '') && value.length < 25) {
            setFirstName(value);
            if (firstNameError)
                setFirstNameError(false);
        }
    }

    const handleLastNameChange = (event, { value }) => {
        if ((/^[a-zA-Z]+$/.test(value) || value === '') && value.length < 25) {
            setLastName(value);
            if (lastNameError)
                setLastNameError(false);
        }
    }

    const handlePhoneChange = (event, { value }) => {
        if ((/^[0-9]+$/.test(value) || value === '') && value.length < 11 && value !== "0") {
            setPhone(value);
            if (phoneError)
                setPhoneError(false);
        }
    }

    const handleUserNameChange = (event, { value }) => {
        if ((/^[a-zA-Z0-9]+$/.test(value) || value === '') && value.length < 25) {
            setUserName(value);
            if (userNameError)
                setUserNameError(false);
        }
    }

    const handlePasswordChange = (event, { value }) => {
        if (( /^[ A-Za-z0-9_@./#&+-]*$/.test(value) || value === '') && value.length < 25) {
            setPassword(value);
            if (passwordError)
                setPasswordError(false);
        }
    }

  

    const onClickHandler = () => {

        if (firstName.length < 3)
            setFirstNameError(true);
        else if (lastName.length < 3)
            setLastNameError(true);
        else if (phone.length < 10)
            setPhoneError(true);
        else if (userName.length < 5)
            setUserNameError(true);
        else if (password.length < 5)
            setPasswordError(true);
        else {
            if (users.some((user) => user.userName.toLowerCase() === userName.toLowerCase()) ||
                parkingOwners.some((parkingOwner) => parkingOwner.userName.toLowerCase() === userName.toLowerCase())) {
                setAlreadyTaken("Username");
                setSuccessErrorModalOpen(true);
            } else if (users.some((user) => user.phone === phone) ||
                parkingOwners.some((parkingOwner) => parkingOwner.phone === phone)) {
                setAlreadyTaken("Phone")
                setSuccessErrorModalOpen(true);
            } else {
                setModalOpen(true);
            }
            setModalOpen(true);
        }
         
    }

    const modalOKButtonHandler = async () => {

       

        
            try {

                axios.post("https://parkride-user-service-urtjok3rza-wl.a.run.app/api/auth/signup",
                { fullName: `${firstName} ${lastName}`,
                parkingFloorId:1,
                username: userName,
                password: password,
                phoneNumber: phone }
            ).then((response) => {
             
                localStorage.setItem("userToken", response.data.jwt);
                window.location.href = "/login";
            }).catch(err => {
                console.log(err);
            });
                // await createUser(createPerson);
                setCreateLoading(false);
            } catch (err) {
                setError(err);
            }
    
        setModalOpen(false);
        setSuccessErrorModalOpen(true);
        setFirstName('');
        setLastName('');
        setPhone('');
        setUserName('');
        setPassword('');
        setSelectedParking('');
        setSuccess(true);
        setChecked(false);
        setAlreadyTaken("");
        setTimeout(() => {
            history.push("/login");
            setSuccess(false);
        }, 3000);
    }

    return (
        <>
           
            <Grid stackable centered>
                <Grid.Column width="11">
                    
                </Grid.Column>
                <Grid.Column width="11">
                    <Wrapper >
                    <Title>Create your account</Title>
                    <br></br>
                        <Modal
                            dimmer="blurring"
                            open={successErrorModalOpen}
                            onClose={() => setSuccessErrorModalOpen(false)}
                        >
                            <Modal.Content>
                                <Message negative={!success} positive={success} header={
                                    success ? "Your account created successfully. You'll be redirect to login page in 3 seconds."
                                        : alreadyTaken === "Username" ? "This Username is already in use"
                                            : alreadyTaken === "Phone" ? "This Phone is already in use"
                                                : null
                                } />
                            </Modal.Content>
                            <Modal.Actions>
                                {alreadyTaken === "Username" || alreadyTaken === "Phone" ?
                                    <Button negative onClick={() => setSuccessErrorModalOpen(false)}>
                                        OK!
                                </Button>
                                    : null
                                }
                            </Modal.Actions>
                        </Modal>

                            
                                    <>
                                        <Form size="big">
                                            <Form.Group widths="equal">
                                                <Form.Input
                                                    onChange={handleFirstNameChange}
                                                    value={firstName}
                                                    required
                                                    fluid
                                                    label="First name"
                                                    placeholder="First name (between 2-24 letter)"
                                                    error={firstNameError}
                                                />
                                                <Form.Input
                                                    onChange={handleLastNameChange}
                                                    value={lastName}
                                                    required
                                                    fluid
                                                    label="Last name"
                                                    placeholder="Last name (between 2-24 letter)"
                                                    error={lastNameError}
                                                />
                                            </Form.Group>
                                            <Form.Input
                                                onChange={handlePhoneChange}
                                                value={phone}
                                                required
                                                label="Phone"
                                                placeholder="Phone (Length should be 10)"
                                                error={phoneError}
                                            />
                                            <Form.Input
                                                onChange={handleUserNameChange}
                                                value={userName}
                                                required
                                                label="Username"
                                                placeholder="Username (between 5-24 letter)"
                                                error={userNameError}
                                            />
                                            <Form.Input
                                                onChange={handlePasswordChange}
                                                value={password}
                                                required
                                                label="Password"
                                                placeholder="Password (between 5-24 letter)"
                                                type="password"
                                                error={passwordError}
                                            />

                                            <PasswordStrengthBar password={password} />
                                    

                                            <Button
                                                loading={createLoading}
                                                animated
                                                fluid
                                                secondary
                                                disabled={firstNameError || lastNameError || phoneError || userNameError || passwordError || parkingError ? true : false}
                                                onClick={onClickHandler}
                                            >
                                                <Button.Content visible>
                                                    Sign up
                                </Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name="signup" />
                                                </Button.Content>
                                            </Button>
                                        </Form>
                                        <Modal
                                            dimmer="blurring"
                                            open={modalOpen}
                                            onClose={() => setModalOpen(true)}
                                        >
                                            <Modal.Header>Are you sure the information is correct?</Modal.Header>
                                            <Modal.Content>
                                                <h3>
                                                    First name: <i style={{ color: "red" }}>{firstName}</i><br />
                                            Last name: <i style={{ color: "red" }}>{lastName}</i><br />
                                            Phone: <i style={{ color: "red" }}>{phone}</i><br />
                                            Username: <i style={{ color: "red" }}>{userName}</i><br />

                                                </h3>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button negative onClick={() => setModalOpen(false)}>
                                                    Nope, something wrong!
                                    </Button>
                                                <Button positive onClick={modalOKButtonHandler}>
                                                    All fine.
                                    </Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </>
                        
                        {
                            !error ?
                                <Message warning>
                                    <Icon name='user' />
                            Already have an account?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
                        </Message>
                                :
                                null
                        }
                    </Wrapper>
                </Grid.Column>
            </Grid>
        </>
    )
}

export default Register
