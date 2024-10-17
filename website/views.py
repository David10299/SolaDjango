from django.shortcuts import render
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse

def base(request):
    return render(request, 'base.html', {})

def index(request):
    if request.method == "POST":
        print("Form submitted.")
        # Get form data
        message_name = request.POST.get('message-name', '')  # Get value or empty string
        message_email = request.POST.get('message-email', '')
        message = request.POST.get('message', '')

        # Add the user's email to the message content
        email_body = f"From: {message_email}\n\nMessage:\n{message}"

        # Try to send the email
        try:
            send_mail(
                'Sola support - ' + message_name,  # Subject
                message,  # Updated message content
                message_email,  # From email
                ['lxdavidxl9166@gmail.com'],  # To email
            )
        except BadHeaderError:
            return HttpResponse('Invalid header found.')
        except Exception as e:
            return HttpResponse(f'Error sending email: {e}')

        # Add success flag and form data to context
        context = {
            'message_name': message_name,  # To show name in thank you message
            'submitted': True  # Flag to indicate form was submitted
        }

        # Render the template and pass the context
        return render(request, 'index.html', context)

    else:
        return render(request, 'index.html', {})
    

def about(request):
    return render(request, 'about.html', {})