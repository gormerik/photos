using Microsoft.WindowsAzure.Mobile.Service;

namespace piceventService.DataObjects
{
    public class Picture : EntityData
    {
        public string Name { get; set; }
        public string Caption { get; set; }

        public string containerName { get; set; }
        public string resourceName { get; set; }
        public string sasQueryString { get; set; }
        public string imageUri { get; set; } 

    }
}