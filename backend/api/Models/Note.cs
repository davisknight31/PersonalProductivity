namespace api.Models
{
    public class Note
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;   
        public DateTime DateAdded { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
