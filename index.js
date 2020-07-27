const Web3jOpenApi = require('web3j_open_api');
function findExistingContracts(defaultApi) {
    return new Promise((resolve, reject) => {
        defaultApi.findAll2((error, data, response) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}
function deployHelloWorld(helloWorldMethods) {
    return new Promise((resolve, reject) => {
        helloWorldMethods.deploy(
            (error, data, response) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(data.contractAddress)
                }
            }
        );
    });
}
function callHelloMethod(helloWorldMethods, contractAddress) {
    return new Promise((resolve, reject) => {
        helloWorldMethods.hello(
            contractAddress,
            function (error, data, response) {
                if (error) {
                    reject(error)
                } else {
                    resolve(data.result)
                }
            });
    })
}
function sayItMethod(sayItParameters, helloWorldMethods, contractAddress) {
    let opts = {};
    opts['sayItParameters'] = sayItParameters
    return new Promise((resolve, reject) => {
        helloWorldMethods.sayIt(
            contractAddress,
            opts,
            function (error, data, response) {
                if (error) {
                    reject(error)
                } else {
                    resolve(data.transactionHash)
                }
            });
    })
}

async function main() {
    let path = "http://localhost:9091";
    let defaultApi = new Web3jOpenApi.DefaultApi();
    defaultApi.apiClient.basePath = path;
    let existingContracts = await findExistingContracts(defaultApi);
    console.log(`Existing contracts: ${existingContracts}`)
    let helloWorldMethods = new Web3jOpenApi.HelloWorldMethodsApi();
    helloWorldMethods.apiClient.basePath = path;
    let contractAddress = await deployHelloWorld(helloWorldMethods)
    console.log(`Deployed hello world at address: ${contractAddress}`)
    let callMethodResult = await callHelloMethod(helloWorldMethods, contractAddress);
    console.log(`Result of calling hello method: ${callMethodResult}`)
    let sayItParameters = new Web3jOpenApi.SayItParameters();
    sayItParameters.greeting = "Hello Js client";
    let sayItTxHash = await sayItMethod(sayItParameters, helloWorldMethods, contractAddress);
    console.log(`SayIt transaction hash: ${sayItTxHash}`);
}

main().then(() => console.log("Success")).catch(ex => console.log(ex));