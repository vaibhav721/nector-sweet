import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Toast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { signInEmail, signUpEmail, signInGoogle, sendPhoneOtp, confirmPhoneOtp } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [message, setMessage] = useState('');

  const submitEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    if (mode === 'login') {
      await signInEmail(email, password);
      setMessage('Login successful');
    } else {
      await signUpEmail(email, password);
      setMessage('Account created');
    }

    navigate('/account');
  };

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="font-heading text-4xl">Login / Signup</h1>

      {message ? <Toast message={message} tone="success" /> : null}

      <Card className="space-y-4">
        <div className="flex gap-2">
          <Button variant={mode === 'login' ? 'primary' : 'ghost'} onClick={() => setMode('login')}>
            Login
          </Button>
          <Button variant={mode === 'signup' ? 'primary' : 'ghost'} onClick={() => setMode('signup')}>
            Signup
          </Button>
        </div>

        <form onSubmit={submitEmail} className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit" className="w-full">
            {mode === 'login' ? 'Login with Email' : 'Create Account'}
          </Button>
        </form>

        <Button className="w-full" variant="secondary" onClick={() => signInGoogle().then(() => navigate('/account'))}>
          Continue with Google
        </Button>

        <div className="space-y-2 rounded-xl border border-neutral-200 p-3">
          <p className="text-sm font-semibold">Phone OTP</p>
          <div id="recaptcha-container" />
          <Input
            placeholder="Phone (+91...)"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={async () => {
                const id = await sendPhoneOtp(phone, 'recaptcha-container');
                setVerificationId(id);
                setMessage('OTP sent');
              }}
            >
              Send OTP
            </Button>
            <Input placeholder="OTP" value={otp} onChange={(event) => setOtp(event.target.value)} />
            <Button
              onClick={async () => {
                if (!verificationId) return;
                await confirmPhoneOtp(verificationId, otp);
                navigate('/account');
              }}
            >
              Verify
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
