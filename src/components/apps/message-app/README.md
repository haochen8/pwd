Message App Web Component - ReadMe
Overview

The Message App Web Component is a custom element designed for seamless integration into web applications, offering a real-time messaging interface. It leverages WebSockets for live communication and includes emoji support for expressive messaging.
Features

    Real-Time Messaging: Utilizes WebSockets for instant communication.
    Emoji Integration: Includes an emoji picker for enhanced message personalization.
    User-Friendly UI: Provides a clean and interactive user interface with an intuitive design.
    Message Limitation: Maintains the latest 20 messages for better performance and clarity.

Getting Started

    Clone the Repository: Begin by cloning this repository to your local environment.
    API Key and Server URL: Ensure you have the WebSocket server URL and API key. Replace SERVER_URL and API_KEY in the script with your details.
    Integration: Simply include the script in your HTML and embed the component using the <my-message-app></my-message-app> tag.

Usage

Embed the message app in your HTML using <my-message-app></my-message-app>. The component handles user interaction and WebSocket communication internally.
Dependencies

    A WebSocket server (compatible with the specified SERVER_URL).
    emoji-picker-element library for emoji functionality.
    A modern web browser with support for Web Components, Shadow DOM, and WebSockets.

Author

    Hao Chen hc222ig@student.lnu.se

Version

    1.0.0

License

This project is licensed under the MIT License.
Contributions

Contributions to improve the functionality or design of this component are welcome. Please fork the repository and submit a pull request with your changes.
Support

For support or questions regarding the component, please reach out to the author.
Acknowledgments

Special thanks to the developers and contributors of the WebSocket technology and the emoji-picker-element library for making real-time communication and emoji integration possible in web applications.

Please ensure the API key and server URL are correctly set before deploying this application. For customization or further development, refer to the component's source code.