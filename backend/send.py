from flask import Flask, request, jsonify
from flask_mail import Mail, Message
import os
import smtplib  # for authentication before starttls
app = Flask(__name__)

# Configure Flask-Mail (replace with your actual settings)
app.config['MAIL_SERVER'] = 'smtp.office365.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'AccoTrac@outlook.com'  # Store email in environment variable
app.config['MAIL_PASSWORD'] = 'Accounting@simplified'  # Store password in environment variable

mail = Mail(app)

# Set your custom domain name for the sender address (replace with your domain)
CUSTOM_DOMAIN = 'yourdomain.com'

@app.route('/sendemail', methods=['POST'])
def send_email():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return jsonify({'message': 'Missing required data'}), 400

        recipient = data.get('recipient')
        subject = data.get('subject')
        body = data.get('body')

        if not recipient or not subject or not body:
            return jsonify({'message': 'Missing required fields: recipient, subject, body'}), 400

        sender = f'Your Name <noreply@yourdomain.com>'  # Set your custom domain name

        try:
            

            message = Message(subject, sender=sender, recipients=[recipient])
            message.body = body
            mail.send(message)
            return jsonify({'message': 'Email sent successfully'}), 200
        except Exception as e:
            print(f"Error sending email: {e}")
            return jsonify({'message': 'Failed to send email'}), 500

    return jsonify({'message': 'Method not allowed'}), 405
if __name__ == '__main__':
    app.run(debug=True)
