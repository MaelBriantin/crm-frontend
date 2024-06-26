import { styled, RuleSet, css, keyframes } from "styled-components";
import { theme } from "../../assets/themes";
import { NavbarItem } from "./NavbarItem";
import { VscSettingsGear, VscQuestion, VscSignOut, VscHome, VscSmiley, VscGift, VscPieChart, VscJersey, VscFiles } from "react-icons/vsc";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { useLogoutService } from "../../hooks/auth/useLogout";
import { useLocation, useNavigate } from "react-router-dom";
import React, { Dispatch, SetStateAction } from "react";
import { useKeyboardShortcut } from "../../hooks/system/useKeyboardShortcut";
import { PiButterflyThin } from "react-icons/pi";

type NavbarProps = {
    showNavbar: boolean;
    setShowNavbar: Dispatch<SetStateAction<boolean>>;
}

type NavbarItems = {
    text: string;
    path: string;
    icon: React.ReactNode;
    disabled?: boolean;
};

type NavbarGroups = {
    groupName: string;
    items: NavbarItems[];
};

export const Navbar = (props: NavbarProps) => {
    const { showNavbar, setShowNavbar } = props;

    const { logoutService } = useLogoutService();
    const navigate = useNavigate();
    const location = useLocation();

    const actualPath = location.pathname;

    const logout = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        logoutService(navigate);
    };

    // shortcut to show/hide navbar
    useKeyboardShortcut({
        'Control+q': () => setShowNavbar(prevShowNavbar => !prevShowNavbar)
    });

    const links: NavbarGroups[] = [
        {
            groupName: "Activité",
            items: [
                {
                    text: 'Commandes',
                    path: '/orders',
                    icon: <VscFiles />,
                },
                {
                    text: 'Rapports d\'activité',
                    path: '/reports',
                    icon: <VscPieChart />,
                    disabled: true
                }
            ]
        },
        {
            groupName: "Gestion",
            items: [
                {
                    text: 'Clients',
                    path: '/customers',
                    icon: <VscSmiley />,
                },
                {
                    text: 'Produits',
                    path: '/products',
                    icon: <VscGift />,
                },
                {
                    text: 'Secteurs',
                    path: '/sectors',
                    icon: <LiaMapMarkedAltSolid />,
                },
                {
                    text: 'Marques',
                    path: '/brands',
                    icon: <VscJersey />,
                }
            ]
        }

    ];

    return (
        <NavbarContainer $showNavbar={showNavbar}>
            <NavListContainer $showNavbar={showNavbar}>

                <AppName>
                    <PiButterflyThin className="logo" onClick={() => { }} />
                    {/* <GiPotionBall  className="logo" onClick={() => { }} /> */}
                </AppName>

                <NavLinks>
                    <Divider><div className="line"></div></Divider>
                    <NavbarItem
                        selected={actualPath === '/home'}
                        value={'Accueil'}
                        onClick={() => navigate('/home')}
                        icon={<VscHome />} />

                    {
                        links.map((group) => (
                            <NavGroup key={group.groupName}>
                                <NavGroupName>{group.groupName}</NavGroupName>
                                {group.items.map((item) => (
                                    <NavbarItem
                                        key={item.path}
                                        selected={item.path === actualPath}
                                        value={item.text}
                                        onClick={() => navigate(item.path)}
                                        icon={item.icon}
                                        disabled={item.disabled}
                                    />
                                ))}
                            </NavGroup>
                        ))
                    }
                </NavLinks>
                <Settings>
                    <Divider><div className="line"></div></Divider>
                    <NavbarItem selected={actualPath === '/help'} value={'Aide'} onClick={() => { }} icon={<VscQuestion />} disabled />
                    <NavbarItem selected={actualPath === '/settings'} value={'Paramètres'} onClick={() => navigate('/settings')} icon={<VscSettingsGear />} disabled />
                    <NavbarItem disconnect={true} selected={false} value={'Déconnexion'} onClick={(e) => logout(e)} icon={<VscSignOut />} />
                </Settings>
            </NavListContainer>
        </NavbarContainer>
    )
}

const NavbarContainer = styled.div<{ $showNavbar: boolean }>`
    transition: all 250ms ease-in-out;
    ${({ $showNavbar }): false | RuleSet<object> | undefined => $showNavbar
        ? css`
        //opacity: 1;
        width: 300px;
        transform: translateX(0);
        `
        : css`
        //opacity: 0;
        width: 0;
        transform: translateX(10%);
        `
    };
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-right: ${({ $showNavbar }): string => $showNavbar ? '-0.5vw' : '0'};
`

const NavListContainer = styled.div<{ $showNavbar: boolean }>`
    transition: all 250ms ease-in-out;
    ${({ $showNavbar }): false | RuleSet<object> | undefined => $showNavbar
        ? css`
        opacity: 1;
        `
        : css`
        opacity: 0;
        `
    };
    display: 'flex';
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    width: 100%;
`

const Shake = keyframes`
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
    75% { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
`

const AppName = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .logo{
        font-size: ${theme.fonts.size.P6};
        transition: all 450ms;
        opacity: 0.25;
    }
    .logo:hover{
        opacity: 1;
        color: ${theme.colors.primary};
        /* transform: rotate(20deg); */
        animation: ${Shake} 0.4s ease-in-out;
    }
`

const NavLinks = styled.div`
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`

const Settings = styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const NavGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const NavGroupName = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 85%;
    padding: 5px 10px;
    opacity: 0.5;
    font-size: ${theme.fonts.size.P1};
`

const Divider = styled.div`
    width: 100%;
    height: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    .line{
        border-radius: ${theme.materialDesign.borderRadius.rounded};
        width: 60%;
        height: 2px;
        background: lightgray;
    }
`