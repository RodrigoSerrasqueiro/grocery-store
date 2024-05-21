'use client';

import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import GlobalApi from "../../_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { UpdateCartContext } from '../../_context/UpdateCartContext';

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      router.push('/');
    }
  }, []);

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.SignIn(email, password)
    .then(resp => {
      localStorage.setItem('user', JSON.stringify(resp.data.user));
      localStorage.setItem('jwt', resp.data.jwt);
      toast('Login successfully');
      setUpdateCart(!updateCart)
      router.push('/');
      setLoader(false);
    }, (e) => {
      toast(e?.response?.data?.error?.message);
      setLoader(false);
    })
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center bg-slate-100 border border-gray-200 p-10">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
        <h2 className="font-bold text-3xl">Sign in to account</h2>
        <h2 className="text-gray-500">Enter your email and password to sign in</h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input 
            placeholder='name@example.com' 
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type='password' 
            placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            onClick={onSignIn}
            disabled={!email || !password}
          >
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign in"}
          </Button>
          <p>
            {`Don´t have an account ? `}
            <Link href={'/create-account'} className="text-blue-500">
              click here to create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn;