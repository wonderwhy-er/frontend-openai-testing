import {chatCompletion} from "./openaiAPI.js";

let output;
export function init(runCallback) {
    const keyInput = document.getElementById('OPENAI_API_KEY');
    const runButton = document.getElementById('run');
    const jsonInput = document.getElementById('json');
    output = document.getElementById('output');
    keyInput.oninput = (e) => {
        localStorage.setItem('OPENAI_API_KEY', keyInput.value);
        if(keyInput.value !== '') {
            deleteKey.style.display = 'block';
        } else {
            deleteKey.style.display = 'none';
        }
    };

    const deleteKey = document.getElementById('delete_key');
    deleteKey.onclick = () => {
        keyInput.value = '';
        keyInput.oninput();
    };

    const localKey = localStorage.getItem('OPENAI_API_KEY');
    if (localKey) {
        keyInput.value = localKey;
    } else {
        deleteKey.style.display = 'none';
    }

    jsonInput.oninput = (e) => {
        localStorage.setItem('LAST_JSON', jsonInput.value);
    };

    const savedJSON = localStorage.getItem('LAST_JSON');
    if (savedJSON) {
        jsonInput.value = savedJSON;
    } else {
        jsonInput.value = `{
  "messages": [
    {
      "role": "system",
      "content": "You are JavaScript expert"
    },
    {
      "role": "user",
      "content": "Help user write a hello world in JavaScript and explain how it works"
    }
  ],
  "model": "gpt-3.5-turbo",
  "max_tokens": 2000
}`;
    }

    runButton.onclick = async () => {
        const url = "https://api.openai.com/v1/chat/completions";

        log('Sending chat completion');
        log('⌛️ Loading...');
        try {
            let jsonToSend = JSON.parse(jsonInput.value);
            let runData = await chatCompletion(jsonToSend, keyInput.value);

            log('Got result', runData);
            if (jsonToSend.functions && JSON.stringify(runData).indexOf('function_call') > -1) {
                // function call was sent and returned
                const functionCall = runData.choices[0].message.function_call;
                log(functionCall.name, JSON.parse(functionCall.arguments));
            }
            runCallback(runData);
        } catch (error) {
            log('Error:', error);
        }
    }
}

let logArray = [];
export function log(...rest) {
    logArray.push(rest);
    output.innerHTML = '<hr/>' + logArray.map(line => {
        let objectLog = '';
        if(line[1] instanceof Error) {
            objectLog = line[1].toString();
        } else {
            objectLog = (line[1] ? `<pre>
  <code class="language-json">${JSON.stringify(line[1], null, 4)}</code>
</pre>` : '');
        }
        return `<h3>${line[0]}</h3>` + objectLog + '<hr/>';
    }).join('');
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
        hljs.highlightBlock(block);
    });
    console.log(rest);
}
