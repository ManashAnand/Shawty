import React, { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiInstagram, SiMedium, SiTiktok, SiTwitter, SiYoutube } from "react-icons/si";
import Link from "next/link";
import emailjs from 'emailjs-com';

export const BentoGrid = () => {


  

  return (
    <div className="min-h-screen bg-transparent px-4 py-12 text-zinc-50">
      {/* <Logo /> */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
      {/* <Footer /> */}
    </div>
  );
};

const Block = ({ className, ...rest }:any) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
      alt="avatar"
      className="mb-4 size-14 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Hi, I'm Manash.{" "}
      <span className="text-zinc-400">
        I build cool websites like this one.
      </span>
    </h1>
    <a
      href="mailto: anandmanash321@gmail.com"
      className="flex items-center gap-1 text-red-300 hover:underline"
    >
      Contact me <FiArrowRight />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-orange-600 md:col-span-3"
    >
      <Link
        href="https://www.instagram.com/manash.anand.1/"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiInstagram />
      </Link>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-800 md:col-span-3"
    >
      <Link
        href={'https://github.com/ManashAnand'}
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGithub />
      </Link>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3"
    >
      <Link
        href="https://medium.com/@anandmanash321/followers"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <SiMedium />
      </Link>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-500 md:col-span-3"
    >
      <Link
        href={'https://x.com/manashanand2'}
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiTwitter />
      </Link>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      My passion is building cool stuff.{" "}
      <span className="text-zinc-400">
        I deal primarily with full Stack. I love
        this stack so much that I have built ton of website . I've work with over
        4 enterprise on this subject across globe .
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Bangalore</p>
  </Block>
);

const EmailListBlock = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('Hey, Let talk to each other ');

    const sendEmail = (e:any) => {
        e.preventDefault();
    
        const templateParams = {
          to_email: email,
          message: message,
        };
    
        emailjs.send('service_4c5cnjb', 'template_1aq1swc', templateParams, 'fPKffb_E90S6T1sMY')
          .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
          })
          .catch((err) => {
            console.error('Failed to send email. Error:', err);
          });
      };

      return(
        <>
        
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Send yourself an email from me</p>
    <form
        onSubmit={sendEmail}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
     />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
   
    >
        <FiMail /> Join the list
      </button>
    </form>
  </Block>
        </>
      )


    };

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="40"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-12 fill-zinc-50"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};

const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-zinc-400">
        Made with ❤️ by{" "}
        <a href="#" className="text-red-300 hover:underline">
          @tomisloading
        </a>
      </p>
    </footer>
  );
};