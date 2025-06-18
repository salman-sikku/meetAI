"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClick = () => {
    authClient.signUp.email({
      email,
      password,
      name
    }, {
      onSuccess: () => {
        alert("succsefuly sign up!")
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    })
  }


  if(session){
      return (
        <div>
           <h2>{session.user.name}</h2>
        </div>
      )
  }

  return (
    <div className="flex flex-col">
      <Input type="text" placeholder="enter name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" placeholder="enter email" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" placeholder="enter password" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={onClick}>Click me</Button>
    </div>
  );
}
