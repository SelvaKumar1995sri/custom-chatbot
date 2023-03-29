class ChatBox {
    constructor()
        this.args = {
            openButton: document.querySelector(selectors:'.chatbox__button'),
            charBox: document.querySelector(selectors:'.chatbox__support'),
            sendButton: document.querySelector(selectors:'.send__button'),

        }   

        this.state = false;
        this.messages = [];

}

display() {
    const {openButton, ChatBox, sendButton} = this.args;
    openButton.addEventListener(type: 'click', listener: () => this.togglestate(ChatBox))
    sendButton.addEventListener(type: 'click', listener: () => this.onSendButton(ChatBox))

    const node = ChatBox.q(selectors: 'input');
    node.addEventListener(type: 'keyup', listener: ({key:string})=> {
        if(key=== 'Enter') {
            this.onSendButton(ChatBox)
        }
    })

}

togglestate(chatbox) {
    this.state = !this.state

    if (this.state) {
        chatbox.classList.add('chatbox--activate')
    }else {
        chatbox.classList.remove(tokens: 'chatbox--activate')

    }
}

onSendButton(chatbox) {
    var textField = chatbox.querySelector('input');
    let text1 = textField.value
    if (text1==="") {
        return;
    }
    let msg1 = {name: "User", message: test1}
    this.messages.push(msg1)
    //https//127.0.0.1:5000/predict
    fetch(input:$SCRIPT_ROOT + '/predict', init:{
        method: 'POST',
        body: JSON.stringify(value:{message:text1}),
        mode:'cors',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    .then(r=> r.json())
    .then(r=> {
        let msg2 = {name: 'Sam', message: r.answer};
        this.messages.push(msg2);
        this.updateChateText(chatbox)
        textField.value = ''
    }).catch((error() => {
        console.error('Error',error);
        this.updateChateText(chatbox)
        textField.value = ''
    }));

}
updateChateText(chatbox) {
    var html = '';
    this.messages.slice().reverse().forEach(function(item,index :number) {
        if (item.name === "Sam")
        {
            html += '<div class="message__item message__item--visitor">' +item.message + '</div>'
        }
        else
        {
            html += '<div class="message__item message__item--operator">' +item.message + '</div>'

        }
    })
    const chatmessage = chatbox.querySelector('.chatbox__message');
    chatmessage.innerHTML = html;
}


const chatbox = new ChatBox():
chatbox.display()