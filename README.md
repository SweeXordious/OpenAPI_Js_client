# OpenAPI_Js_client

#### Get the OpenAPI-generator Jar
Follow the https://github.com/OpenAPITools/openapi-generator to have the Generator Jar.

#### Generate the Javascript client

Use the OpenAPI-generator to create a JavaScript client for the generated project:
```ssh
java -jar <path_to_OpenAPI_Generator_Jar> generate \
	 -i <path_to_OpenAPI_Specs> \
	 -g javascript \
	 -o <output_dir>
```

#### Make the library available to local development

**This part already exists in the generated README in the client directory**

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your web3j_open_api from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### Interact with the client
Write some JS code similar to the what is in `index.js` in this repository.