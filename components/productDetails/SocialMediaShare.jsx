"use client";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import { useEffect, useState } from "react";

const SocialMediaShare = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    setCurrentLocation(window.location.href);
  }, []);

  return (
    <div>
      <p>Share this product to</p>
      <div className="flex gap-3 mt-4">
        <FacebookShareButton url={currentLocation}>
          <FacebookIcon size={32} />
        </FacebookShareButton>
        <TwitterShareButton url={currentLocation}>
          <TwitterIcon size={32} />
        </TwitterShareButton>
        <LinkedinShareButton url={currentLocation}>
          <LinkedinIcon size={32} />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default SocialMediaShare;
