using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace TweetCheckerWorkflow.Model
{

    public enum Status
    {

        ReadyForRiskAssment, ReadyForManualReview, Approved, Rejected, Published, SentToArchive
    }

    public class Message
    {

        [XmlElement(ElementName = "created")]
        [JsonProperty(PropertyName = "created")]
        public DateTime Created { get; set; }


        [XmlElement(ElementName = "from")]
        [JsonProperty(PropertyName = "from")]
        public String From { get; set; }


        [XmlElement(ElementName = "text")]
        [JsonProperty(PropertyName = "text")]
        public String Text { get; set; }


        [XmlElement(ElementName = "status")]
        [JsonProperty(PropertyName = "status")]
        public  Status Status { get; set; }


        [XmlElement(ElementName = "approvedBy")]
        [JsonProperty(PropertyName = "approvedBy")]
        public string ApprovedBy { get; set; }


        [XmlElement(ElementName = "RiskLevel")]
        [JsonProperty(PropertyName = "RiskLevel")]
        public double RiskLevel { get; set; }





    }
}
