import React, { useContext } from 'react'
import { Container, Divider, Grid, Icon,Button,Card,Image } from 'semantic-ui-react'
 
import DateFormatter from '../DateFormatter/DateFormatter'
import { getUserByUsername } from '../../Service/api'
import { Link,useHistory } from 'react-router-dom'

import { AuthContext } from '../../App'
import { Log } from '../Cards/LogCard/Logs.styles'
import SessionContext from '../../contexts/SessionContext'
// import Button from 'react-scroll/modules/components/Button'



const WelcomeCard = () => {
  const { state,dispatch } = React.useContext(AuthContext);
  let history = useHistory();
  const currUser = JSON.parse(localStorage.getItem('user'))




  const logoutHandler = () => {
    dispatch({
      type: "LOGOUT"
    })
    history.push("/")
  }
  
         return( 
        <>
        <Card.Group>
        {!currUser.roleName?
            <Card>
              <Card.Content textAlign="center">
                <Card.Header textAlign="center"style={{fontSize:"1.5rem"}}><strong>Welcome User</strong></Card.Header>
                <Divider/>
               
                  <Card.Description style={{fontSize:"1rem"}}>Name:
                    <Log> {state.user.fullName}</Log>
                  </Card.Description>
                  <Divider/>
                  <Card.Description style={{fontSize:"1rem"}}>
                    Phone: <Log>{state.user.phoneNumber}</Log>
                  </Card.Description>
                  <Divider/>
                  <Card.Description style={{fontSize:"1rem"}}>
                    RegistrationDate: <DateFormatter date={new Date(state.user.registrationDate)}></DateFormatter>
                  </Card.Description>
              </Card.Content>
              <Card.Content extra>

                <div className='ui two buttons'>
                  <Button danger color='black' onClick={logoutHandler}  >
                    LOGOUT
                  </Button>
                </div>
              </Card.Content>
              
            </Card>
            :
            <Card>
              <Card.Content textAlign="center">
              <Card.Header textAlign="center"style={{fontSize:"1.5rem"}}><strong>Welcome User</strong></Card.Header>
                <Divider/>
               
                  <Card.Description style={{fontSize:"1rem"}}>Name:
                    <Log> {state.user.fullName}</Log>
                  </Card.Description>
                </Card.Content>
                  <Divider/>
                  <Card.Content extra>

                <div className='ui two buttons'>
                  <Button danger color='black' onClick={logoutHandler}  >
                    LOGOUT
                  </Button>
                </div>
              </Card.Content>
              

              
            </Card>}
            
          
          </Card.Group>
          </>
         )
    
}

export default WelcomeCard
