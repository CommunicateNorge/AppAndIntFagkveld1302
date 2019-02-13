using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TweetCheckerWorkflow.Model;
using RestSharp;

namespace TweetCheckerWorkflow
{
    public static class function
    {
        [FunctionName("Workflow")]
        public static async Task<Message> RunOrchestrator(
            [OrchestrationTrigger] DurableOrchestrationContext context)
        {

            var message = context.GetInput<Message>();
            var outputs = new List<string>();


            // Replace "hello" with the name of your Durable Activity Function.
            message = await context.CallActivityAsync<Message>("AssessRisk", message);

            if(message.RiskLevel>6)
            {
                context.SetCustomStatus("WaitingForManualReviewCompleted");
                var update =  await context.WaitForExternalEvent<Message>("ManualReviewCompleted");
                message.ApprovedBy = update.ApprovedBy;
                message.Status = update.Status;
                context.SetCustomStatus("ManualReviewCompleted");
            }
            else
            {
                message.Status = Status.Approved;
                message.ApprovedBy = "robot";
            }

            if(message.Status == Status.Approved)
            {
                message = await context.CallActivityAsync<Message>("PublishTweet", message);
                context.SetCustomStatus("PublishedTweet");
            }

            message = await context.CallActivityAsync<Message>("ArchiveTweet", message);
            context.SetCustomStatus("ArchivedTweet");
            return message;
        }

        [FunctionName("AssessRisk")]
        public static Message AssessRisk([ActivityTrigger] Message message, ILogger log)
        {
            //Asses risk based on properties in the message and popluate message.RiskLevel with risk from 0-10. 10 being most risk.
            if(message.Text.ToLower().Contains("donald") || message.Text.ToLower().Contains("trump"))
            {
                message.RiskLevel = 10.0;
            }
            else
            {
                message.RiskLevel = 5.0;
            }

            return message; 
        }


        [FunctionName("ArchiveTweet")]
        public static Message ArchiveTweet([ActivityTrigger] Message message, ILogger log)
        {
            var client = new RestClient("https://cmh-dev-transactionhandler-fa.azurewebsites.net/api/TransactionHandler?code=GxCLHO55vkN7NI/tCa1vlj3RiYbLAcxE89ZdygjlRBtsksRmRnFN2A==&SenderId=tweetchecker&ReceiverID=filingsystem&DocumentType=Tweet&MessageFormat=json&MessageEncoding=utf-8");
            var request = new RestRequest(Method.POST);
            
            request.AddJsonBody(message);

            var response = client.Execute(request);        
            
            if(!response.IsSuccessful)
            {
                throw new System.Exception("Something went wrong..", response.ErrorException);
            }
            
            message.Status = Status.SentToArchive;

            return message;
        }


        [FunctionName("PublishTweet")]
        public static Message PublishTweet([ActivityTrigger] Message message, ILogger log)
        {
            //Post message to twittter

            var twitter = new TwitterApi("WSgc2EQ3sD9qPyH4EvvCrlac0", "izrANW9Um0HLQG9Iuq7O7Tp7cYigkj9lt0gKL3FqfKFBclsjjl", "1095592890007461888-0GsFNhn66HediV8H6UNrleCop0VTuO", "1kEQS69pA359j0C1Do9Lkrj4MEXZLPYeOWDDWWge4Gjhu");
            var response = twitter.Tweet(message.Text).Result;

            message.Status = Status.Published;

            return message; 
        }


        [FunctionName("function_HttpStart")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")]HttpRequestMessage req,
            [OrchestrationClient]DurableOrchestrationClient starter,
            ILogger log)
        {
            // Function input comes from the request content.

            var message =  JsonConvert.DeserializeObject<Message>(await req.Content.ReadAsStringAsync());

            string instanceId = await starter.StartNewAsync("Workflow", message);

            log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

            return starter.CreateCheckStatusResponse(req, instanceId);
        }
    }
}