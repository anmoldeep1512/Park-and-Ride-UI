import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
// import SortIcon from '@material-ui/icons/Sort';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { Link as Scroll } from 'react-scroll';
import "./ContactUs.css";

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      bottomargin:'0px',
  
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
      
    },
  }));
export default function ContactUs()
{   const classes = useStyles();
    return(
        <div className={classes.root}>
        
        <div id="main_contact" class="wow pulse">
            <h3>Get in Touch</h3>
            <div id="contact-form">
                <form method="POST" action="https://formspree.io/f/mvoldbbp">
                    <input type="hidden" name="_subject" value="Contact request from personal website"></input>

                    <input type="email" name="_replyto" placeholder="Your email" required=""></input>
                    <textarea name="message" placeholder="Your message" required=""></textarea>
                    <div class="click">
                    <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
        
      </div>
    );

    }