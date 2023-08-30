import {DefaultButton } from "../components/StyledButton";
import React, { useState, useEffect } from 'react';
import { createClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient('https://ttlaembyimpxjuovpmxk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGFlbWJ5aW1weGp1b3ZwbXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3NzA2NTcsImV4cCI6MjAwODM0NjY1N30.f6YXhReklfjQMe6sfVAqjyraiXgzjcH6W-2bOkCn_Sw')


const Login = () => {

    const [session, setSession] = useState<Session | null>(null);


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
                email: 'eggy55555@gmail.com',
                password: 'testing5',
              })
        } catch (error) {
            console.error(error);
        }
    };

      
if (!session) {
    return(
        <div className="flex justify-center items-center h-screen">

        <div className="text-white text-2xl bg-slate-800 rounded-lg shadow drop-shadow-xl shadow-slate-900 mx-auto w-full max-w-md text-center p-8">

            <p className="underline text-4xl">Login</p>
         
            <div className="mx-auto my-10 max-w-md grid grid-cols-3 gap-3">
                <span className="flex items-center justify-end">Username :</span>
                    <div className="col-span-2">
                    <input className="w-full px-4 py-2 border rounded text-black text-sm" type="text" placeholder="<Enter Username>" />
                </div>

                <span className="flex items-center justify-end">Password :</span>
                    <div className="col-span-2">
                    <input className="w-full px-4 py-2 border rounded text-black text-sm" type="password" placeholder="<Enter Password>" />
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