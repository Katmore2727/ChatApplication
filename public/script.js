document.addEventListener('DOMContentLoaded', function(){
    const socket = io();

    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatOutput = document.getElementById('chat-output');

    sendButton.addEventListener('click', sendMessage);

    socket.on('chat-message', function (data) {
        displayMessage(data);
    });



    function sendMessage (){
        const message = messageInput.value;
        console.log('sendMessage' + message);

        if(message !== ''){
            socket.emit('chat-message', {
                user: 'You',
                message: message,
                server1: 'AI',
                messageAI: serverFunction(message),
            });
            messageInput.value = '';

        }console.log(message);

        displayMessage(data);
    }

    function serverFunction(message){
        const keywords = ['price', 'display', 'os', 'ram', 'camera'];
        const messageWords = message.split(' ');
        console.log(messageWords);
        let ans = '';
        let keywordFound = false;


        for (let i = 0; i < messageWords.length; i++) {
            const keywordIndex = keywords.indexOf(messageWords[i].toLowerCase());

            if (keywordIndex !== -1 && !keywordFound) {
                ans = generateAnswer(keywords[keywordIndex]) + '';
                keywordFound = true;
            }else if (!keywordFound){
                ans += 'Ask a correct question. ';
            }

        }

        return ans.trim();
    }

    function generateAnswer(keyword) {
        console.log('keyword'+keyword);
        switch (keyword) {
            case 'price':
                return 'The price of the product is $100. ';
                break;
            case 'display':
                return 'The display of the product is LED 45 inches. ';
             
            case 'os':
                return 'The operating system of the product is kitkat. ';
        
            case 'ram':
                return 'The RAM of the product is 2GB. ';
        
            case 'camera':
                return 'The camera resolution of the product is 128px. ';
           
            default:
                return 'Ask a correct question. '
        }
    }

    function displayMessage(data){
        const messageElement = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString();
        const datestamp = new Date().toLocaleDateString();
        console.log(data);

        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${data.user}:</strong> ${data.message}
                                    <br>
                                    <strong>${data.server1}:</strong> ${data.messageAI}
                                    <span class="timestamp">${datestamp}</span>
                                    <br>
                                    <span class="timestamp">${timestamp}</span>
                                    
                                    `;

        chatOutput.appendChild(messageElement);
        
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
})