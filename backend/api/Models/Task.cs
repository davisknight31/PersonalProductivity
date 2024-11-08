using System.Text.Json.Serialization;

namespace api.Models
{
    public class Task
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime DateAdded { get;set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TaskPriority Priority { get; set; } 

        public bool BackLogged { get; set; }
        public bool Completed { get; set; }



    }

    public enum TaskPriority
    {
        Low,
        Moderate,
        High
    }

    //Could make an enum for task status and update completed col to that with types: 'Completed', 'In Progress', 'Waiting'
}
