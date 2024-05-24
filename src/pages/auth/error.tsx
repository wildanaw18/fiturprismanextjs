// pages/auth/error.tsx
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

const AuthErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  const getErrorMessage = (error: string | string[] | undefined) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return 'To confirm your identity, sign in with the same account you used originally.';
      case 'EmailSignin':
        return 'There was an error sending the email.';
      case 'CredentialsSignin':
        return 'Sign in failed. Check the details you provided are correct.';
      default:
        return 'An unknown error occurred.';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'cyan',
      }}
    >
      <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>
        Authentication Error
      </Typography>
      <Typography sx={{ fontSize: '16px', mt: 2 }}>
        {getErrorMessage(error)}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 4 }}>
        <Link href="/auth/login" style={{ textDecoration: 'none', color: 'white' }}>Back to Login</Link>
      </Button>
    </Box>
  );
};

export default AuthErrorPage;
