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
import { PageConfigConsumer } from '../../components';

export const DefaultSidebar = () => (
    <Sidebar>
        { /* START SIDEBAR-OVERLAY: Close (x) */ }
        <Sidebar.Close>
            <SidebarTrigger tag={ 'a' } href="#" onClick={(e) => e.preventDefault()}>
                <i className="fa fa-times-circle fa-fw"></i>
            </SidebarTrigger>
        </Sidebar.Close>
        { /* START SIDEBAR-OVERLAY: Close (x) */ }

        { /* START SIDEBAR: Only for Desktop */ }
        <Sidebar.HideSlim>
            <Sidebar.Section>
                <Link to="/" className="sidebar__brand">
                    <LogoThemed checkBackground />
                </Link>
            </Sidebar.Section>
        </Sidebar.HideSlim>
        { /* END SIDEBAR: Only for Desktop */ }

        { /* START SIDEBAR: Slim Logo (Emblem) */ }
        <Sidebar.ShowSlim>
            <Sidebar.Section>
                <Link to="/" className="sidebar__brand">
                    <LogoThemed checkBackground slim />
                </Link>
            </Sidebar.Section>
        </Sidebar.ShowSlim>
        { /* END SIDEBAR: Slim Logo */ }

        { /* START SIDEBAR: Toggle Button */ }
        <PageConfigConsumer>
        {
            ({ toggleSidebar, sidebarSlim }) => (
                <Sidebar.HideSlim>
                    <Sidebar.Section>
                        <div className="d-flex justify-content-end pr-3">
                            <SidebarTrigger tag='a' href="#" onClick={(e) => { e.preventDefault(); toggleSidebar(); }}>
                                <i className="fa fa-bars fa-fw"></i>
                            </SidebarTrigger>
                        </div>
                    </Sidebar.Section>
                </Sidebar.HideSlim>
            )
        }
        </PageConfigConsumer>
        { /* END SIDEBAR: Toggle Button */ }

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
