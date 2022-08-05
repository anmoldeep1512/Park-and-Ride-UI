import { blue } from '@mui/material/colors';
import React, { useContext, useState } from 'react'
import { Button, Card, Divider, Header, Icon, Modal } from 'semantic-ui-react'
import SessionContext from '../../../contexts/SessionContext';
import { deleteUserById } from '../../../Service/api';
import DateFormatter from '../../DateFormatter/DateFormatter';
import { WordBreaker } from '../../WelcomeCard/Welcome.styles';


const UserInfoCard = ({ users }) => {
    const { user } = useContext(SessionContext);
   
    const [modalOpen, setModalOpen] = useState(false);

    const deleteUserClickHandler = async (event, { id }) => {
      
      
      
  
      try {
  
          await deleteUserById(id)
          window.location.reload();
        }
    
       catch (error) {
      }
      
  }
  

    return (
        <>

        <div className="userInfo"  style={{ 
            'display': 'flex',
            'flex-direction':'column',
            'padding': '1%'}}>
            <Card className='userInfoCard' style={{
                'background-color':'#edf3f3fd', 
                'box-shadow': '-7px -6px 16px 0px rgba(65, 62, 62, 0.78)',
                '-webkit-box-shadow': '-7px -6px 16px 0px rgba(99, 94, 94, 0.78)',
                '-moz-box-shadow': '-7px -6px 16px 0px rgba(102, 96, 96, 0.78)',
                'color': 'brown'}}>
                <Card.Content >
                    <Card.Header textAlign="center">{users.username}</Card.Header>
                    <Divider />
                
                    <Card.Description textAlign="center">
                       <WordBreaker> Full Name </WordBreaker> {users.fullName} 
                    </Card.Description>
                    <Card.Description textAlign="center">
                      <WordBreaker> Phone Number </WordBreaker> {users.phoneNumber}
                    </Card.Description>
                    <Card.Description textAlign="center">
                        <WordBreaker> Registration Date </WordBreaker> <DateFormatter date= {new Date(users.registrationDate)}  />
                    </Card.Description>
                   
                </Card.Content>
                <Card.Content>

                <div className="button-container">
                    <Button
                        animated="fade"
                        basic
                        color='red'
                        onClick={() => setModalOpen(true)}
                    >
                        <Button.Content visible>Delete User</Button.Content>
                        <Button.Content hidden><Icon name="trash alternate" /></Button.Content>
                    </Button>
                    </div>
                    </Card.Content>
                
            </Card>
            </div>
            
            <Modal
      basic
      dimmer="blurring"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
<Header icon><Icon name="user" /> Delete this User?</Header>
<Modal.Actions>
    <Button negative onClick={() => setModalOpen(false)}>
        No
      </Button>
    <Button id={users.id} positive onClick={deleteUserClickHandler} >
        Yes
    </Button>
</Modal.Actions>
</Modal>

        </>
    )
}

export default UserInfoCard
