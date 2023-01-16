import React from "react";
import {Menu, MenuItem, Sidebar, useProSidebar,} from "react-pro-sidebar";
import {Button} from "react-bootstrap";
import {Eye, Grid, Pencil, Speedometer2,} from "react-bootstrap-icons";
import '../css/style.css'
import { useLocation } from 'react-router-dom'


export default function DashboardSidebar() {
    const {broken, toggleSidebar} = useProSidebar();
    const url = useLocation();
    const Role = localStorage.getItem("role")
    let menuItems;
    if (Role === "Admin") {
        menuItems = [
            {
                name: "Dashboard",
                href: "/dashboard",
                active: "[id]",
                icon: <Speedometer2/>,
            }, {
                name: "Add Building",
                href: "/building",
                active: "[id]",
                icon: <Pencil/>,
            },
            {
                name: "View Building",
                href: "/buildingsDetails",
                active: "[id]",
                icon: <Pencil/>,
            },
            {
                name: "View Parking Permits",
                href: "/parkingReservations",
                active: "[id]",
                icon: <Eye/>,
            },
            {
                name: "Add User",
                href: "/user",
                active: "[id]",
                icon: <Pencil/>,
            },
            {
                name: "View User",
                href: "/users",
                active: "[id]",
                icon: <Eye/>,
            },
        ];
    } else {
        menuItems = [
            {
                name: "Dashboard",
                href: `/dashboard`,
                active: "[id]",
                icon: <Speedometer2/>,
            }, {
                name: "View Building",
                href: `/buildingsDetails`,
                active: "[id]",
                icon: <Pencil/>,
            },
            {
                name: "View Parking Permits",
                href: `/parkingReservations`,
                active: "[id]",
                icon: <Eye/>,
            }
        ];
    }
    return (
        <>
            {broken && (
                <Button
                    style={{
                        backgroundColor: "hsl(218, 41%, 15%)",
                        borderColor: "#83ca9c",
                        margin: 5,
                    }}
                    onClick={() => toggleSidebar()}
                >
                    <Grid/>
                </Button>
            )}
            <Sidebar breakPoint={"md"} backgroundColor={" hsl(218, 41%, 15%)"} id="sideBar">
                <Menu closeOnClick={true} style={{marginTop: 55}}>
                    {menuItems?.map(({name, href, icon,active}, index) => (
                        <a key={index} href={`/app${href}`}><MenuItem
                            style={{color: "white"}}
                            icon={icon}
                            active={url === active}
                        >
                            {name}
                        </MenuItem>
                        </a>
                    ))}
                </Menu>
            </Sidebar>
        </>
    )
}