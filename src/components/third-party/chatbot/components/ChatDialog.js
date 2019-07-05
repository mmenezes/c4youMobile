import React, { Component } from 'react';
import BotMsg from './BotMsg';
import UserMsg from './UserMsg';
import MsgLoader from './MsgLoader';

class ChatDialog extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {chatMsgs, showLoader} = this.props;

    // CSS classes
    const dialogClasses = [
    "chtBot_mxWdth--100per",
    "chtBot_hght--275px",
    "chtBot_mrgnAll--3per",
    "chtBot_mrgnTp--90px",
    "chtBot_ovrflwY--scroll",
    "chtBot_ovrflwWrap--break"
    ];

    return (
      <div id="dialog" className={dialogClasses.join(' ')}>
        {
        chatMsgs.map((msg, index) => {
        return msg.isBot ?
        <BotMsg msgTxt={msg.msgTxt} timestamp={msg.msgTimestamp} key={index} msgNum={msg.msgNum} linkList={msg.linkList} />
        :
        <UserMsg msgTxt={msg.msgTxt} timestamp={msg.msgTimestamp} key={index} msgNum={msg.msgNum} />
        })
        }
        {
        showLoader ? <MsgLoader /> : ''
        }
      </div>
    );
  }
}

export default ChatDialog;
