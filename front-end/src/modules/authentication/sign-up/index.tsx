
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute
import { SignupSchema } from "@lib/constant/validation";
import { Label } from "@radix-ui/react-label";
import clsx from 'clsx';
import { useAuth } from "context/auth-context";
import { ConnectedFocusError } from "focus-formik-error";
import {
    Field,
    Form,
    Formik
} from 'formik';
import { Loader2Icon } from "lucide-react";
import React from "react";
import { Button } from "../../common/components/ui/button";
import { Card, CardContent, CardFooter } from "../../common/components/ui/card";
import { FormikCheckBox, FormikInput } from "../formik-comps";
import ThirdPartyAuth from "../third-party-auth";

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const initSignUp = {
    user_id: '',
    username: '',
    user_password: '',
    user_fullname: '',
    user_email: '',
    user_stream_key: '',
    user_avatar: '',
    user_role: '',
    confirm_password: '',
    user_agree: false,
};

const SignUp: React.FC<Props> = ({ className, ...props }: Props) => {
    const { handleSignUp } = useAuth();

    return (
        <Card className={clsx(className, "border-none rounded-t-none bg-secondary text-white")}  {...props}>
            <Formik
                initialValues={initSignUp}
                onSubmit={(values) => handleSignUp(values, 'login' )}
                validationSchema={SignupSchema}
            >
                {({ submitForm, isSubmitting }) => (
                    <CardContent className='space-y-2 pt-6 pb-0 flex flex-col gap-2'>
                        <ConnectedFocusError />
                        <Form>
                            <div>
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
                                    className="rounded-2xl"
                                    type="password"
                                    autoComplete="password webauthn"
                                    component={FormikInput} />
                            </div>
                            <div>
                                <Field
                                    label="Confirm Password"
                                    name="confirm_password"
                                    className="rounded-2xl"
                                    type="password"
                                    autoComplete="password webauthn"
                                    component={FormikInput} />
                            </div>
                            <div>
                                <Field
                                    label="Email"
                                    name="user_email"
                                    className="rounded-2xl"
                                    autoComplete="email"
                                    component={FormikInput} />
                            </div>
                            <div>
                                <Field name="user_fullname"
                                    label="Full Name"
                                    className="rounded-2xl"
                                    autoComplete="name"
                                    component={FormikInput} />
                            </div>
                            <div className='flex flex-row gap-2 space-y-1 py-2'>
                                <Field
                                    name="user_agree"
                                    component={FormikCheckBox} />
                                <label
                                    htmlFor='user_agree'
                                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                    I agree to all the Terms and Privacy policy.
                                </label>
                            </div>
                        </Form>
                        <Button disabled={isSubmitting ? true : false} className="!bg-primary hover:!bg-primary-100 text-white" onClick={submitForm} type='submit'>
                            {isSubmitting ? <Loader2Icon className="animate-spin" /> : 'Sign Up'}
                        </Button>
                    </CardContent>
                )}
            </Formik>

            <CardFooter>
                <div className="flex flex-col w-full justify-center items-center">
                    <div className='relative flex py-5 items-center w-full'>
                        <div className='flex-grow border-t border-current'></div>
                        <span className='flex-shrink mx-4 '>
                            Or Sign Up With
                        </span>
                        <div className='flex-grow border-t border-current'></div>
                    </div>
                    <ThirdPartyAuth className="flex  w-full" />
                </div>
            </CardFooter>
        </Card >


    );
};

export default SignUp;
