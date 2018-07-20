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
                        <TopAppBarNavigationIcon use="menu" />
                        <TopAppBarTitle>Title</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <TopAppBarActionItem aria-label="Download" alt="Download">
                            file_download
                        </TopAppBarActionItem>
                        <TopAppBarActionItem
                            aria-label="Print this page"
                            alt="Print this page"
                        >
                            print
                        </TopAppBarActionItem>
                        <TopAppBarActionItem
                        aria-label="Bookmark this page"
                        alt="Bookmark this page"
                        >
                            bookmark
                        </TopAppBarActionItem>
                    </TopAppBarSection>
                </TopAppBarRow>
            </Elevation>
        </TopAppBar>
    )
};
