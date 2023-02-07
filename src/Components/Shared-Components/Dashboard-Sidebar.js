import React from "react";
import { Menu, MenuItem, Sidebar, useProSidebar, } from "react-pro-sidebar";
import { Button } from "react-bootstrap";
import { Eye, Grid, Pen, Speedometer2,Ticket,BuildingFillX,SignNoParkingFill,PeopleFill, TicketDetailedFill ,PersonFillAdd, Receipt, Text, BuildingsFill,TextWrap,Textarea} from "react-bootstrap-icons";
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
                icon: <Speedometer2 />,
            }, {
                name: "Add Building",
                href: "/building",
                active: "[id]",
                icon: <BuildingsFill />,
            },
            {
                name: "View Building",
                href: "/buildingsDetails",
                active: "[id]",
                icon: <BuildingFillX />,
            },
            {
                name: "Parking Permits",
                href: "/parkingReservations",
                active: "[id]",
                icon: <SignNoParkingFill />,
            },
            {
                name: "Add User",
                href: "/user",
                active: "[id]",
                icon: <PersonFillAdd />,
            },
            {
                name: "View User",
                href: "/users",
                active: "[id]",
                icon: <PeopleFill />,
            },
            {
                name: "Add Ticket",
                href: `/ticket`,
                active: "[id]",
                icon: <TicketDetailedFill />,

            },
            {
                name: "View Ticket",
                href: `/tickets`,
                active: "[id]",
                icon: <Receipt />,
            },
            {
                name: "Daily Report",
                href: `/DailyReport`,
                active: "[id]",
                icon: <TextWrap />,
            },
            {
                name: "View Daily Report",
                href: `/DailyReports`,
                active: "[id]",
                icon: <Textarea />,
            }
        ];
    } else {
        menuItems = [
            {
                name: "Dashboard",
                href: `/dashboard`,
                active: "[id]",
                icon: <Speedometer2 />,
            }, {
                name: "View Building",
                href: `/buildingsDetails`,
                active: "[id]",
                icon: <Eye />,
            },
            {
                name: "View Parking Permits",
                href: `/parkingReservations`,
                active: "[id]",
                icon: <Eye />,
            },
            {
                name: "Add Ticket",
                href: `/ticket`,
                active: "[id]",
                icon: <Ticket />,

            },
            {
                name: "View Ticket",
                href: `/tickets`,
                active: "[id]",
                icon: <Eye />,
            },
            {
                name: "Daily Report",
                href: `/DailyReport`,
                active: "[id]",
                icon: <Pen />,
            },
            {
                name: "View Daily Report",
                href: `/DailyReports`,
                active: "[id]",
                icon: <Eye />,
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
                    <Grid />
                </Button>
            )}
            <Sidebar breakPoint={"md"} backgroundColor={" hsl(218, 41%, 15%)"} id="sideBar">
                <Menu closeOnClick={true} style={{ marginTop:35 }}>
                    {menuItems?.map(({ name, href, icon, active }, index) => (
                        <a key={index} href={`/app${href}`}><MenuItem
                            style={{ color: "white" }}
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