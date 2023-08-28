"use client";
import {
  FacebookShareButton,
  FacebookIcon,
  TumblrShareButton,
  TumblrIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { ShareIcon } from "./Icons";
import { motion } from "framer-motion";
import { useState } from "react";
export default function Share() {
  const [show, setShow] = useState(false);
  return (
    <div className=" z-50 sticky top-0 right-5  ">
      <motion.div
        animate={{
          borderColor: "rgb(255, 0, 0)",
          width: show ? "300px" : "0px",
          padding: show ? "10px" : 0,
        }}
        className="z-50 overflow-hidden
         absolute flex items-center justify-items-center align-middle md:rotate-0 rotate-90 origin-right   justify-between   w-fit  md:top-[90vh] top-[87vh] right-[60px]  md:right-[88px]   h-[80px] bg-secondary-dark rounded-l-xl  "
      >
        <motion.div
          animate={{ visibility: show ? "visible" : "hidden" }}
          className="flex, flex-nowrap w-[256px] h-fit"
        >
          <FacebookShareButton
            className="m-[8px] rotate-[-90deg] md:rotate-0"
            url={"window.location.href"}
            quote="fasf"
          >
            <FacebookIcon size={48}></FacebookIcon>
          </FacebookShareButton>
          <TumblrShareButton
            className="m-[8px] rotate-[-90deg] md:rotate-0"
            url={document.URL}
          >
            <TumblrIcon size={48}></TumblrIcon>
          </TumblrShareButton>
          <WhatsappShareButton
            className="m-[8px] rotate-[-90deg] md:rotate-0"
            url={document.URL}
          >
            <WhatsappIcon size={48}></WhatsappIcon>
          </WhatsappShareButton>
          <TwitterShareButton
            className="m-[8px] rotate-[-90deg] md:rotate-0"
            url={document.URL}
          >
            <TwitterIcon size={48}></TwitterIcon>
          </TwitterShareButton>
        </motion.div>
      </motion.div>
      <div
        className="flex w-[80px] absolute  items-center justify-center
top-[90vh] right-5  h-[80px] bg-secondary-dark rounded-xl cursor-pointer"
        onClick={() => {
          setShow(!show);
          console.log(document.URL);
        }}
      >
        <ShareIcon></ShareIcon>
      </div>
    </div>
  );
}
