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
    <div className=" z-50  sticky top-0 right-5  ">
      <motion.div
        animate={{
          width: show ? "17rem" : "0rem",
          padding: show ? "0.5rem" : 0,
        }}
        className="z-50 overflow-hidden
         absolute flex items-center justify-items-center align-middle   justify-between   w-fit  top-[90vh] right-[5.5rem]  h-20 bg-primary-dark rounded-l-xl  "
      >
        <motion.div
          animate={{ visibility: show ? "visible" : "hidden" }}
          className="flex, flex-nowrap w-64 h-fit"
        >
          <FacebookShareButton
            className="m-2"
            url={"window.location.href"}
            quote="fasf"
          >
            <FacebookIcon size={48}></FacebookIcon>
          </FacebookShareButton>
          <TumblrShareButton className="m-2" url={document.URL}>
            <TumblrIcon size={48}></TumblrIcon>
          </TumblrShareButton>
          <WhatsappShareButton className="m-2" url={document.URL}>
            <WhatsappIcon size={48}></WhatsappIcon>
          </WhatsappShareButton>
          <TwitterShareButton className="m-2" url={document.URL}>
            <TwitterIcon size={48}></TwitterIcon>
          </TwitterShareButton>
        </motion.div>
      </motion.div>
      <div
        className="flex w-20  absolute  items-center justify-center
top-[90vh] right-5  h-20 bg-primary-dark rounded-xl cursor-pointer"
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
