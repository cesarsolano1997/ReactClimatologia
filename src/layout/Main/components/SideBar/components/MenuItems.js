import React, { Fragment, useEffect } from 'react'
import { List, ListItemText, Collapse, Divider, Icon as IconMaterial } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import AppListemItem from './AppListItem';
import PropTypes from 'prop-types';

export const AppMenuItemPropTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    faIcon: PropTypes.elementType,
    items: PropTypes.array,
}

const MenuItems = React.memo(props => { 

    useEffect(() => {
        console.log('MENUITEMS RENDER')
    })

    const { label, link, faIcon, items = [] } = props

    const classes = useStyles();

    const isExpandable = items && items.length > 0
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(!open)
    }


    const MenuItemRoot = (
        <AppListemItem className={classes.menuItem} link={link} onClick={handleClick}>
            {/* Display an icon if any */}
            {!!faIcon && (
                <IconMaterial className={classes.icon}>{faIcon}</IconMaterial>
            )}
            <ListItemText primary={label} inset={!faIcon} />
            {/* Display the expand menu if the item has children */}
            {isExpandable && !open && <i className="material-icons">expand_less </i>}
            {isExpandable && open && <i className="material-icons">expand_more </i>}
        </AppListemItem>
    )

    const MenuItemChildren =  isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding className={classes.children}>
                {items.map((item, index) => (
                    <MenuItems
                        {...item}
                        key={index}
                    />
                ))}
            </List>
        </Collapse>
    ) : null

    return (
        <Fragment>
            {MenuItemRoot}
            {MenuItemChildren}
        </Fragment>
    )
})



const useStyles = makeStyles(theme =>
    createStyles({
        icon: {
            display: "inline-flex",
            minWidth: "56px",
            flexShrink: "0"
        },
        menuItem: {
            '&.active': {
                background: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemIcon-root': {
                    color: '#fff',
                },
            },
        },
        children: {
            left: '5%'
        }
    }),
)

export default MenuItems;
