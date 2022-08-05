import React, { Component } from "react";
import Swal from "sweetalert2";
import { Button, Card, Divider, Form, Icon, Message, Modal, Radio } from 'semantic-ui-react'

class Sweetalert extends Component {
    flag=0;
    showAlert = () => {
          
        Swal.fire({
            title: "Success",
            text: "Add vehicle Sucessfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          
    }
    
    render(){
        return(
            <div>
                <Button onClick={this.showAlert} fluid animated secondary color="black" >
        <Button.Content visible >
          Add
        </Button.Content>
        <Button.Content hidden>
          <Icon name="car"/>
        </Button.Content>
     </Button>
            </div>
        )
    }
}

export default Sweetalert