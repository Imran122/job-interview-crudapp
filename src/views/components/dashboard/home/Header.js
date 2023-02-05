import React, { useState } from 'react';
import { IoNotifications } from 'react-icons/io5';
import { BiFullscreen } from 'react-icons/bi';
import { HiDotsVertical } from 'react-icons/hi';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import { RiShieldUserFill } from 'react-icons/ri';
import { MdNotificationsOff } from 'react-icons/md';

const Header = ({ menuShow, setMenuShow }) => {

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);
    const [fullScreenError, setFullScreenError] = useState("");

    const handleFullscreen = () => {
        if (!isFullscreen) {
            if (document.fullscreenEnabled) {
                document.documentElement.requestFullscreen();
                setIsFullscreen(true);
            } else {
                setFullScreenError("fullscreen is not supported")
            }
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };
    return (
        <div className="dashboard-top">
            <div className="top-left">
                <div className="action-logo">
                    <span
                        onClick={() => setMenuShow(!menuShow)}
                        className="action-icon">
                        <GiHamburgerMenu className="actionIcon" />
                    </span>
                    <h2 className="dashboard-logo">DASHBOARD</h2>
                </div>
                
            </div>

            {/* top right navigation */}
            <div className="top-notify-bar">
                {/* full screen */}
                <span
                    onClick={handleFullscreen}
                    className="notify-icon">
                    <BiFullscreen className="notifyIcon" />
                </span>
                {/* Notifications */}
                <span className="notify-icon notification-icon">
                    <span className="notify-items">5</span>
                    <IoNotifications className="notifyIcon" />
                </span>
            </div>
        </div>
    );
};

export default Header;