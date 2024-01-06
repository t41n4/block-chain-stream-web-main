import { LoginSchema } from "@lib/constant/validation";
import clsx from "clsx";
import { useAuth } from "context/auth-context";
import { ConnectedFocusError } from 'focus-formik-error';
import { Field, Form, Formik } from "formik";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../../common/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "../../common/components/ui/card";
import { FormikCheckBox, FormikInput } from "../formik-comps";
import ThirdPartyAuth from "../third-party-auth";
import "./index.scss";

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const initLogin = {
  username: '',
  user_password: '',
  user_remember: false,
};

const Login: React.FC<Props> = ({ className, ...props }: Props) => {
  const { handleLogin } = useAuth();
  const fallback = useSearchParams().get('fallback')

  return (
    <Card className={clsx('border-none rounded-t-none bg-secondary text-white', className)}  {...props}>
      <Formik
        initialValues={initLogin}
        onSubmit={(values) => handleLogin(values, fallback)}
        validationSchema={LoginSchema}
      >
        {({ submitForm, isSubmitting }) => (
          <CardContent className='space-y-2 pt-6 pb-0 flex flex-col gap-2'>
            <ConnectedFocusError />
            <Form onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitForm();
              }
            }}
            >
              <div >
                <Field
                  label="Username"
                  name="username"
                  className="rounded-2xl"
                  autoComplete="username"
                  component={FormikInput} />
              </div>

              <div>
                <Field
                  label="Password"
                  name="user_password"
                  type="password"
                  className="rounded-2xl"
                  autoComplete="password webauthn"
                  component={FormikInput} />
              </div>

              <CardDescription className="!m-0">
                <Link href='/'>Forgot password?</Link>
              </CardDescription>

              <div className='flex py-3 items-center space-x-2'>
                <Field name="user_remember" as={FormikCheckBox} />
                <label htmlFor='user_remember' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Remember me
                </label>
              </div>
            </Form>
            <Button disabled={isSubmitting} className="!bg-primary hover:!bg-primary-100 text-white" onClick={submitForm} type='submit'>
              {isSubmitting ? <Loader2Icon className="animate-spin" /> : 'Login'}
            </Button>
          </CardContent>
        )}
      </Formik >

      <CardFooter>
        <div className="flex flex-col w-full justify-center items-center">
          <div className='relative flex py-5 items-center w-full'>
            <div className='flex-grow border-t border-inherit'></div>
            <span className='flex-shrink mx-4 '>
              Or Login With
            </span>
            <div className='flex-grow border-t border-inherit'></div>
          </div>
          <ThirdPartyAuth className="flex  w-full" />
        </div>

      </CardFooter>
    </Card >

  );
};

export default Login;
