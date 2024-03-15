import {useState, useEffect} from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import Head from 'next/head';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [userName, setUserName] = useState("");
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  useEffect(() => {
    if (activeAccount) {
      // graph call to get the user profile (displayName, id, email, country, language)
      setUserName(activeAccount.name);
      console.log(activeAccount);
    } else {
      setUserName("");
    }
  }, [activeAccount]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Azure AD Authentication using MSAL and Next.js</title>
      </Head>

      <AuthenticatedTemplate>
        <Profile username={userName} />
        <Logout />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div>To begin this crazy journey, sign-in or create an account...</div>
        <Login />
      </UnauthenticatedTemplate>
    </div>
  );
}