/* eslint-disable no-empty */
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useState, useRef, useEffect } from 'react';
import './components_CSS/Home.css';

const DROPDOWN_CLOSE_DELAY = 550;

export function Home() {
    const { currentUser, logout, isAdmin } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const closeTimeout = useRef(null);
    const communityCloseTimeout = useRef(null);
    const pinnedRef = useRef(false);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const openDropdown = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
        setIsDropdownOpen(true);
        // Закрываем второе меню при открытии первого
        setIsCommunityDropdownOpen(false);
    };

    const scheduleCloseDropdown = (delay = DROPDOWN_CLOSE_DELAY) => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        closeTimeout.current = setTimeout(() => {
            if (!pinnedRef.current) {
                setIsDropdownOpen(false);
            }
            closeTimeout.current = null;
        }, delay);
    };

    const cancelCloseDropdown = () => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
            closeTimeout.current = null;
        }
    };

    const openCommunityDropdown = () => {
        if (communityCloseTimeout.current) {
            clearTimeout(communityCloseTimeout.current);
            communityCloseTimeout.current = null;
        }
        setIsCommunityDropdownOpen(true);
        // Закрываем первое меню при открытии второго
        setIsDropdownOpen(false);
    };

    const scheduleCloseCommunityDropdown = (delay = DROPDOWN_CLOSE_DELAY) => {
        if (communityCloseTimeout.current) clearTimeout(communityCloseTimeout.current);
        communityCloseTimeout.current = setTimeout(() => {
            setIsCommunityDropdownOpen(false);
            communityCloseTimeout.current = null;
        }, delay);
    };

    const cancelCloseCommunityDropdown = () => {
        if (communityCloseTimeout.current) {
            clearTimeout(communityCloseTimeout.current);
            communityCloseTimeout.current = null;
        }
    };

    useEffect(() => {
        return () => {
            if (closeTimeout.current) clearTimeout(closeTimeout.current);
            if (communityCloseTimeout.current) clearTimeout(communityCloseTimeout.current);
        };
    }, []);

    const handleLogout = () => {
        logout();
        pinnedRef.current = false;
        setIsDropdownOpen(false);
    };

    const handleLogoClick = () => {
        if (pinnedRef.current) {
            pinnedRef.current = false;
            setIsDropdownOpen(false);
            if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
            return;
        }

        if (isDropdownOpen) {
            pinnedRef.current = true;
        } else {
            pinnedRef.current = true;
            openDropdown();
        }
    };

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const body = document.body;
        const prev = {};

        Object.keys(steamStyles.body).forEach((prop) => {
            prev[prop] = body.style[prop];
            try { body.style[prop] = steamStyles.body[prop]; } catch (e) { }
        });

        return () => {
            Object.keys(prev).forEach((prop) => {
                try { body.style[prop] = prev[prop] || ''; } catch (e) { }
            });
        };
    }, []);

    return (
        <>
            <div id="nav" className="nav">
                <div
                    className="left-section"
                    onMouseEnter={() => { openDropdown(); }}
                    onMouseLeave={() => { scheduleCloseDropdown(); }}
                >
                    <div
                        className="steam-logo"
                        title="Steam Menu"
                        onClick={handleLogoClick}
                    >
                        <img
                            src="/steam.png"
                            alt="Steam"
                            className="steam-logo-img"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.13)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(32,201,151,0.25)';
                                e.currentTarget.style.borderColor = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(32,201,151,0.10)';
                                e.currentTarget.style.borderColor = '#20c997';
                            }}
                        />
                    </div>

                    {isDropdownOpen && currentUser && (
                        <div
                            className="dropdown"
                            onMouseEnter={() => { cancelCloseDropdown(); }}
                            onMouseLeave={() => { scheduleCloseDropdown(); }}
                        >
                            <div className="user-welcome">
                                Welcome, {currentUser.username}
                                {currentUser.isAdmin && <span className="admin-badge">(Admin)</span>}
                            </div>

                            <NavLink
                                to="/"
                                className="dropdown-item"
                                onClick={() => { pinnedRef.current = false; setIsDropdownOpen(false); }}
                            >
                                Game List
                            </NavLink>

                            {currentUser?.isAdmin && (
                                <NavLink
                                    to="/Create"
                                    className="dropdown-item"
                                    onClick={() => { pinnedRef.current = false; setIsDropdownOpen(false); }}
                                >
                                    Add Game
                                </NavLink>
                            )}
                            <NavLink
                                to="/Profile"
                                className="dropdown-item"
                                onClick={() => { pinnedRef.current = false; setIsDropdownOpen(false); }}
                            >
                                Profile
                            </NavLink>

                            <button
                                onClick={handleLogout}
                                className="dropdown-item"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                <div className="right-section">
                    {/* Community Dropdown */}
                    <div 
                        className="community-menu"
                        onMouseEnter={openCommunityDropdown}
                        onMouseLeave={() => scheduleCloseCommunityDropdown()}
                    >
                        <div className="steam-logo">
                            <img
                                src="/steam.png"
                                alt="Community"
                                className="steam-logo-img"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.13)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(32,201,151,0.25)';
                                    e.currentTarget.style.borderColor = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(32,201,151,0.10)';
                                    e.currentTarget.style.borderColor = '#20c997';
                                }}
                            />
                        </div>

                        {isCommunityDropdownOpen && (
                            <div
                                className="dropdown"
                                onMouseEnter={cancelCloseCommunityDropdown}
                                onMouseLeave={() => scheduleCloseCommunityDropdown()}
                            >
                                <div className="user-welcome">
                                    Community
                                </div>

                                <NavLink
                                    to="/Community"
                                    className="dropdown-item"
                                    onClick={() => setIsCommunityDropdownOpen(false)}
                                >
                                    Screenshots Community
                                </NavLink>
                                <NavLink
                                    to="/Chat"
                                    className="dropdown-item"
                                    onClick={() => setIsCommunityDropdownOpen(false)}
                                >
                                    Global Chat
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <div className="search-box-wrap">
                        <input
                            type="text"
                            placeholder="Search by game name or publisher..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            <div id="outlet" className="outlet">
                <Outlet context={{ searchTerm, handleSearchChange }} />
            </div>
        </>
    );
}

const steamStyles = {
    body: {
        background: '#000',
        backgroundColor: '#161616ff',
        minHeight: '100vh',
        color: '#cfd6dd',
        fontFamily: '"Segoe UI", "Inter", system-ui, -apple-system, "Helvetica Neue", Arial',
        margin: 0,
        padding: 0,
        lineHeight: 1.5,
        WebkitFontSmoothing: 'antialiased',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
    }
};