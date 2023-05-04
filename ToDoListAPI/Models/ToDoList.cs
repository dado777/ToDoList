using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoListAPI.Models
{
    public class ToDoList
    {
        [Key]
        public Int32 Id { get; set; }

        [Required]
        [Column(TypeName="nvarchar(100)")]
        public String TaskName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public String Status { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }
}
