import React, {  useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Form ,Grid,  GridRow, Icon, Message, Modal, Placeholder, Segment } from 'semantic-ui-react'
import { Title, Wrapper } from './Login.styles'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../../App'
import { getUserByUsername } from '../../Service/api'
import Swal from 'sweetalert2'

const Login = () => {

    const { dispatch } = React.useContext(AuthContext);
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [serverError, setServerError] = useState("");
    


    const handleUsernameChange = (event, { value }) => {

        
        if ((/^[a-zA-Z0-9]+$/.test(value) || value === '') && value.length < 25) {
            setUsername(value);
            if (loginError)
                setLoginError(false);
            
        }
    }

    const handlePasswordChange = (event, { value }) => {

       

        if (( /^[ A-Za-z0-9_@./#&+-]*$/.test(value) || value === '') && value.length < 25) {
            setPassword(value);
            if (loginError)
                setLoginError(false);
        }
    }

    const handleSigninOnClick = (event) => {



        event.preventDefault();
  
       

       setLoading(true);
        axios.post("https://parkride-user-service-urtjok3rza-wl.a.run.app/api/auth/signin",
         { username: username, password: password }
        ) .then(res => {
           
            if (res.status==200) {

               
                const init = async () => {
                    try {
        
                        let { data } = await getUserByUsername(res.data.username);
                        
                        const userInfo={
                            user:data,
                            token: res.data.accessToken
                        }
                        dispatch({
                            type: "LOGIN",
                            payload:userInfo
                        })
                        history.push("/dashboard/vehicle")

                    } catch (err) {

                        
                        console.log(err);
                    }
        
                }
                init();
                              
            }

        }).catch(error => {
        
         
            axios.post("https://parkride-admin-service-urtjok3rza-wl.a.run.app/token/generate-token",
        { username: username, password: password }
        ).then((res) => {
       
            if (res.status==200) {

               
                const data={
                    user: res.data,
                    token: res.data.token
                }
                dispatch({
                    type: "LOGIN",
                    payload:data
                })

                history.push("/dashboard/vehicle_request")
            }

    }).catch(err => {


        Swal.fire({
            title: "Bad Credentials, Please try again!",
            type: "success", 
            confirmButtonText: 'Ok'
          }).then((result) => {  if (result.isConfirmed) { window.location="/login"}});
        setServerError(error)
        console.log(err);
});
    });

         
      setLoading(false)
}

    return (
        <>
        
    <div className='loginBody'>
            <Grid stackable centered>
                <Grid.Column width="16">
                   
                </Grid.Column>
                <Grid.Column width="10">
                    <Wrapper >
                        <Segment placeholder>
                        <Title> Park & Ride</Title>
                        <br></br>
                            <Grid rows={2} relaxed='very' stackable >
                                < GridRow verticalAlign='middle' centered>
                                    {!loading && !serverError ?
                                        <Form size="big">
                                            <Form.Input
                                                required
                                                value={username}
                                                icon='user'
                                                iconPosition='left'
                                                label='Username'
                                                placeholder="Username (max 24)"
                                                onChange={handleUsernameChange}
                                            />
                                            <Form.Input
                                                required
                                                value={password}
                                                icon='lock'
                                                iconPosition='left'
                                                label='Password'
                                                type='password'
                                                placeholder="Password (max 24)"
                                                onChange={handlePasswordChange}
                                            />
                                            <Button
                                                secondary
                                                animated
                                                size='big'
                                                onClick={handleSigninOnClick}
                                            >
                                                <Button.Content visible>Sign in</Button.Content>
                                                <Button.Content hidden><Icon name="sign-in" /></Button.Content>
                                            </Button>
                                        </Form>
                                        : !serverError ?
                                            <Placeholder>
                                                <Placeholder.Line />
                                                <Placeholder.Line />
                                                <Placeholder.Line />
                                                <Placeholder.Line />
                                                <Placeholder.Line />
                                            </Placeholder>
                                            :
                                            null
                                    }
                                </GridRow>
                                <GridRow verticalAlign='middle'>
                                    <Button content='Not a User? Sign up' icon='signup' as={Link} to="/register" />
                                </GridRow>
                            </Grid>
                        </Segment>
                    </Wrapper>
                </Grid.Column>
            </Grid>

            <Modal
                dimmer="blurring"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Modal.Header>
                    {loginError ?
                        <Message
                            negative
                            header='Wrong username or password'
                        />
                            : null
                    }</Modal.Header>
                <Modal.Actions>
                    <Button negative onClick={() => setModalOpen(false)}>
                        OK!
                    </Button>
                </Modal.Actions>
            </Modal>
</div>
        </>
    )
}

export default Login