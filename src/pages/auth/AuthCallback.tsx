import React, { useEffect } from 'react';
import { getSupabase } from '../../lib/supabase';

export const AuthCallback = () => {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const supabase = getSupabase();
        // Supabase will automatically handle the URL hash and set the session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
        }

        if (window.opener) {
          // Notify the parent window that authentication was successful
          window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', session }, '*');
          // Close the popup after a short delay to ensure message is sent
          setTimeout(() => window.close(), 500);
        } else {
          // If not in a popup, redirect to the main app
          window.location.href = '/';
        }
      } catch (err) {
        console.error('Auth callback fatal error:', err);
        if (window.opener) {
          window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: err }, '*');
          setTimeout(() => window.close(), 2000);
        }
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gold border-t-transparent mb-6"></div>
      <h1 className="text-2xl font-black text-foreground mb-2">Connecting to STAHIZA HUB</h1>
      <p className="text-muted-foreground font-medium italic">Please wait while we finalize your secure login...</p>
    </div>
  );
};
