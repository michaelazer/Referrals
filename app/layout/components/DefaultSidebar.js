import React from 'react';
import { Link } from 'react-router-dom';

import {
    Sidebar,
    SidebarTrigger,
} from './../../components';

import { SidebarMiddleNav } from './SidebarMiddleNav';

import { SidebarTopA } from '../../routes/components/Sidebar/SidebarTopA'
import { SidebarBottomA } from '../../routes/components/Sidebar/SidebarBottomA'
import { LogoThemed } from '../../routes/components/LogoThemed/LogoThemed';

export const DefaultSidebar = () => (
    <Sidebar>
        { /* START SIDEBAR-OVERLAY: Close (x) */ }
        <Sidebar.Close>
            <SidebarTrigger tag={ 'a' } href="#" onClick={(e) => e.preventDefault()}>
                <i className="fa fa-times-circle fa-fw"></i>
            </SidebarTrigger>
        </Sidebar.Close>
        { /* START SIDEBAR-OVERLAY: Close (x) */ }

        { /* START SIDEBAR: Logo for Regular Sidebar */ }
        <Sidebar.HideSlim>
            <Sidebar.Section>
                <Link to="/" className="sidebar__brand">
                    <LogoThemed checkBackground />
                </Link>
            </Sidebar.Section>
        </Sidebar.HideSlim>
        { /* END SIDEBAR: Logo for Regular Sidebar */ }

        { /* START SIDEBAR: Emblem for Slim Sidebar */ }
        <Sidebar.ShowSlim>
            <Sidebar.Section className="text-center" style={{ padding: '1rem 0', minHeight: '60px', opacity: 1, transition: 'opacity 0.3s ease-in-out' }}>
                <Link to="/" className="d-block" style={{ lineHeight: 1, opacity: 1, visibility: 'visible' }}>
                    <LogoThemed checkBackground slim />
                </Link>
            </Sidebar.Section>
        </Sidebar.ShowSlim>
        { /* END SIDEBAR: Emblem for Slim Sidebar */ }

        { /* START SIDEBAR: Only for Mobile */ }
        <Sidebar.MobileFluid>
            {/*<SidebarTopA />*/}

            {/*<Sidebar.Section fluid cover>*/}
                { /* SIDEBAR: Menu */ }
                <SidebarMiddleNav />
            {/*</Sidebar.Section>*/}

            {/*<SidebarBottomA />*/}
        </Sidebar.MobileFluid>
        { /* END SIDEBAR: Only for Mobile */ }
    </Sidebar>
);
