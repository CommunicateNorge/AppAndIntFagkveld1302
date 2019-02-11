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

            message = await context.CallActivityAsync<Message>("AssessRisk", message);

            if(message.RiskLevel>6)
            {
                context.SetCustomStatus("WaitingForManualReviewCompleted");
                /*
                 * Wait for external event :  "ManualReviewCompleted"
                 */
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
        public static Message AssessRisk(Message message, ILogger log)
        {
            //Asses risk based on properties in the message and popluate message.RiskLevel with risk from 0-10. 10 being most risk. 
            message.RiskLevel = 10.0;
            return message; 
        }


        [FunctionName("ArchiveTweet")]
        public static Message ArchiveTweet( Message message, ILogger log)
        {
            //Add message to ftp-server 
            message.Status = Status.SentToArchive;
            return message;
        }


        [FunctionName("PublishTweet")]
        public static Message PublishTweet( Message message, ILogger log)
        {
            //Post message to twittter
            message.Status = Status.Published;

            return message; 
        }


        [FunctionName("function_HttpStart")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")]HttpRequestMessage req,
            ILogger log)
        {
            // Function input comes from the request content.

            var message =  JsonConvert.DeserializeObject<Message>(await req.Content.ReadAsStringAsync());

            /*   Start new workflow called "Workflow" 
             *   return starter.CreateCheckStatusResponse(req, instanceId);
             */

            return new HttpResponseMessage();
        }
    }
}
 
 