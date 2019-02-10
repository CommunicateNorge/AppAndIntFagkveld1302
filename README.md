# Using azure durable functions apis and message hub


## Demo

[Click here to visit live demo](https://tweetcheckerfrontend.azurewebsites.net/)

## Overview 

This sample uses an simple [react single page application](https://reactjs.org/) to interact with a workflow implemented as [azure durable function](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview) and the built in [durable api](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-http-api). 


## How To Run This Sample

To run this sample, you'll need:

- [Visual Studio 2017 with Azure development tools installed ](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-vs)
- An Internet connection
- Azure subscription
- [Node / npm >=6.4.1](https://www.npmjs.com/get-npm)
- [Ftp client e.g WinSCP](https://winscp.net/eng/download.php)

### Step 1:  Clone or download this repository

From your shell or command line:

`https://github.com/CommunicateNorge/AppAndIntFagkveld1302.git`
> Given that the name of the sample is pretty long, and so are the name of the referenced NuGet pacakges, you might want to clone it in a folder close to the root of your hard drive, to avoid file size limitations on Windows.

### Step 2:  Create a azure function app from the azure portal

Go to portal.azure.com and click "create a resource" -> "function app"

![Overview](./resources/functionapp.PNG)

     
 ### Step 3: Deploy workflow from visual studio 
 
 Open /startingpoint/workflow/TweetCheckerWorkflow/TweetCheckerWorkflow.sln in VS. 
 
 Right click project "TweetCheckerWorkflow" and chose "publish" do your newly created function app. 
 
 
 ### Step 4: Create web app service from the azure portal
 
 Go to portal.azure.com and click "create a resource" -> "Web App".
 
 ![Overview](./resources/webapp.PNG)
 

 ### Step 5: Build front end
 
 [Details](https://medium.com/@to_pe/deploying-create-react-app-on-microsoft-azure-c0f6686a4321)
 
 Navigate to 
 
 `cd /startingpoint/frontend/`
 
 Open 
 
  `cd ../src/App.js`

```JavaScript
const REACT_APP_API_URL="<insert function app host  e.g https://myfunctionap.azurewebsites.net/>";
const FUNCTION_APP_KEY = "<insert function app key"
```

Add function app URL and function key from step 3
 
 Install dependencies 
 
  `npm install`
  
  Build for deploy
  
  `npm run-script build`
 
  ### Step 6: Deploy frontend
  
  Go to Deployment Center-> ftp (take note of endpoint and password) from step 4.
  
  Upload all content from \build to site\wwwroot
  
  ### Step 7: Allow front end through cors filter 
  
  Open cors-filter on function app from step 2 and add url for front end web app
  
  
  
  
