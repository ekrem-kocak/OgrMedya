using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Helpers
{
    public static class ExtensionMethods
    {
        public static int CalculateAge(this DateTime dateOfBirth)
        {
            if (dateOfBirth.ToString() == "1/1/0001 12:00:00 AM")
            {
                return 0;
            }
            
            int age = 0;

            age = DateTime.Now.Year - dateOfBirth.Year;

            if (DateTime.Now.DayOfYear < dateOfBirth.DayOfYear)

                age -= 1;

            return age;
        }
    }
}