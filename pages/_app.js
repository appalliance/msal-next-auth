import { EventType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../config/msal';
import { MsalProvider } from '@azure/msal-react';
import '../styles/globals.css';

export const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.addEventCallback(event => {
  try {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  } catch (error) {
    console.error("Something wrong in msalInstance.addEventCallback - ", error);
  }
});

export default function App({ Component, pageProps }) {
  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  );
}

