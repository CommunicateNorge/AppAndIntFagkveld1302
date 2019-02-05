using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TweetCheckerWorkflow.Model;

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
                message =  await context.WaitForExternalEvent<Message>("ManualReviewCompleted");
            }else
            {
                message.Status = Status.Approved;
                message.ApprovedBy = "robot";
            }

            if(message.Status == Status.Approved)
            {
                message = await context.CallActivityAsync<Message>("PublishTweet", message);
            }

           return await context.CallActivityAsync<Message>("ArchiveTweet", message);
        }

        [FunctionName("AssessRisk")]
        public static Message AssessRisk([ActivityTrigger] Message message, ILogger log)
        {
            //Asses risk based on properties in the message and popluate message.RiskLevel with risk from 0-10. 10 being most risk. 
            message.RiskLevel = 10.0;
            return message; 
        }


        [FunctionName("ArchiveTweet")]
        public static Message ArchiveTweet([ActivityTrigger] Message message, ILogger log)
        {
            //Add message to ftp-server 
            message.Status = Status.SentToArchive;
            return message;
        }


        [FunctionName("PublishTweet")]
        public static Message PublishTweet([ActivityTrigger] Message message, ILogger log)
        {
            //Post message to twittter
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

            var message = JsonConvert.DeserializeObject<Message>(await req.Content.ReadAsStringAsync());

            string instanceId = await starter.StartNewAsync("function", message);

            log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

            return starter.CreateCheckStatusResponse(req, instanceId);
        }
    }
}