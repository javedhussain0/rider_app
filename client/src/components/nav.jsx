import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImage from "../assets/logo/Logo.png";
import { Menu, MenuItem, IconButton, Avatar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 72px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 6px;
  position: relative;

  &:hover {
    color: #3182ce;
    background: rgba(49, 130, 206, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #3182ce;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 60%;
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none !important;
  color: #4a5568 !important;

  @media (max-width: 900px) {
    display: flex !important;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  padding: 20px 5%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  gap: 16px;
  transform: ${props => props.open ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${props => props.open ? '1' : '0'};
  transition: all 0.3s ease;
  pointer-events: ${props => props.open ? 'auto' : 'none'};
  z-index: 999;
`;

const MobileNavLink = styled(NavLink)`
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 1.1rem;

  &:hover {
    background: rgba(49, 130, 206, 0.15);
  }
`;

const UserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export default function Nav({ user }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const toggleMobileMenu = () => setMobileOpen(prev => !prev);

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <Logo 
          src={LogoImage} 
          alt="Logo" 
          onClick={() => navigate("/")} 
        />

        <NavLinks>
          <NavLink onClick={() => navigate("/")}>Home</NavLink>
          <NavLink onClick={() => navigate("/Help")}>Help</NavLink>
          <NavLink onClick={() => navigate("/RiderInfo")}>Rider</NavLink>
          <NavLink onClick={() => navigate("/About")}>About</NavLink>
        </NavLinks>

        <UserControls>
          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </MobileMenuButton>

          <IconButton onClick={handleMenu}>
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36, 
                bgcolor: '#3182ce',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </Avatar>
          </IconButton>

          <Menu 
            anchorEl={anchorEl} 
            open={Boolean(anchorEl)} 
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {user ? (
              <>
                <MenuItem disabled sx={{ color: '#4a5568', fontWeight: '600' }}>
                  {user.name}
                </MenuItem>
                <MenuItem 
                  onClick={() => {
                    handleNavigation("/profile");
                    handleClose();
                  }}
                  sx={{ fontSize: '0.9rem' }}
                >
                  Profile
                </MenuItem>
                <MenuItem 
                  onClick={() => {
                    handleNavigation("/logout");
                    handleClose();
                  }}
                  sx={{ fontSize: '0.9rem' }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem 
                  onClick={() => {
                    handleNavigation("/login");
                    handleClose();
                  }}
                  sx={{ fontSize: '0.9rem' }}
                >
                  Login
                </MenuItem>
                <MenuItem 
                  onClick={() => {
                    handleNavigation("/signup");
                    handleClose();
                  }}
                  sx={{ fontSize: '0.9rem' }}
                >
                  Sign Up
                </MenuItem>
              </>
            )}
          </Menu>
        </UserControls>
      </NavbarContainer>

      <MobileMenu open={mobileOpen}>
        <MobileNavLink onClick={() => handleNavigation("/")}>Home</MobileNavLink>
        <MobileNavLink onClick={() => handleNavigation("/Help")}>Help</MobileNavLink>
        <MobileNavLink onClick={() => handleNavigation("/RiderInfo")}>Rider</MobileNavLink>
        <MobileNavLink onClick={() => handleNavigation("/About")}>About</MobileNavLink>
      </MobileMenu>
    </>
  );
}