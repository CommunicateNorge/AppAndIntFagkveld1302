# Using azure durable functons apis

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
 
 Open \startingpoint\workflow\TweetCheckerWorkflow\TweetCheckerWorkflow.sln in VS. 
 
 Right click project "TweetCheckerWorkflow" and chose "publish" do your newly created function app. 
 
 
 ### Step 3: Create web app service from the azure portal
 
 Go to portal.azure.com and click "create a resource" -> "Web App".
 ![Overview](./resources/webapp.PNG)
 

