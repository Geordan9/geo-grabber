import React from 'react';
import { Elevation } from 'rmwc/Elevation';
import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarNavigationIcon,
    TopAppBarActionItem,
    TopAppBarTitle
} from 'rmwc/TopAppBar';

export default () => {
    return (
        <TopAppBar>
            <Elevation z={8}>
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <TopAppBarTitle>Geo-Grabber</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <TopAppBarActionItem
                            aria-label="Go Home"
                            alt="Go Home"
                        >
                            home
                        </TopAppBarActionItem>
                        <TopAppBarActionItem
                        aria-label="Bookmark this page"
                        alt="Bookmark this page"
                        >
                            person_add
                        </TopAppBarActionItem>
                    </TopAppBarSection>
                </TopAppBarRow>
            </Elevation>
        </TopAppBar>
    )
};
