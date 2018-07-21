import React from 'react';
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';

export default (props) => {
    return (
        <Drawer
        temporary
        {...props}
        >
        <DrawerHeader>
          DrawerHeader
        </DrawerHeader>
        <DrawerContent>
          ?
        </DrawerContent>
      </Drawer>
    )
};