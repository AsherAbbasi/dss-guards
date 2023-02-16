import React from "react";
import { Menu, MenuItem, Sidebar, useProSidebar, } from "react-pro-sidebar";
import { Button } from "react-bootstrap";
import { Eye, Grid, Pen, Speedometer2,Ticket,BuildingFillX,SignNoParkingFill,PeopleFill, TicketDetailedFill ,PersonFillAdd, Receipt, Text, BuildingsFill,TextWrap,Textarea, Building, BuildingX, BuildingGear, SignNoParking, People, Gear, DashCircle, Star} from "react-bootstrap-icons";
import '../css/style.css'
import { useLocation } from 'react-router-dom'


export default function DashboardSidebar() {
    const { broken, toggleSidebar } = useProSidebar();
    const url = useLocation();
    const Role = localStorage.getItem("role")
    let menuItems;
    if (Role === "Admin") {
        menuItems = [
            {
                name: "Dashboard",
                href: "/dashboard",
                active: "[id]",
                icon: <Star />,
            }, 
            {
                name: "Users",
                href: "/users",
                active: "[id]",
                icon: <People />,
            },
            {
                name: "Buildings",
                href: "/buildingsDetails",
                active: "[id]",
                icon: <BuildingGear />,
            },
            {
                name: "Parking Permits",
                href: "/parkingReservations",
                active: "[id]",
                icon: <SignNoParking />,
            },
            
            {
                name: "Tickets",
                href: `/tickets`,
                active: "[id]",
                icon: <Receipt />,
            },
            {
                name: "Occurance Reports",
                href: `/DailyReports`,
                active: "[id]",
                icon: <Textarea />,
            },
            {
                name: "Incident Reports",
                href: `/incidentReport`,
                active: "[id]",
                icon: <Textarea />,
            },
            
        ];
    } else {
        menuItems = [
            {
                name: "Dashboard",
                href: `/dashboard`,
                active: "[id]",
                icon: <Star />,
            },
             {
                name: "Buildings",
                href: `/buildingsDetails`,
                active: "[id]",
                icon: <BuildingGear />,
            },
            {
                name: "Parking Permits",
                href: `/parkingReservations`,
                active: "[id]",
                icon: <SignNoParking />,
            },
            {
                name: "Tickets",
                href: `/tickets`,
                active: "[id]",
                icon: <Receipt />,
            },
            {
                name: "Occurance Reports",
                href: `/DailyReports`,
                active: "[id]",
                icon: <Textarea />,
            },
            {
                name: "Incident Reports",
                href: `/incidentReport`,
                active: "[id]",
                icon: <Textarea />,
            },
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
                    <Grid />
                </Button>
            )}
            <Sidebar breakPoint={"md"} backgroundColor={"#fbfcfd"} id="sideBar" style={{position:"fixed"}}>
                <Menu closeOnClick={true} style={{ marginTop:60 }}>
                    {menuItems?.map(({ name, href, icon, active }, index) => (
                        <a key={index} href={`/app${href}`}><MenuItem
                            id="menuItems"
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