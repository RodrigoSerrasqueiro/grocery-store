'use client';

import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import GlobalApi from "../../_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

function CreateAccount() {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt) {
      router.push('/');
    }
  }, []);

  const onCreateAccount = () => {
    setLoader(true)
    GlobalApi.registerUser(userName, email, password)
    .then(resp => {
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt', resp.data.jwt);
      toast('Account created successfully');
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
        <h2 className="font-bold text-3xl">Create an Account</h2>
        <h2 className="text-gray-500">Enter your email and password to create an account</h2>
        <div className="w-full flex flex-col gap-5 mt-7">
          <Input 
            placeholder='Username' 
            onChange={(e) => setUserName(e.target.value)}
          />
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
            onClick={onCreateAccount}
            disabled={!userName || !email || !password}
          >
             {loader ? <LoaderIcon className="animate-spin" /> : "Create an account"}
          </Button>
          <p>
            {`Already have an account `}
            <Link href={'/sign-in'} className="text-blue-500">
              click here to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount;