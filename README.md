
# SHE - Women's Safety Web Application

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Security](#security)
- [Future Plans](#future-plans)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
**SHE** is a web-based safety application designed to provide immediate help to women in dangerous or uncomfortable situations. It offers **discreet and reliable tools** such as live location sharing, audio recording, and direct integration with the Tamil Nadu Police portal for filing complaints in real-time. The app is built with the goal of enhancing women's safety, especially in environments where they might feel vulnerable.

---

## Features
1. **Live Location Sharing**: Users can share their real-time location with pre-set emergency contacts (family, friends) and law enforcement.
2. **Audio Recording**: The app discreetly records the surroundings and securely stores the audio files, providing potential evidence in case of harassment.
3. **Direct Police Complaint**: Integrated with the **Tamil Nadu Police Portal**, users can submit a formal complaint with one click, sending their live location and recorded audio.
4. **Discreet Operation**: The app runs in the background, ensuring the user can report danger without raising suspicion.
5. **Real-Time Alerts**: Alerts are sent to family or friends when the user activates emergency mode, ensuring they stay informed.
   
---

## Architecture
The **SHE** app follows a modern and scalable architecture:

- **Frontend**: Built with **React.js** for a smooth user interface.
- **Backend**: Powered by **Node.js** to handle API requests efficiently.
- **Database**: We use **Firebase** for real-time location updates and **AWS** for secure audio storage.
- **API Integration**: The app connects to the **Tamil Nadu Police Portal** through its official API, ensuring instant complaint registration.
- **Encryption**: All communication between the user, emergency contacts, and authorities is encrypted for privacy and security.

---

## Technology Stack
- **Frontend**: React.js, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: Firebase (for location tracking), AWS S3 (for audio storage)
- **APIs**: Tamil Nadu Police Portal API for filing complaints
- **Real-Time Communication**: WebSockets for continuous location updates
- **Security**: HTTPS, Data Encryption (AES-256)

---

## How It Works
1. **Registration**: Users sign up and set their emergency contacts (family, friends, or guardians).
2. **Live Location Tracking**: When feeling unsafe, the user can click the 'Start Emergency' button, which sends their live location to their emergency contacts and the police.
3. **Audio Recording**: In emergency mode, the app automatically records audio from the user's surroundings and uploads it to AWS servers securely.
4. **File a Police Complaint**: The app allows the user to send a formal complaint directly to the Tamil Nadu Police portal, ensuring immediate assistance.
5. **Continuous Monitoring**: The app keeps sending live location data until the user deactivates emergency mode, allowing contacts and authorities to track their movements.

---

## Installation

### Prerequisites
- Node.js
- Firebase Account
- AWS Account for S3 bucket storage

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/SHE-App.git
   ```
2. Navigate to the project folder:
   ```bash
   cd SHE-App
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up Firebase for real-time location tracking.
5. Configure AWS for audio storage and upload.
6. Create a `.env` file with API keys for Firebase, AWS, and Tamil Nadu Police Portal.

7. Run the app:
   ```bash
   npm start
   ```

---

## Usage
1. **Sign Up/Log In**: Users must first create an account and input their emergency contacts.
2. **Trigger Emergency**: By clicking the "Start Emergency" button, users activate live location sharing and audio recording.
3. **Submit Complaint**: Through a single click, users can file a police complaint, attaching both live location and recorded audio.
4. **Monitor Location**: Emergency contacts will receive updates until the user stops the emergency mode.

---

## Security
1. **Data Encryption**: All sensitive data, including audio files, live location, and user credentials, are encrypted both in transit and at rest using **AES-256** encryption.
2. **Secure API Communication**: Communication between the app and police servers is secured via HTTPS, preventing data interception.

---

## Future Plans
- **Voice Activation**: Implement voice commands to activate the app's emergency mode in cases where the user cannot manually press buttons.
- **SMS Alerts**: Add SMS notifications for users without internet access.
- **AI-Powered Alerts**: Implement AI to detect distress in the user's voice and automatically trigger emergency features.
- **National Expansion**: Expand the app's integration to police portals in other states beyond Tamil Nadu.

---

## Contributing
We welcome contributions! If you’d like to improve this project or fix any issues, feel free to submit a pull request or raise an issue on the GitHub repository.

---

## License
This project is licensed under the **MIT License**. See the LICENSE file for more details.

---

**SHE - Empowering women through technology. Together, we make safety accessible.**
