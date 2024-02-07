# frontend-openai-testing
Small playground to test calls to OpenAI from JavaScript Frontend

## Why?
- OpenAI playground itself is bit limited. For example you can't call image related requests from it
- OpenAI Playground can't be extended with custom things
- Doing it just from frontend minimizes things one needs to do this. You just need a browser and text editor to modify and use this, not need to install and run anything else
- I use this to experiment on top by forking this repo 

## How to use
Its hosted using github pages here
https://wonderwhy-er.github.io/frontend-openai-testing/

Follow the link and all steps of using it are explained there.

## Validation of function call responses
In case of function call requests, responses will be validated using https://github.com/ajv-validator/ajv

It will just take parameters schema from your call, compile it with ajv, and then validate and show you errors