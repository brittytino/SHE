"use client";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaGoogle } from "react-icons/fa"; // Import Google icon from React Icons

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu2SsMedz9jYpUC2ernFPALFI8HyjcrzI",
  authDomain: "she-protect-her.firebaseapp.com",
  projectId: "she-protect-her",
  storageBucket: "she-protect-her.appspot.com",
  messagingSenderId: "595828233876",
  appId: "1:595828233876:web:a30c45747671c027d20681",
  measurementId: "G-KG4CH383K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "admin@srcas.ac.in",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // Handle regular login logic
      await createAuthCookie();
      router.replace("/");
    },
    [router]
  );

  const handleGoogleLogin = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // You can use the result to get user info or tokens
      const user = result.user;
      console.log("Google User: ", user);
      // Here you could create a session or auth cookie as needed
      await createAuthCookie(); // Assuming you handle session creation here
      router.replace("/");
    } catch (error) {
      console.error("Google login error: ", error);
      // Handle Errors here
    }
  }, [router]);

  return (
    <>
      <div className='text-center text-[25px] font-bold mb-6'>Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className='flex flex-col w-1/2 gap-4 mb-4'>
              <Input
                variant='bordered'
                label='Email'
                type='email'
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant='bordered'
                label='Password'
                type='password'
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant='flat'
              color='primary'>
              Login
            </Button>

            {/* Google Login Button */}
            <Button
              onPress={handleGoogleLogin}
              variant='flat'
              color='secondary'
              className='flex items-center justify-center mt-4'>
              <FaGoogle className='mr-2' /> {/* Google Icon */}
              Login with Google
            </Button>
          </>
        )}
      </Formik>

      <div className='font-light text-slate-400 mt-4 text-sm'>
        Don&apos;t have an account?{" "}
        <Link href='/register' className='font-bold'>
          Register here
        </Link>
      </div>
    </>
  );
};
