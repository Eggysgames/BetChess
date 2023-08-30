import {DefaultButton } from "../components/StyledButton";
import React, { useState, useEffect } from 'react';
import { createClient, Session } from '@supabase/supabase-js';


const supabase = createClient('https://ttlaembyimpxjuovpmxk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw')


const Login = () => {

    const [session, setSession] = useState<Session | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session);
        });
    
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
        });
    
        return () => subscription.unsubscribe();
      }, []);


      const handleLogin = async () => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          
      
          
        } catch (error) {
            console.error('login failed')
        }
      };

if (session) {
        return (
            <div>
                <p className="text-white text-xl">Welcome, {session.user?.email}</p>
                <button onClick={() => supabase.auth.signOut()} className="text-white">
                    Sign Out
                </button>

            </div>
        );
    }
      
if (!session) {
    return(
        <div className="flex justify-center items-center h-screen">

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">

            <p className="underline text-4xl">Login</p>
         
            <div className="mx-auto my-10 max-w-md grid grid-cols-3 gap-3">
                <span className="flex items-center justify-end">Email :</span>
                    <div className="col-span-2">
                    <input className="w-full px-4 py-2 border rounded text-black text-sm" 
                    type="text" 
                    placeholder="<Enter Email>" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <span className="flex items-center justify-end">Password :</span>
                    <div className="col-span-2">
                    <input className="w-full px-4 py-2 border rounded text-black text-sm" 
                    type="password" 
                    placeholder="<Enter Password>" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}    
                    />
                </div>

            </div>

            <button className="your-button-styles" onClick={handleLogin}>
                Login
            </button>

            </div>
        </div>
    )
}

}




export default Login