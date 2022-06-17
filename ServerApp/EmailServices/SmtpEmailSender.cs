using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ServerApp.EmailServices
{
    public class SmtpEmailSender : IEmailSender
    {
        private readonly string _host;
        private readonly int _port;
        private readonly bool _enableSSL;
        private readonly string _username;
        private readonly string _password;

        public SmtpEmailSender(string host,int port, bool enableSSL, string username, string password)
        {
            _host = host;
            _port = port;
            _enableSSL =enableSSL;
            _username = username;
            _password = password;
        }
        public Task SendEmailAsync(string email, string subject, string html)
        {
            System.Console.WriteLine("girdi");
            var client = new SmtpClient(this._host,this._port){
                Credentials = new NetworkCredential(_username,_password),
                EnableSsl = this._enableSSL
            };

            return client.SendMailAsync(
                new MailMessage(this._username,email,subject,html){
                    IsBodyHtml = true
                }
            );
        }
    }
}